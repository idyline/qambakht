import type { CSSProperties } from "react";
import { ART, type ArtNo } from "@/data/site";
import { cn } from "@/lib/utils";

type Props = {
  n: ArtNo;
  className?: string;
  style?: CSSProperties;
  /** multiply = white disappears on paper; print = framed paper print; plain = as-is */
  look?: "multiply" | "print" | "plain";
  alt?: string;
  priority?: boolean;
  /** Fill the wrapper (object-fit cover) instead of keeping the source ratio. */
  cover?: boolean;
};

/**
 * Renders one catalogue illustration with its clean-up crop applied, so no
 * artist name, handle or UI button is ever visible.
 */
export function Art({ n, className, style, look = "plain", alt = "", priority, cover }: Props) {
  const p = ART[n] as (typeof ART)[ArtNo] & { crop?: [number, number, number, number]; patch?: { x: number; y: number; w: number; h: number; color: string } };
  const [t, r, b, l] = p.crop ?? [0, 0, 0, 0];
  const vw = 1 - l - r;
  const vh = 1 - t - b;
  const ratio = (p.w * vw) / (p.h * vh);
  const img = (
    <img
      src={p.src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={p.w}
      height={p.h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      draggable={false}
      style={
        cover
          ? { width: "100%", height: "100%", objectFit: "cover" }
          : {
              position: "absolute",
              width: `${100 / vw}%`,
              height: `${100 / vh}%`,
              left: `${(-l / vw) * 100}%`,
              top: `${(-t / vh) * 100}%`,
              maxWidth: "none",
            }
      }
    />
  );
  return (
    <span
      className={cn("art", `art-${look}`, className)}
      style={{ aspectRatio: cover ? undefined : String(ratio), ...style }}
    >
      {img}
      {p.patch && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: `${((p.patch.x - l) / vw) * 100}%`,
            top: `${((p.patch.y - t) / vh) * 100}%`,
            width: `${(p.patch.w / vw) * 100}%`,
            height: `${(p.patch.h / vh) * 100}%`,
            background: p.patch.color,
            filter: "blur(2px)",
          }}
        />
      )}
    </span>
  );
}
