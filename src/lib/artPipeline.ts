/**
 * Qambakht. art pipeline — every illustration is processed BEFORE it is shown.
 *
 * - `fix`    : apply the mark-hiding crop/patches and trim (transparent PNGs, textiles)
 * - `cutout` : flood-fill the page/background colour away from the edges, feather,
 *              keep enclosed highlights, trim — the art floats, never a white box
 * - `ink`    : normalise line-art against a blurred copy, map darkness to alpha,
 *              recolour to the requested ink (maroon on paper, cream on night panels)
 * - `raw`    : full-bleed textiles/patterns used as backgrounds, shown as-is
 *
 * Results are cached as PNG blobs in IndexedDB keyed by id+version, and in memory
 * for the session. Anything that fails renders as nothing — never a white box.
 */

export type Crop = [number, number, number, number]; // top, right, bottom, left (fractions)
export type Patch = { x: number; y: number; w: number; h: number }; // fractions
export type Treatment = "cutout" | "ink" | "fix" | "raw";

export interface ArtSpec {
  src: string;
  w: number;
  h: number;
  crop?: Crop | undefined;
  patch?: Patch | undefined;
  treatment: Treatment;
  /** Also lift enclosed near-white regions (sticker interiors), not just edge-connected background. */
  punch?: boolean | undefined;
}

export interface Processed {
  url: string;
  w: number;
  h: number;
}

const MAX_DIM = 1100;
const VERSION = "v6";

const mem = new Map<string, Processed>();
const pending = new Map<string, Promise<Processed | null>>();

const keyOf = (id: string, ink: string) => `${id}|${ink}|${VERSION}`;

export function cachedProcessed(id: string, ink: string): Processed | undefined {
  return mem.get(keyOf(id, ink));
}

export function processArt(id: string, spec: ArtSpec, ink?: string): Promise<Processed | null> {
  const key = keyOf(id, ink ?? "");
  const hit = mem.get(key);
  if (hit) return Promise.resolve(hit);
  const inflight = pending.get(key);
  if (inflight) return inflight;
  const job = run(key, spec, ink)
    .then((r) => {
      pending.delete(key);
      return r;
    })
    .catch((err) => {
      console.warn("art pipeline failed", id, err);
      pending.delete(key);
      return null;
    });
  pending.set(key, job);
  return job;
}

async function run(key: string, spec: ArtSpec, ink?: string): Promise<Processed | null> {
  if (typeof window === "undefined") return null;
  if (spec.treatment === "raw" && !spec.crop && !spec.patch) {
    // Nothing to hide — the source is already exactly the art.
    const done = { url: spec.src, w: spec.w, h: spec.h };
    mem.set(key, done);
    return done;
  }
  const blob =
    (await idbGet(key)) ??
    (await computeBlob(spec, ink));
  if (!blob) return null;
  await idbPut(key, blob);
  const bmp = await createImageBitmap(blob);
  const done = { url: URL.createObjectURL(blob), w: bmp.width, h: bmp.height };
  bmp.close();
  mem.set(key, done);
  return done;
}

async function computeBlob(spec: ArtSpec, ink?: string): Promise<Blob | null> {
  const source = await decode(spec.src);
  const W = "width" in source ? source.width : 0;
  const H = "height" in source ? source.height : 0;
  if (!W || !H) return null;

  const [t, r, b, l] = spec.crop ?? [0, 0, 0, 0];
  const sx = l * W;
  const sy = t * H;
  const sw = (1 - l - r) * W;
  const sh = (1 - t - b) * H;
  if (sw < 4 || sh < 4) return null;
  const scale = Math.min(1, MAX_DIM / Math.max(sw, sh));
  const cw = Math.round(sw * scale);
  const ch = Math.round(sh * scale);

  const canvas = makeCanvas(cw, ch);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(source as CanvasImageSource, sx, sy, sw, sh, 0, 0, cw, ch);
  if ("close" in source && typeof source.close === "function") source.close();

  if (spec.patch) inpaint(ctx, cw, ch, spec.patch);

  if (spec.treatment === "cutout") {
    const ok = cutout(ctx, cw, ch);
    if (!ok) return null; // corners disagreed — treat as failure, render nothing
    if (spec.punch) punchWhite(ctx, cw, ch);
  } else if (spec.treatment === "ink") {
    if (!ink) return null;
    inkify(ctx, cw, ch, ink);
  }

  return trimAndEncode(canvas, cw, ch);
}

