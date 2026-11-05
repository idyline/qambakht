import { Lockup } from "@/components/Wordmark";

/**
 * Footer: no nav tabs (by request) — a classical border strip above, the cup +
 * wordmark bottom-left, the copyright bottom-right.
 */
export function Footer() {
  return (
    <footer className="relative mt-24">
      <div
        className="border-strip"
        style={{ backgroundImage: "url(/assets/art/33-border-geometric-tan.jpg)" }}
        aria-hidden
      />
      <div className="night-panel">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10">
          <Lockup />
          <p className="foil text-sm tracking-[0.12em]">© 2026 Qambakht. · Adarsh Anand</p>
        </div>
      </div>
    </footer>
  );
}
