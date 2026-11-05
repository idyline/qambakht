import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (≤6). */
  max?: number;
  /** Rise towards the pointer in px. */
  lift?: number;
  /** Magnetic pull towards the pointer in px (≤8). */
  magnet?: number;
};

/**
 * Pointer-tracked card motion: ≤6° tilt, soft lift, ≤8px magnetic pull and a
 * shadow bloom — springs back on leave, inert under reduced motion.
 */
export function Tilt({ children, className, max = 5, lift = 10, magnet = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (reduced() || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
    el.style.setProperty("--tz", `${lift}px`);
    el.style.setProperty("--mx", `${(px * magnet).toFixed(1)}px`);
    el.style.setProperty("--my", `${(py * magnet).toFixed(1)}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tz", "0px");
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("tilt", className)}>
      {children}
    </div>
  );
}
