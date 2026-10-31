import { Link } from "@tanstack/react-router";

import { logoUrl } from "@/data/site";

/**
 * Site footer. Deliberately carries no navigation tabs — those live only in
 * the top navbar. Just the wordmark on the left, the copyright on the right.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Link to="/" className="flex items-center gap-3" aria-label="Qambakht home">
          <img
            src={logoUrl}
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            loading="lazy"
            className="h-8 w-8 object-contain"
          />
          <span className="font-display text-lg font-medium tracking-wide text-tan">
            Qambakht
          </span>
        </Link>
        <p className="text-xs text-tan-muted/80">
          © {new Date().getFullYear()} Qambakht · Adarsh Anand
        </p>
      </div>
    </footer>
  );
}
