import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Scroll progress 0..1 plus whether the page scrolls at all. */
function useScrollProgress() {
  const [s, setS] = useState({ p: 0, y: 0, ratio: 1 });
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setS({
        p: max > 0 ? window.scrollY / max : 0,
        y: window.scrollY,
        ratio: window.innerHeight / doc.scrollHeight,
      });
    };
    const on = () => {
      if (!raf) raf = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    const ro = new ResizeObserver(on);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      ro.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);
  return s;
}

/** Replaces the hidden native scrollbar: a slim amber thumb that glows while you scroll, draggable on desktop. */
export function ScrollThumb() {
  const { p, ratio } = useScrollProgress();
  const [active, setActive] = useState(false);
  const idle = useRef<number | undefined>(undefined);
  const drag = useRef<null | { y: number; top: number }>(null);

  useEffect(() => {
    setActive(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => !drag.current && setActive(false), 1100);
  }, [p]);

  if (ratio >= 0.995) return null;
  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  const thumb = Math.max(48, ratio * vh);
  const top = p * (vh - thumb);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, top: window.scrollY };
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const dy = e.clientY - drag.current.y;
    window.scrollTo({ top: drag.current.top + (dy / (vh - thumb)) * max, behavior: "instant" });
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <div className={`scroll-rail ${active ? "is-active" : ""}`} aria-hidden>
      <div
        className="scroll-thumb"
        style={{ height: thumb, transform: `translateY(${top}px)` }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      />
    </div>
  );
}

/** Glass floating button, bottom-right: appears after a scroll, ring shows progress, one click back to the header. */
export function BackToTop() {
  const { p, y } = useScrollProgress();
  const show = y > 480;
  const C = 2 * Math.PI * 22;
  return (
    <button
      type="button"
      className={`to-top ${show ? "is-shown" : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg viewBox="0 0 48 48" className="to-top-ring" aria-hidden>
        <circle cx="24" cy="24" r="22" className="track" />
        <circle
          cx="24"
          cy="24"
          r="22"
          className="bar"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - p)}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" strokeWidth={2.2} />
    </button>
  );
}
