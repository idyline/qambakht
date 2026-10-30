import { Feather } from "lucide-react";

import { Link } from "@tanstack/react-router";

/**
 * Site footer. Deliberately carries no navigation tabs — those live only in
 * the top navbar. Just the wordmark on the left, the copyright on the right.
 */
export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <Link to="/" className="flex items-center gap-3" aria-label="Qambakht home">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-primary/12 text-gold">
            <Feather className="h-3.5 w-3.5" />
          </span>
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
