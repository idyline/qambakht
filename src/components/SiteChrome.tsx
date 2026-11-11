import { useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { Art } from "@/components/Art";
import { NavLink, usePageTransition } from "@/components/Transition";
import { CupLogo, LogoBadge, Lockup, Steam, Wordmark } from "@/components/Wordmark";
import { NAV } from "@/data/site";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Header + आँगन menu overlay                                          */
/* ------------------------------------------------------------------ */

export function SiteChrome({ onExit }: { onExit: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const go = usePageTransition();
  const btnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState<"closed" | "open" | "closing">("closed");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setMenu("open");
  };
  const closeMenu = useCallback((after?: () => void) => {
    setMenu("closing");
    window.setTimeout(
      () => {
        setMenu("closed");
        btnRef.current?.focus();
        after?.();
      },
      reduced() ? 0 : 500,
    );
  }, []);

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

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <NavLink to="/" className="flex items-center gap-2.5" aria-label="Qambakht. — घर">
          <LogoBadge size={32} />
          <Wordmark className="wm-sm" />
        </NavLink>
        <button
          ref={btnRef}
          type="button"
          className="menu-btn"
          aria-label="मेन्यू"
          aria-expanded={open}
          onClick={() => (menu === "closed" ? openMenu() : closeMenu())}
        >
          <span className="bar" style={{ width: 20 }} />
          <span className="bar" style={{ width: 14 }} />
          <span className="bar" style={{ width: 17 }} />
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

          <button
            type="button"
            className="angan-close"
            aria-label="बंद करें"
            onClick={() => closeMenu()}
          >
            <span aria-hidden>✕</span>
          </button>

          <div className="angan-inner">
            <nav aria-label="मुख्य">
              <ul className="angan-list">
                {NAV.map((n, i) => (
                  <li
                    key={n.to}
                    className="angan-item"
                    style={{ animationDelay: `${140 + i * 70}ms` }}
                  >
                    <a
                      href={n.to}
                      onClick={(e) => {
                        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
                          return;
                        e.preventDefault();
                        go(n.to, { onCovered: () => setMenu("closed") });
                      }}
                      className="angan-link"
                      aria-current={pathname === n.to ? "page" : undefined}
                    >
                      <span className="angan-num" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        lang="hi"
                        className={`angan-word ${pathname === n.to ? "is-current" : ""}`}
                      >
                        {n.label}
                      </span>
                      <span className="angan-en">{n.en}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="angan-foot">
              <Lockup size={32} className="angan-lockup" />
              <button
                type="button"
                className="angan-bye"
                lang="hi"
                onClick={() => closeMenu(onExit)}
              >
                फिर मिलते हैं!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
