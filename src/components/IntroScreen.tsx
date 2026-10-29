import { useEffect, useState } from "react";

/**
 * Full-screen intro curtain. Plays on every full page load / refresh
 * (no session caching), then dissolves into the site.
 */
export function IntroScreen() {
  const [phase, setPhase] = useState<"playing" | "leaving" | "gone">("playing");

  useEffect(() => {
    const leave = window.setTimeout(() => setPhase("leaving"), 3000);
    const gone = window.setTimeout(() => setPhase("gone"), 3800);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
    };
  }, []);

  if (phase === "gone") return null;

  const leaving = phase === "leaving";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${leaving ? "intro-leave pointer-events-none" : ""}`}
      style={{
        background:
          "radial-gradient(120% 120% at 50% 20%, oklch(0.26 0.02 62) 0%, oklch(0.21 0.014 60) 48%, oklch(0.17 0.012 55) 100%)",
      }}
    >
      {/* soft gold bloom */}
      <div
        className="intro-glow absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.745 0.115 75 / 14%), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center px-6 text-center">
        <p
          className="intro-rise font-hindi text-sm tracking-[0.45em] text-gold-bright/90 sm:text-base"
          style={{ textIndent: "0.45em" }}
        >
          शब्द वो हैं जो ठहर जाएँ
        </p>
        <h1
          className="intro-rise-delayed font-display mt-6 text-6xl font-medium text-tan sm:text-7xl md:text-8xl"
          style={{ fontVariationSettings: '"SOFT" 40' }}
        >
          Qambakht
        </h1>
        <div
          className="intro-line mt-8 h-px w-56 origin-center sm:w-72"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.745 0.115 75), transparent)" }}
        />
      </div>
    </div>
  );
}
