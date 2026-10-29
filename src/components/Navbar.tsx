import { Feather } from "lucide-react";

import { Link, useLocation } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Library", to: "/library" },
  { label: "Author", to: "/author" },
  { label: "Feedback", to: "/feedback" },
] as const;

/** Fixed top navigation. Every button opens in the same browser tab. */
export function Navbar() {
  const { pathname } = useLocation();

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Qambakht home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-primary/15 text-gold">
            <Feather className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-medium tracking-wide text-tan">
            Qambakht
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm transition-colors sm:px-4",
                  isActive(item.to)
                    ? "text-gold-bright"
                    : "text-tan-muted hover:text-tan",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 -bottom-0.5 h-px bg-gold transition-opacity",
                    isActive(item.to) ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
