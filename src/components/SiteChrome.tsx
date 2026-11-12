import { Link, useRouterState } from "@tanstack/react-router";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Art } from "@/components/Art";
import { CupLogo, Steam, Wordmark } from "@/components/Wordmark";

/* ------------------------------------------------------------------ */
/* Header + आँगन menu overlay + page interstitial                      */
/* ------------------------------------------------------------------ */

export function SiteChrome() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const menuOpen = pathname === "/menu";

  return (
    <header className="site-header">
      <Link to="/" className="flex items-center gap-2" aria-label="Qambakht. home">
        <CupLogo size={40} />
        <Wordmark className="wm-sm" />
      </Link>
      <Link
        to={menuOpen ? "/" : "/menu"}
        className="menu-btn"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        data-menu-open={menuOpen ? "true" : undefined}
        title={menuOpen ? "Close navigation" : "Open navigation"}
      >
        {menuOpen ? <CloseIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
      </Link>
    </header>
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
      aria-label="Goodbye screen"
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
        <p className="swirl mt-6">See you soon.</p>
        <p className={`mt-4 font-body text-xl italic text-cream ${armed ? "pulse-soft" : ""}`}>
          {armed ? <span>One more tap…</span> : null} <em>Tap twice to leave</em>
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
