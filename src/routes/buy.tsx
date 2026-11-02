import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Art } from "@/components/Art";
import { covers, pageHead } from "@/data/site";
import { PURCHASE_LINKS } from "@/data/purchaseLinks";

export const Route = createFileRoute("/buy")({
  head: () => pageHead("Buy Aam Zindagi! by Adarsh Anand — English on Amazon or Pothi, Hindi on Pothi."),
  component: Buy,
});

function Buy() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative overflow-hidden pt-24">
      <div className="awning" aria-hidden />
      <div className="frieze-thin" aria-hidden style={{ backgroundImage: "url(/assets/art/33-border-geometric-tan.jpg)" }} />
      <header className="relative mx-auto mt-10 max-w-3xl px-6 text-center">
        <div className="signboard inline-flex items-center gap-4 px-8 py-5">
          <Art n={38} className="w-16 rounded-[50%]" />
          <h1 lang="hi" className="tukda text-4xl md:text-6xl">किताब ले लो!</h1>
        </div>
        <p className="sub mt-4">The Bazaar Stall</p>
      </header>

      <section className="relative mx-auto mt-16 grid max-w-6xl items-start gap-10 px-6 md:grid-cols-[160px_1fr_160px]">
        <Art n={48} look="multiply" className="mx-auto hidden w-full md:block" />
        <div className="flex flex-wrap justify-center gap-14">
          <PriceTag title="Aam Zindagi!" sub="English" cover={covers.english.url} onClick={() => setOpen(true)} />
          <PriceTag title="आम ज़िंदगी!" sub="हिन्दी" cover={covers.hindi.url} href={PURCHASE_LINKS.hindiPothi} hindi />
        </div>
        <div className="flex flex-col items-center gap-6">
          <Art n={31} className="sticker w-28 rotate-[8deg]" />
          <Art n={7} className="sticker w-24 rotate-[-6deg]" />
        </div>
      </section>
      <div className="relative mx-auto mt-10 flex max-w-6xl items-end justify-between px-6">
        <Art n={15} look="multiply" className="w-28" />
        <div className="counter"><Art n={45} look="multiply" className="w-24" /></div>
      </div>

      {open && <ShopDialog onClose={() => setOpen(false)} />}
    </div>
  );
}

function PriceTag(props: { title: string; sub: string; cover: string; onClick?: () => void; href?: string; hindi?: boolean }) {
  const inner = <span lang="hi">ले लो!</span>;
  return (
    <div className="price-tag swing">
      <span className="tag-string" aria-hidden />
      <span className="tag-hole" aria-hidden />
      <img src={props.cover} alt={`Cover of ${props.title}`} width={600} height={900} loading="lazy" className="mx-auto w-36 shadow-paper" />
      <p className={props.hindi ? "op-hi mt-4 text-3xl" : "op-en mt-4 text-3xl"} lang={props.hindi ? "hi" : "en"}>{props.title}</p>
      <p className="stamp mt-1">{props.sub}</p>
      {props.href ? (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className="cut-btn mt-4">{inner}</a>
      ) : (
        <button type="button" onClick={props.onClick} className="cut-btn mt-4">{inner}</button>
      )}
    </div>
  );
}

function ShopDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus(); };
  }, [onClose]);
  return (
    <div className="dialog-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="shop-title" className="signboard shop-pop relative w-[min(92vw,460px)] p-8 text-center">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-2 text-2xl">✕</button>
        <Art n={44} look="multiply" className="dove-flutter absolute -left-10 -top-10 w-20" />
        <h2 id="shop-title" className="op-en text-3xl">Aam Zindagi!</h2>
        <p className="hand text-xl">where shall we wrap it from?</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a href={PURCHASE_LINKS.englishAmazon} target="_blank" rel="noopener noreferrer" className="ticket">Amazon</a>
          <a href={PURCHASE_LINKS.englishPothi} target="_blank" rel="noopener noreferrer" className="ticket">Pothi</a>
        </div>
      </div>
    </div>
  );
}
