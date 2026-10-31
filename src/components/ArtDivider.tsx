import { arts } from "@/data/site";

/**
 * An elephant-procession frieze used to divide major layouts — between the
 * hero and curated reading, and across page breaks. Repeats horizontally,
 * fading out at both ends.
 */
export function ArtDivider({ className = "max-w-2xl" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`art-frieze mx-auto ${className}`}
      style={{ backgroundImage: `url(${arts.frieze})` }}
    />
  );
}
