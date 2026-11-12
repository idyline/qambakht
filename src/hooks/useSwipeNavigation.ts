import { useEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";

/** The navbar page order used by swipe navigation. */
export const PAGE_ORDER = ["/", "/library", "/author", "/connect", "/buy"] as const;

/**
 * Pure swipe decision: given the current pathname and the touch delta,
 * return the page to navigate to (swipe left = next page, right = previous),
 * or null when the gesture is not a confident horizontal page swipe.
 */
export function swipeTarget(
  pathname: string,
  dx: number,
  dy: number,
): (typeof PAGE_ORDER)[number] | null {
  if (Math.abs(dx) < 64 || Math.abs(dx) <= Math.abs(dy) * 1.4) return null;

  const base = pathname === "/" ? "/" : PAGE_ORDER.find((p) => p !== "/" && pathname.startsWith(p));
  if (!base) return null; // e.g. the PDF reader page — no page swiping there

  const idx = PAGE_ORDER.indexOf(base);
  const next = dx < 0 ? idx + 1 : idx - 1;
  if (next < 0 || next >= PAGE_ORDER.length) return null;
  return PAGE_ORDER[next] ?? null;
}

/**
 * Global touch-gesture navigation: glide horizontally between the navbar
 * pages (Home ↔ Library ↔ Author ↔ Connect). Vertical scrolling and short
 * or ambiguous gestures are ignored, and the PDF reader is never swapped.
 */
export function useSwipeNavigation() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let sx = 0;
    let sy = 0;
    let t0 = 0;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      sx = t.clientX;
      sy = t.clientY;
      t0 = Date.now();
    };

    const onEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t) return;
      if (Date.now() - t0 > 800) return;
      const target = swipeTarget(pathname, t.clientX - sx, t.clientY - sy);
      if (target) void router.navigate({ to: target });
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [pathname, router]);
}
