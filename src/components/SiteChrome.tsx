import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { Art } from "@/components/Art";
import { CupLogo, Lockup, Steam, Wordmark } from "@/components/Wordmark";
import { ART, INTRO_LINE, NAV, type NavTo } from "@/data/site";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Header + आँगन menu overlay + page interstitial                      */
/* ------------------------------------------------------------------ */

export function SiteChrome({ onExit }: { onExit: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<"closed" | "open" | "closing">("closed");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(0);
  const [inter, setInter] = useState<null | { idx: number; phase: "in" | "out" }>(null);

  const openMenu = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setHover(Math.max(0, NAV.findIndex((n) => n.to === pathname)));
    setMenu("open");
  };
  const closeMenu = useCallback((after?: () => void) => {
    setMenu("closing");
    window.setTimeout(() => {
      setMenu("closed");
      btnRef.current?.focus();
      after?.();
    }, reduced() ? 0 : 500);
  }, []);

  const go = (idx: number, to: NavTo) => {
    closeMenu(() => {
      if (reduced()) {
        navigate({ to });
        return;
      }
      setInter({ idx, phase: "in" });
      const img = new Image();
      img.src = ART[NAV[idx].interstitial].src;
      window.setTimeout(() => {
        navigate({ to });
        window.scrollTo(0, 0);
      }, 450);
      window.setTimeout(() => setInter({ idx, phase: "out" }), 1000);
      window.setTimeout(() => setInter(null), 1600);
    });
  };

  // lock scroll, inert background, Esc, focus trap
  useEffect(() => {
    if (menu === "closed") return;
    const main = document.getElementById("site-main");
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    overlayRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
      if (e.key === "Tab" && overlayRef.current) {
        const f = overlayRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
    };
  }, [menu, closeMenu]);

  const open = menu === "open";
  const current = NAV[hover];

  return (
    <>
      <header className="site-header">
        <Link to="/" className="flex items-center gap-2" aria-label="Qambakht. — घर">
          <CupLogo size={40} />
          <Wordmark className="wm-sm" />
        </Link>
        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-label="मेन्यू"
          aria-expanded={open}
          onClick={() => (menu === "closed" ? openMenu() : closeMenu())}
        >
          <span className="bar" style={{ width: 28 }} />
          <span className="bar" style={{ width: 20 }} />
          <span className="bar" style={{ width: 24 }} />
          <span className="menu-dot" />
        </button>
      </header>

      {menu !== "closed" && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="मेन्यू"
          className={`angan ${menu === "closing" ? "angan-out" : "angan-in"}`}
          style={{ ["--ox" as string]: `${origin.x}px`, ["--oy" as string]: `${origin.y}px` }}
          onClick={(e) => e.target === e.currentTarget && closeMenu()}
        >
          <div className="angan-pattern" aria-hidden />
          <Art n={25} className="angan-corner left-0 top-0 w-28 md:w-44" />
          <Art n={26} className="angan-corner bottom-0 right-0 w-28 rotate-180 md:w-44" />
          <Art n={27} className="angan-corner bottom-0 left-0 hidden w-32 md:block" />
          <Art n={44} className="drift-x pointer-events-none absolute left-[40%] top-[8%] w-20 opacity-90" />

          <button type="button" className="angan-close" aria-label="बंद करें" onClick={() => closeMenu()}>
            ✕
          </button>

          <div className="relative mx-auto grid h-full max-w-6xl items-center gap-8 px-6 py-20 md:grid-cols-[1.2fr_1fr]">
            <nav aria-label="मुख्य">
              <ul className="space-y-2 md:space-y-3">
                {NAV.map((n, i) => (
                  <li
                    key={n.to}
                    className="angan-item"
                    style={{ animationDelay: `${180 + i * 80}ms`, ["--rot" as string]: `${i % 2 ? 1.5 : -1.5}deg` }}
                  >
                    <a
                      href={n.to}
                      lang="hi"
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onClick={(e) => {
                        e.preventDefault();
                        go(i, n.to);
                      }}
                      className="group flex items-center gap-4"
                      aria-current={pathname === n.to ? "page" : undefined}
                    >
                      <Art n={n.art} className="tape w-12 shrink-0 md:hidden" />
                      <span className={`angan-word ${pathname === n.to ? "is-current" : ""}`}>{n.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button type="button" className="hand text-xl text-cream underline decoration-wavy" lang="hi" onClick={() => closeMenu(onExit)}>
                  चलता हूँ
                </button>
                <Lockup size={32} />
              </div>
            </nav>
            <div className="relative hidden h-[60vh] md:block">
              <div key={hover} className="angan-preview">
                <Art n={current.art} look="print" className="h-auto w-full max-w-sm rotate-[2deg]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {inter && (
        <div className={`interstitial ${inter.phase === "out" ? "curtain-up" : ""}`} aria-hidden>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Art n={NAV[inter.idx].interstitial} className="inter-art w-44 md:w-56" />
              {inter.idx === 0 && (
                <span className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
                  <Steam className="absolute -top-10 left-1/2 w-10 -translate-x-1/2" />
                  <CupLogo size={56} />
                </span>
              )}
            </div>
            <p lang="hi" className="h1-hindi text-5xl md:text-6xl">
              {NAV[inter.idx].label}
            </p>
            <span className="progress-dash" />
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* First-visit intro (once per session)                               */
/* ------------------------------------------------------------------ */

export function Intro() {
  const [state, setState] = useState<"hidden" | "show" | "doors">("hidden");
  useEffect(() => {
    if (sessionStorage.getItem("q-intro") || reduced()) return;
    sessionStorage.setItem("q-intro", "1");
    setState("show");
    const t1 = window.setTimeout(() => setState("doors"), 2200);
    const t2 = window.setTimeout(() => setState("hidden"), 2900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
  if (state === "hidden") return null;
  return (
    <div
      className={`intro ${state === "doors" ? "intro-open" : ""}`}
      role="presentation"
      onClick={() => setState("hidden")}
    >
      <div className="intro-door left" />
      <div className="intro-door right" />
      <div className="intro-stage">
        <div className="relative">
          <Art n={24} className="w-40 opacity-90 md:w-52" priority />
          <span className="absolute bottom-[24%] left-1/2 flex -translate-x-1/2 flex-col items-center">
            <Steam className="w-12" />
            <CupLogo size={64} className="intro-cup" />
          </span>
        </div>
        <p lang="hi" className="extrude mt-4 text-3xl md:text-5xl">
          शब्द वो हैं जो ठहर जाएँ
        </p>
        <Wordmark animate className="mt-4 text-5xl md:text-7xl" />
        <p className="sr-only">{INTRO_LINE}</p>
        <button type="button" className="hand mt-6 text-base text-ink/70 underline" onClick={() => setState("hidden")}>
          skip
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Exit screen — "फिर मिलते हैं!"                                       */
/* ------------------------------------------------------------------ */

function leave() {
  window.close();
  window.setTimeout(() => window.location.replace("about:blank"), 300);
}

/**
 * History sentinel: one extra same-URL entry is pushed on load. When the visitor
 * presses Back on the first page of their visit, we land on the entry below it
 * (router index 0) and show the exit scene instead of leaving. A second Back
 * within 4s leaves naturally (no sentinel left); a second tap calls leave().
 */
export function useExitScreen() {
  const [exit, setExit] = useState<null | { armed: boolean }>(null);
  const timer = useRef<number | undefined>(undefined);
  const pushed = useRef(false);

  const pushSentinel = useCallback(() => {
    const st = window.history.state ?? {};
    window.history.pushState({ ...st, __TSR_index: (st.__TSR_index ?? 0) + 1, qSentinel: true }, "", window.location.href);
    pushed.current = true;
  }, []);

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setExit(null);
    if (!window.history.state?.qSentinel && (window.history.state?.__TSR_index ?? 0) === 0) pushSentinel();
  }, [pushSentinel]);

  const show = useCallback(() => {
    setExit({ armed: true });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(dismiss, 4000);
  }, [dismiss]);

  useEffect(() => {
    if (!pushed.current && (window.history.state?.__TSR_index ?? 0) === 0) pushSentinel();
    const onPop = () => {
      if ((window.history.state?.__TSR_index ?? 0) === 0 && !window.history.state?.qSentinel) show();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [pushSentinel, show]);

  const tap = () => {
    if (exit?.armed) leave();
  };

  return { exit, show: () => setExitFromMenu(), tap, dismiss };

  function setExitFromMenu() {
    setExit({ armed: false });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(dismiss, 6000);
  }
}

export function ExitScreen({
  armed,
  onTap,
  onArm,
  onStay,
}: {
  armed: boolean;
  onTap: () => void;
  onArm: () => void;
  onStay: () => void;
}) {
  return (
    <div
      className="exit-screen"
      role="dialog"
      aria-modal="true"
      aria-label="फिर मिलते हैं!"
      onClick={() => (armed ? onTap() : onArm())}
    >
      <Art n={44} className="dove-out absolute left-[10%] top-[12%] w-28" />
      <Art n={44} className="dove-out absolute right-[12%] top-[20%] w-20" style={{ animationDelay: "0.4s" }} />
      <Art n={20} className="swan-glide absolute bottom-[8%] left-[6%] w-28 md:w-40" />
      <div className="relative flex flex-col items-center text-center">
        <span className="relative">
          <Steam className="steam-fade absolute -top-12 left-1/2 w-12 -translate-x-1/2" />
          <CupLogo size={72} />
        </span>
        <p lang="hi" className="swirl mt-6">
          फिर मिलते हैं!
        </p>
        <p className={`mt-4 font-body text-xl italic text-cream ${armed ? "pulse-soft" : ""}`}>
          {armed ? <span lang="hi">एक बार और…</span> : null} <em>Tap twice to leave</em>
        </p>
        <button
          type="button"
          className="mt-8 font-body text-lg text-cream/80 underline"
          onClick={(e) => {
            e.stopPropagation();
            onStay();
          }}
        >
          Stay.
        </button>
      </div>
    </div>
  );
}