/* ---------------- decode ---------------- */

async function decode(src: string): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`fetch ${res.status}`);
      return await createImageBitmap(await res.blob());
    } catch {
      /* fall through to <img> */
    }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`img ${src}`));
    img.src = src;
  });
}

function makeCanvas(w: number, h: number): HTMLCanvasElement | OffscreenCanvas {
  if (typeof OffscreenCanvas === "function") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function ctxOf(c: HTMLCanvasElement | OffscreenCanvas): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null {
  return c.getContext("2d", { willReadFrequently: true }) as
    | CanvasRenderingContext2D
    | OffscreenCanvasRenderingContext2D
    | null;
}

/* ---------------- mark hiding: median-ring inpaint ---------------- */

function inpaint(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  cw: number,
  ch: number,
  patch: Patch,
) {
  const rx = Math.round(patch.x * cw);
  const ry = Math.round(patch.y * ch);
  const rw = Math.round(patch.w * cw);
  const rh = Math.round(patch.h * ch);
  if (rw < 2 || rh < 2) return;
  const img = ctx.getImageData(0, 0, cw, ch);
  const d = img.data;
  const ring = 12;
  const x0 = Math.max(0, rx - ring);
  const y0 = Math.max(0, ry - ring);
  const x1 = Math.min(cw, rx + rw + ring);
  const y1 = Math.min(ch, ry + rh + ring);
  const rs: number[] = [];
  const gs: number[] = [];
  const bs: number[] = [];
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const inside = x >= rx && x < rx + rw && y >= ry && y < ry + rh;
      if (inside) continue;
      const i = (y * cw + x) * 4;
      rs.push(d[i]!);
      gs.push(d[i + 1]!);
      bs.push(d[i + 2]!);
    }
  }
  if (!rs.length) return;
  const med = (a: number[]) => {
    a.sort((p, q) => p - q);
    return a[Math.floor(a.length / 2)] ?? 0;
  };
  ctx.fillStyle = `rgb(${med(rs)},${med(gs)},${med(bs)})`;
  ctx.fillRect(rx, ry, rw, rh);
}

/* ---------------- cutout ---------------- */

