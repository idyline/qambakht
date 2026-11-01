import { Art } from "@/components/Art";
import { Lockup } from "@/components/Wordmark";

/** Footer: no nav tabs (by request) — lockup left, sun-moon + peacock centre, credit right. */
export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="border-strip" style={{ backgroundImage: "url(/assets/art/33-border-geometric-tan.jpg)" }} aria-hidden />
      <div className="night-panel">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 md:grid-cols-3">
          <Lockup className="justify-self-center md:justify-self-start" />
          <div className="flex items-center justify-center gap-4">
            <Art n={13} look="print" className="w-24 rotate-[-3deg]" />
            <Art n={38} look="plain" className="w-16 rotate-[2deg] rounded-[50%]" />
          </div>
          <p className="foil text-center font-bodoni text-sm tracking-[0.12em] md:text-right">
            © 2026 Qambakht. · Adarsh Anand
          </p>
        </div>
      </div>
    </footer>
  );
}
