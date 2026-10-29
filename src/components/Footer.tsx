import { Feather } from "lucide-react";

import { Link } from "@tanstack/react-router";

/**
 * Site footer. Deliberately carries no navigation tabs — those live only in
 * the top navbar.
 */
export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Qambakht home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-primary/15 text-gold">
            <Feather className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-medium tracking-wide text-tan">
            Qambakht
          </span>
        </Link>
        <p className="font-hindi text-sm text-gold-bright/90">
          शब्द वो हैं जो ठहर जाएँ
        </p>
        <p className="text-xs tracking-widest uppercase text-tan-muted/80">
          Stories that stay with you
        </p>
        <p className="text-xs text-tan-muted/70">
          © {new Date().getFullYear()} Qambakht · Adarsh Anand · Made with warmth
        </p>
      </div>
    </footer>
  );
}
