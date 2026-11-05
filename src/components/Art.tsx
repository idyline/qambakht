import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ART, type ArtNo } from "@/data/site";
import { cn } from "@/lib/utils";
import { cachedProcessed, processArt, type ArtSpec } from "@/lib/artPipeline";

export type Shape = "arch" | "oval" | "circle";
/** How an illustration sits on the page: bare, blended into the paper, or mounted on cream. */
export type Look = "plain" | "multiply" | "print";

const INK_TOKENS: Record<string, string> = {
  maroon: "#6E1F1B",
  cream: "#FFF1DC",
  vermilion: "#D7493F",
  ink: "#2B120E",
};

/** Line-art printed on linen/kraft — re-inked by the pipeline. */
const INK: Partial<Record<ArtNo, string>> = {
  2: "maroon",
  3: "maroon",
  4: "maroon",
  5: "maroon",
  9: "maroon",
  13: "maroon",
  35: "maroon",
  36: "maroon",
  37: "maroon",
  38: "maroon",
  40: "maroon",
  41: "maroon",
};

/** Full-bleed textiles, patterns and paintings that carry their own background. */
const RAW: Partial<Record<ArtNo, true>> = {
  1: true,
  12: true,
  17: true,
  18: true,
  19: true,
  22: true,
  24: true,
  28: true,
  29: true,
  32: true,
  33: true,
  34: true,
  46: true,
};

/** Stickers and figures whose enclosed whites must also be lifted — no white patches inside cutouts. */
const PUNCH: Partial<Record<ArtNo, true>> = {
  6: true,
  7: true,
  8: true,
  10: true,
  11: true,
  14: true,
  15: true,
  20: true,
  21: true,
  23: true,
  27: true,
  30: true,
  31: true,
  39: true,
  42: true,
  43: true,
  44: true,
  45: true,
  47: true,
  48: true,
};

function treatmentOf(n: ArtNo): Treatment {
  if (RAW[n]) return "fix"; // only mark-hiding crops/patches, no cutout
  const ink = INK[n];
  if (ink) return "ink";
  return "cutout";
}

type Treatment = ArtSpec["treatment"];

const SHAPE_RADIUS: Record<Shape, string> = {
  arch: "999px 999px 28px 28px",
  oval: "50% / 50%",
  circle: "50%",
};

type Props = {
  n: ArtNo;
  /** Override the ink colour for line-art ("maroon" | "cream" | "vermilion" | hex). */
  ink?: string;
  /** Visual mounting: plain cutout, blended into paper, or framed print. */
  look?: Look;
  /** Clip a full-colour painting to a meaningful silhouette. */
  shape?: Shape;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  priority?: boolean;
  /** Fill the wrapper instead of keeping the (processed) ratio — for backdrop frames. */
  cover?: boolean;
};

/**
 * The one doorway every illustration passes through. Processes near the viewport,
 * caches in IndexedDB, renders a paper-tone skeleton while working and nothing at
 * all if processing fails — a white box can never flash, on any surface.
 */
export function Art({ n, ink, look = "plain", shape, className, style, alt = "", priority, cover }: Props) {
  const p = ART[n];
  const treatment = treatmentOf(n);
  const inkHex = ink ? (INK_TOKENS[ink] ?? ink) : INK[n] ? (INK_TOKENS[INK[n]] ?? INK[n]) : undefined;
  const punch = treatment === "cutout" && !!PUNCH[n];
  const key = `${n}|${inkHex ?? ""}`;

  const ref = useRef<HTMLSpanElement | null>(null);

  // undefined = not yet, null = pipeline failed (render nothing), value = ready
  const [res, setRes] = useState<Processed | null | undefined>(() =>
    typeof window === "undefined" ? undefined : cachedProcessed(`${n}`, inkHex ?? ""),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    let alive = true;
    const hit = cachedProcessed(`${n}`, inkHex ?? "");
    if (hit) {
      setRes(hit);
      return;
    }
    setRes(undefined);
    const spec: ArtSpec = {
      src: p.src,
      w: p.w,
      h: p.h,
      crop: p.crop,
      patch: p.patch,
      treatment,
      punch,
    };
    const el = ref.current;
    if (el && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            void processArt(`${n}`, spec, inkHex).then((r) => alive && setRes(r ?? null));
          }
        },
        { rootMargin: "600px 0px" },
      );
      io.observe(el);
      return () => {
        alive = false;
        io.disconnect();
      };
    }
    void processArt(`${n}`, spec, inkHex).then((r) => alive && setRes(r ?? null));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, inkHex]);

  type Processed = { url: string; w: number; h: number };

  // Source ratio (with mark-hiding crop) for the skeleton.
  const [t, r, b, l] = p.crop ?? [0, 0, 0, 0];
  const vw = 1 - l - r;
  const vh = 1 - t - b;
  const srcRatio = (p.w * vw) / (p.h * vh);

  const radius = shape ? SHAPE_RADIUS[shape] : undefined;
  const looks = look === "multiply" ? "art-multiply" : look === "print" ? "art-print" : "";

  if (res === null) return null; // pipeline failed — never a white box

  if (!res) {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn("art art-skeleton", looks, shape && `art-shape-${shape}`, className)}
        style={{ aspectRatio: cover ? undefined : `${srcRatio}`, borderRadius: radius, ...style }}
      />
    );
  }

  return (
    <span
      className={cn("art", looks, shape && `art-shape-${shape}`, className)}
      style={{
        aspectRatio: cover ? undefined : `${res.w} / ${res.h}`,
        borderRadius: radius,
        ...style,
      }}
    >
      <img
        src={res.url}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        width={res.w}
        height={res.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        draggable={false}
        style={cover ? { width: "100%", height: "100%", objectFit: "cover" } : { width: "100%", height: "100%" }}
      />
    </span>
  );
}
