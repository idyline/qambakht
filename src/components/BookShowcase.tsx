import { useRef } from "react";

import { NavLink } from "@/components/Transition";
import { covers } from "@/data/site";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Two floating 3D covers that lean towards the cursor. */
export function BookShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (reduced() || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--sx", `${(px * 14).toFixed(2)}deg`);
    el.style.setProperty("--sy", `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--sx", "0deg");
    el.style.setProperty("--sy", "0deg");
  };

  return (
    <div ref={ref} className="showcase" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="showcase-glow" aria-hidden />
      <div className="showcase-stage">
        <NavLink
          to="/library"
          className="showcase-book is-back"
          aria-label="Aam Zindagi! — English, in the library"
        >
          <span className="book3d">
            <img src={covers.english.url} alt="Cover of Aam Zindagi!" width={640} height={989} />
          </span>
        </NavLink>
        <NavLink
          to="/library"
          className="showcase-book is-front"
          aria-label="आम ज़िंदगी! — हिन्दी, in the library"
        >
          <span className="book3d">
            <img
              src={covers.hindi.url}
              alt="Cover of आम ज़िंदगी!"
              width={640}
              height={989}
              fetchPriority="high"
            />
          </span>
        </NavLink>
      </div>
      <div className="showcase-shadow" aria-hidden />
    </div>
  );
}
