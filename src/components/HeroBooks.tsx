import { useCallback, useRef, useState } from "react";

type Props = {
  hindiUrl: string;
  englishUrl: string;
  hindiTitle: string;
  englishTitle: string;
  crestUrl: string;
};

/**
 * The hero book stack, alive in three dimensions:
 *  - the stage tracks the pointer and tilts the whole stack in perspective
 *  - each book idles on its own gentle float cycle
 *  - the books sit at different depths (preserve-3d) and pop toward the
 *    reader on hover
 *  - a warm glow pool drifts with the pointer beneath the covers
 *  - vertical warli crest ribbons frame the stack on both sides
 */
export function HeroBooks({ hindiUrl, englishUrl, hindiTitle, englishTitle, crestUrl }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 42 });

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 13,
      ry: (px - 0.5) * 17,
      px: Math.min(96, Math.max(4, px * 100)),
      py: Math.min(96, Math.max(4, py * 100)),
    });
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, px: 50, py: 42 });
  }, []);

  return (
    <div
      ref={stageRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="hero-books-stage relative mx-auto flex w-full max-w-md items-center justify-center py-10"
    >
      {/* warli crest ribbons framing the book stack */}
      <img src={crestUrl} alt="" aria-hidden="true" className="hero-crest hero-crest-left" loading="lazy" />
      <img src={crestUrl} alt="" aria-hidden="true" className="hero-crest hero-crest-right" loading="lazy" />

      <div
        className="hero-books-tilt relative"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        {/* warm glow pool that drifts with the pointer */}
        <div
          aria-hidden="true"
          className="hero-books-glow"
          style={{ left: `${tilt.px}%`, top: `${tilt.py}%` }}
        />

        <div className="hero-float hero-float-a relative z-10">
          <img
            src={hindiUrl}
            alt={`Cover of the Hindi edition, ${hindiTitle}`}
            width={240}
            height={360}
            className="hero-book hero-book-back w-52 rounded-xl sm:w-60"
          />
        </div>
        <div className="hero-float hero-float-b relative z-20 -ml-14 sm:-ml-16">
          <img
            src={englishUrl}
            alt={`Cover of the English edition, ${englishTitle}`}
            width={240}
            height={360}
            className="hero-book hero-book-front w-52 rounded-xl sm:w-60"
          />
        </div>
      </div>
    </div>
  );
}