function pixelDist(d: Uint8ClampedArray, i: number, bg: [number, number, number]) {
  const dr = d[i]! - bg[0];
  const dg = d[i + 1]! - bg[1];
  const db = d[i + 2]! - bg[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/** Average of the four 6×6 corner patches; null when they disagree (own-background art). */
function cornerColor(d: Uint8ClampedArray, w: number, h: number): [number, number, number] | null {
  const samples: [number, number, number][] = [];
  const s = 6;
  for (const [cx, cy] of [
    [0, 0],
    [w - s, 0],
    [0, h - s],
    [w - s, h - s],
  ] as const) {
    let r = 0;
    let g = 0;
    let b = 0;
    for (let y = cy; y < cy + s; y++) {
      for (let x = cx; x < cx + s; x++) {
        const i = (y * w + x) * 4;
        r += d[i]!;
        g += d[i + 1]!;
        b += d[i + 2]!;
      }
    }
    const n = s * s;
    samples.push([r / n, g / n, b / n]);
  }
  let maxDiff = 0;
  for (let i = 0; i < samples.length; i++) {
    for (let j = i + 1; j < samples.length; j++) {
      const a = samples[i]!;
      const bq = samples[j]!;
      maxDiff = Math.max(
        maxDiff,
        Math.hypot(a[0] - bq[0], a[1] - bq[1], a[2] - bq[2]),
      );
    }
  }
  if (maxDiff > 48) return null;
  const avg = (k: number) => samples.reduce((sum, s) => sum + (s[k] ?? 0), 0) / samples.length;
  return [avg(0), avg(1), avg(2)];
}

const TOL = 48; // ≈ 28 per channel
const isCheckerBg = (r: number, g: number, b: number) => {
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  const bright = (r + g + b) / 3;
  return sat < 20 && bright > 175;
};

/** Flood-fill the background away from the edges. Returns false when there is no uniform bg. */
function cutout(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
): boolean {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const bg = cornerColor(d, w, h);
  if (!bg) return false;
  const n = w * h;
  const state = new Uint8Array(n); // 0 unseen, 1 queued/outside, 2 done
  const queue = new Int32Array(n);
  let head = 0;
  let tail = 0;
  const push = (p: number) => {
    if (state[p]) return;
    const i = p * 4;
    const withinBg = pixelDist(d, i, bg) <= TOL;
    const checker = isCheckerBg(d[i]!, d[i + 1]!, d[i + 2]!);
    const transparent = d[i + 3]! === 0;
    if (!withinBg && !checker && !transparent) return;
    state[p] = 1;
    queue[tail++] = p;
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  if (tail === 0) return false; // nothing connected to the edge — keep as-is
  while (head < tail) {
    const p = queue[head++]!;
    state[p] = 2;
    d[p * 4 + 3] = 0;
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0) push(p - 1);
    if (x < w - 1) push(p + 1);
    if (y > 0) push(p - w);
    if (y < h - 1) push(p + w);
  }
  // 1px feather: soften pixels that touch the erased region
  for (let p = 0; p < n; p++) {
    if (d[p * 4 + 3] === 0) continue;
    const x = p % w;
    const y = (p - x) / w;
    const touch =
      (x > 0 && d[(p - 1) * 4 + 3] === 0) ||
      (x < w - 1 && d[(p + 1) * 4 + 3] === 0) ||
      (y > 0 && d[(p - w) * 4 + 3] === 0) ||
      (y < h - 1 && d[(p + w) * 4 + 3] === 0);
    if (touch) d[p * 4 + 3] = 150;
  }
  ctx.putImageData(img, 0, 0);
  return true;
}

/* ---------------- punch: enclosed near-white regions ---------------- */

/**
 * Stickers and figures whose whites live INSIDE the silhouette (flower gaps, sculpture
 * highlights) still show white patches after the edge cutout. Multi-source flood-fill
 * every remaining near-white region and erase it, then feather — the cutout floats clean.
 */
function punchWhite(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const n = w * h;
  const state = new Uint8Array(n); // 0 unseen, 1 queued/erase, 2 done
  const queue = new Int32Array(n);
  let head = 0;
  let tail = 0;
  const isWhite = (p: number) => {
    const i = p * 4;
    if (d[i + 3] === 0) return false;
    const r = d[i]!;
    const g = d[i + 1]!;
    const b = d[i + 2]!;
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    const bright = (r + g + b) / 3;
    return sat < 30 && bright > 200;
  };
  const push = (p: number) => {
    if (state[p]) return;
    if (!isWhite(p)) return;
    state[p] = 1;
    queue[tail++] = p;
  };
  for (let p = 0; p < n; p++) push(p);
  while (head < tail) {
    const p = queue[head++]!;
    state[p] = 2;
    d[p * 4 + 3] = 0;
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0) push(p - 1);
    if (x < w - 1) push(p + 1);
    if (y > 0) push(p - w);
    if (y < h - 1) push(p + w);
  }
  // same 1px feather the edge cutout uses
  for (let p = 0; p < n; p++) {
    if (d[p * 4 + 3] === 0) continue;
    const x = p % w;
    const y = (p - x) / w;
    const touch =
      (x > 0 && d[(p - 1) * 4 + 3] === 0) ||
      (x < w - 1 && d[(p + 1) * 4 + 3] === 0) ||
      (y > 0 && d[(p - w) * 4 + 3] === 0) ||
      (y < h - 1 && d[(p + w) * 4 + 3] === 0);
    if (touch) d[p * 4 + 3] = 150;
  }
  ctx.putImageData(img, 0, 0);
}

/* ---------------- ink ---------------- */

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Map darkness against a blurred copy to alpha, recolour everything to `ink`. */
function inkify(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  w: number,
  h: number,
  ink: string,
) {
  const blur = makeCanvas(w, h);
  const bctx = ctxOf(blur);
  if (!bctx) return;
  bctx.filter = "blur(10px)";
  bctx.drawImage(ctx.canvas as CanvasImageSource, 0, 0);
  bctx.filter = "none";

  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  const base = bctx.getImageData(0, 0, w, h).data;
  const m = /^#?([0-9a-f]{6})$/i.exec(ink.trim());
  const hex = m ? m[1]! : "6e1f1b";
  const ir = parseInt(hex.slice(0, 2), 16);
  const ig = parseInt(hex.slice(2, 4), 16);
  const ib = parseInt(hex.slice(4, 6), 16);
  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    const l =
      0.299 * d[i]! + 0.587 * d[i + 1]! + 0.114 * d[i + 2]!;
    const lb =
      0.299 * base[i]! + 0.587 * base[i + 1]! + 0.114 * base[i + 2]!;
    const k = (lb - l) / 52; // darker than the local paper → ink
    const a = k <= 0 ? 0 : smooth(Math.min(1, k));
    d[i] = ir;
    d[i + 1] = ig;
    d[i + 2] = ib;
    d[i + 3] = Math.round(a * 255);
  }
  ctx.putImageData(img, 0, 0);
}

