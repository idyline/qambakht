import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { Art } from "@/components/Art";
import { CupLogo, Steam, Wordmark } from "@/components/Wordmark";
import { INTRO_LINE } from "@/data/site";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Header + आँगन menu overlay + page interstitial                      */
/* ------------------------------------------------------------------ */

export function SiteChrome() {
  return (
    <header className="site-header">
      <Link to="/" className="flex items-center gap-2" aria-label="Qambakht. — घर">
        <CupLogo size={40} />
        <Wordmark className="wm-sm" />
      </Link>
      <Link to="/menu" className="menu-btn" aria-label="मेन्यू">
        <span className="bar" style={{ width: 28 }} />
        <span className="bar" style={{ width: 20 }} />
        <span className="bar" style={{ width: 24 }} />
        <span className="menu-dot" />
      </Link>
    </header>
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
    const t1 = window.setTimeout(() => setState("doors"), 2600);
    const t2 = window.setTimeout(() => setState("hidden"), 3300);
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
      <div className="intro-bg" />
      <div className="intro-stage">
        <span className="relative flex flex-col items-center">
          <Steam className="w-16" />
          <CupLogo size={140} className="intro-cup" />
        </span>
        <Wordmark animate className="mt-6 text-[clamp(4rem,13vw,9rem)]" />
        <svg viewBox="0 0 400 30" className="intro-flourish mt-2 w-[min(70vw,420px)]" aria-hidden>
          <path d="M10 15 C 80 2, 130 28, 200 15 S 320 2, 390 15" />
          <circle cx="200" cy="15" r="4" />
        </svg>
        <p lang="hi" className="intro-line mt-4 text-2xl md:text-3xl">
          {INTRO_LINE}
        </p>
        <button type="button" className="skip-btn mt-8" onClick={() => setState("hidden")}>
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
    window.history.pushState(
      { ...st, __TSR_index: (st.__TSR_index ?? 0) + 1, qSentinel: true },
      "",
      window.location.href,
    );
    pushed.current = true;
  }, []);

  const dismiss = useCallback(() => {
    window.clearTimeout(timer.current);
    setExit(null);
    if (!window.history.state?.qSentinel && (window.history.state?.__TSR_index ?? 0) === 0)
      pushSentinel();
  }, [pushSentinel]);

  const show = useCallback(() => {
    setExit({ armed: true });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(dismiss, 4000);
  }, [dismiss]);

  useEffect(() => {
    if (!pushed.current && (window.history.state?.__TSR_index ?? 0) === 0) pushSentinel();
    const onPop = () => {
      if ((window.history.state?.__TSR_index ?? 0) === 0 && !window.history.state?.qSentinel)
        show();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [pushSentinel, show]);

  const tap = () => {
    if (exit?.armed) leave();
  };

  const openFromMenu = () => {
    setExit({ armed: false });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(dismiss, 6000);
  };

  return { exit, openFromMenu, arm: show, tap, dismiss };
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
      <Art
        n={44}
        className="dove-out absolute right-[12%] top-[20%] w-20"
        style={{ animationDelay: "0.4s" }}
      />
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
