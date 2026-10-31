import { useEffect, useState } from "react";

import { filigreeUrl } from "@/data/site";

/**
 * Full-screen intro curtain. Plays on every full page load / refresh
 * (no session caching), then dissolves into the site.
 * Sleek and centred: a small Devanagari line, a large cream serif wordmark,
 * and an ornate Indian classical gold filigree flourish that expands
 * gracefully beneath the name before the whole scene dissolves.
 */
export function IntroScreen() {
  const [phase, setPhase] = useState<"playing" | "leaving" | "gone">("playing");

  useEffect(() => {
    const leave = window.setTimeout(() => setPhase("leaving"), 2000);
    const gone = window.setTimeout(() => setPhase("gone"), 2600);
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
          "radial-gradient(120% 120% at 50% 18%, oklch(0.24 0.012 55) 0%, oklch(0.19 0.008 55) 50%, oklch(0.16 0.007 50) 100%)",
      }}
    >
      {/* soft warm bloom */}
      <div
        className="intro-glow absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.740 0.118 80 / 12%), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center px-6 text-center">
        <p className="intro-rise font-hindi text-sm text-cream/85 sm:text-base" style={{ letterSpacing: "0.02em" }}>
          शब्द वो हैं जो ठहर जाएँ
        </p>
        <h1
          className="intro-rise-delayed font-display mt-5 text-5xl font-normal text-tan sm:text-6xl md:text-7xl"
          style={{ letterSpacing: "0.01em", fontVariationSettings: '"SOFT" 40' }}
        >
          Qambakht
        </h1>
        <img
          src={filigreeUrl}
          alt=""
          className="intro-filigree mt-6 h-8 w-52 origin-center object-contain sm:h-10 sm:w-72 md:w-80"
        />
      </div>
    </div>
  );
}