/* ---------------- trim + encode ---------------- */

async function trimAndEncode(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  w: number,
  h: number,
): Promise<Blob | null> {
  const ctx = ctxOf(canvas);
  if (!ctx) return null;
  const d = ctx.getImageData(0, 0, w, h).data;
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3]! > 12) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null; // fully erased — render nothing
  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  if (bw === w && bh === h) return toBlob(canvas);
  const out = makeCanvas(bw, bh);
  const octx = ctxOf(out);
  if (!octx) return null;
  octx.drawImage(canvas as CanvasImageSource, minX, minY, bw, bh, 0, 0, bw, bh);
  return toBlob(out);
}

function toBlob(canvas: HTMLCanvasElement | OffscreenCanvas): Promise<Blob | null> {
  if (typeof OffscreenCanvas === "function" && canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type: "image/png" });
  }
  return new Promise((resolve) => {
    (canvas as HTMLCanvasElement).toBlob((blob) => resolve(blob), "image/png");
  });
}

/* ---------------- IndexedDB cache ---------------- */

const DB = "qambakht-art";
const STORE = "blobs";

function idb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbGet(key: string): Promise<Blob | undefined> {
  try {
    const db = await idb();
    if (!db) return undefined;
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve((req.result as Blob | undefined) ?? undefined);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return undefined;
  }
}

async function idbPut(key: string, blob: Blob): Promise<void> {
  try {
    const db = await idb();
    if (!db) return;
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(blob, key);
      tx.oncomplete = () => resolve(undefined);
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    /* cache is best-effort */
  }
}

/** Pre-warm a list of pieces when the browser is idle (per page). */
export function warmArt(jobs: { id: string; spec: ArtSpec; ink?: string }[]) {
  if (typeof window === "undefined") return;
  const go = () => jobs.forEach((j) => void processArt(j.id, j.spec, j.ink));
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(go, { timeout: 2500 });
  } else {
    setTimeout(go, 800);
  }
}
