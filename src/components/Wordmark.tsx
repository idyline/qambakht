import { LOGO } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The swappable "Qambakht." wordmark — angular cut block letters, mustard fill,
 * hard maroon offset shadow, halftone inside. Replace this one file with a drawn SVG later.
 */
export function Wordmark({ className, animate }: { className?: string; animate?: boolean }) {
  const letters = "Qambakht".split("");
  return (
    <span className={cn("wordmark", animate && "wordmark-drop", className)} aria-label="Qambakht." role="img">
      {letters.map((ch, i) => (
        <span key={i} className="wm-l" style={{ animationDelay: `${i * 70}ms` }} aria-hidden>
          {ch}
        </span>
      ))}
      <span className="wm-dot" style={{ animationDelay: `${letters.length * 70}ms` }} aria-hidden />
    </span>
  );
}

export function CupLogo({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <img
      src={LOGO}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={cn("cup-logo", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Hand-drawn steam strokes rising from the cup. */
export function Steam({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={cn("steam", className)} aria-hidden>
      {[14, 30, 46].map((x, i) => (
        <path
          key={x}
          d={`M${x} 58 C ${x - 8} 44, ${x + 8} 34, ${x} 20 S ${x + 4} 6, ${x} 2`}
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </svg>
  );
}

export function Lockup({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <CupLogo size={size} />
      <Wordmark />
    </span>
  );
}
