import { createFileRoute, Link } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { BLURBS, covers, pdfs, pageHead } from "@/data/site";

export const Route = createFileRoute("/library")({
  head: () => pageHead("The reading room of Qambakht. — Aam Zindagi! in English and Hindi, read online or download the PDF."),
  component: Library,
});

function Library() {
  return (
    <div className="relative overflow-hidden pt-28">
      <header className="mx-auto max-w-5xl px-6 text-center">
        <h1 lang="hi" className="h1-hindi text-6xl md:text-7xl">पुस्तकालय</h1>
        <p className="sub">The Reading Room — pull a chair, the lamp is on.</p>
      </header>

      <div className="relative mx-auto mt-16 grid max-w-6xl gap-20 px-6 lg:grid-cols-[120px_1fr_120px]">
        <Art n={35} look="multiply" className="hidden w-full self-start lg:block" />
        <div className="space-y-28">
          <Stall lang="english" />
          <div className="flex flex-wrap items-center justify-center gap-10">
            <Art n={47} className="medallion w-56" alt="" />
            <figure className="print-hang rotate-[1.5deg]">
              <span className="nail" aria-hidden />
              <Art n={46} look="print" className="w-64" />
            </figure>
            <div className="shelf">
              <Art n={45} look="multiply" className="w-28" />
            </div>
          </div>
          <Stall lang="hindi" />
        </div>
        <Art n={39} look="multiply" className="hidden w-full self-end lg:block" />
      </div>
    </div>
  );
}

function Stall({ lang }: { lang: "english" | "hindi" }) {
  const en = lang === "english";
  const c = covers[lang];
  return (
    <section className={`stall relative ${en ? "stall-en" : "stall-hi"}`}>
      {en ? (
        <>
          <Art n={28} className="stall-frame" cover />
          <Art n={26} look="multiply" className="absolute -right-6 -top-8 z-[3] w-24 rotate-[8deg]" />
        </>
      ) : (
        <>
          <div className="warli-strip left-0" style={{ backgroundImage: "url(/assets/art/34-warli-sheet.jpg)" }} aria-hidden />
          <div className="warli-strip right-0" style={{ backgroundImage: "url(/assets/art/34-warli-sheet.jpg)" }} aria-hidden />
          <Art n={42} className="absolute -bottom-6 -right-8 z-[3] hidden w-36 md:block" look="multiply" />
        </>
      )}
      <div className="stall-inner relative z-[2] grid items-center gap-8 md:grid-cols-[220px_1fr]">
        <img src={c.url} alt={`Cover of ${c.title}`} width={600} height={900} loading="lazy" decoding="async" className="book-lift mx-auto w-52 shadow-paper" />
        <div>
          <p className="stamp">{en ? "LANGUAGE: ENGLISH" : "भाषा: हिन्दी"}</p>
          <div className="overprint mt-3">
            <span className="op-hi" lang="hi">आम ज़िंदगी!</span>
            <span className="op-en">Aam Zindagi!</span>
          </div>
          <p className="mt-4 max-w-md leading-relaxed" lang={en ? "en" : "hi"}>{BLURBS[lang]}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/read/$lang" params={{ lang }} className="cut-btn">Read Now</Link>
            <a href={pdfs[lang].url} download={`aam-zindagi-${lang}.pdf`} className="cut-btn cut-btn-alt">Download PDF</a>
          </div>
          <div className="lending-card mt-8">
            <p className="stencil">QAMBAKHT. LENDING CARD</p>
            <p><span lang="hi">भाषा</span> ........ {en ? "English" : "हिन्दी"}</p>
            <p>Format ...... Online + PDF</p>
            <p>Title ....... {c.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
