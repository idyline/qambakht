import { Link, useRouter } from "@tanstack/react-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

import { CupLogo, Steam, Wordmark } from "@/components/Wordmark";
import { INTRO_LINE, NAV, type NavTo } from "@/data/site";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

/* ------------------------------------------------------------------ */
/* The signature stage — shared by the preloader and every page change */
/* ------------------------------------------------------------------ */

export function SignatureStage({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="sig-stage">
      <span className="sig-glass">
        <span className="sig-halo" aria-hidden />
        <Steam className="sig-steam" />
        <CupLogo size={96} className="sig-cup" />
      </span>
      <Wordmark className="sig-wordmark" />
      <svg viewBox="0 0 400 30" className="sig-flourish" aria-hidden>
        <path d="M10 15 C 80 2, 130 28, 200 15 S 320 2, 390 15" />
        <circle cx="200" cy="15" r="4" />
      </svg>
      <p lang="hi" className="sig-label">
        {label}
      </p>
      {sub && <p className="sig-sub">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Preloader — server-rendered, so it covers the page before hydration */
/* ------------------------------------------------------------------ */

export function Preloader() {
  const [state, setState] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    let alive = true;
    const start = performance.now();
    const minMs = reduced() ? 250 : 1700;
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });
    const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
    void Promise.race([Promise.all([loaded, fonts]), wait(4500)]).then(async () => {
      await wait(Math.max(0, minMs - (performance.now() - start)));
      if (alive) setState((s) => (s === "show" ? "leaving" : s));
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    const t = window.setTimeout(() => setState("gone"), reduced() ? 0 : 750);
    return () => window.clearTimeout(t);
  }, [state]);

  if (state === "gone") return null;
  return (
    <div
      className={`preloader ${state === "leaving" ? "is-leaving" : ""}`}
      role="presentation"
      onClick={() => setState("leaving")}
    >
      <noscript>
        <style>{".preloader{display:none}"}</style>
      </noscript>
      <SignatureStage label={INTRO_LINE} />
      <button type="button" className="skip-btn" onClick={() => setState("leaving")}>
        skip
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page curtain — every nav click plays the signature screen           */
/* ------------------------------------------------------------------ */

type GoOptions = { onCovered?: () => void };
type Go = (to: NavTo, opts?: GoOptions) => void;

const TransitionCtx = createContext<Go>(() => {});

export const usePageTransition = () => useContext(TransitionCtx);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [curtain, setCurtain] = useState<null | { to: NavTo; out: boolean }>(null);
  const busy = useRef(false);

  const go = useCallback<Go>(
    (to, opts) => {
      if (busy.current) return;
      if (reduced()) {
        opts?.onCovered?.();
        void router.navigate({ to }).then(() => window.scrollTo({ top: 0, behavior: "instant" }));
        return;
      }
      busy.current = true;
      setCurtain({ to, out: false });
      void (async () => {
        const t0 = performance.now();
        await wait(360);
        opts?.onCovered?.();
        window.scrollTo({ top: 0, behavior: "instant" });
        try {
          await router.navigate({ to });
        } finally {
          window.scrollTo({ top: 0, behavior: "instant" });
          await wait(Math.max(0, 1150 - (performance.now() - t0)));
          setCurtain({ to, out: true });
          await wait(520);
          setCurtain(null);
          busy.current = false;
        }
      })();
    },
    [router],
  );

  const page = curtain ? NAV.find((n) => n.to === curtain.to) : undefined;

  return (
    <TransitionCtx.Provider value={go}>
      {children}
      {curtain && page && (
        <div className={`page-curtain ${curtain.out ? "is-leaving" : ""}`} aria-hidden>
          <SignatureStage label={page.label} sub={page.en} />
        </div>
      )}
    </TransitionCtx.Provider>
  );
}

type NavLinkProps = { to: NavTo; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "target"
>;

/** Internal link that plays the signature curtain; modifier-clicks still open new tabs natively. */
export function NavLink({ to, onClick, children, ...rest }: NavLinkProps) {
  const go = usePageTransition();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    e.preventDefault();
    go(to);
  };
  return (
    <Link to={to} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
