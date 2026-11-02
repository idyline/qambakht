import { createFileRoute, Link } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { Typewriter } from "@/components/Typewriter";
import { Wordmark } from "@/components/Wordmark";
import { BLURBS, HERO_LINE, covers, pageHead, type ArtNo } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => pageHead("Qambakht. — Aam Zindagi! by Adarsh Anand, in English and Hindi. A small desi art-gallery of a website."),
  component: Home,
});

const WALL: { n: ArtNo; plate: string; title: string; cls: string }[] = [
  { n: 1, plate: "01", title: "कमल की धूप", cls: "md:col-span-2 md:row-span-2 rotate-[-1.5deg]" },
  { n: 2, plate: "02", title: "a hand that waits", cls: "rotate-[2deg]" },
  { n: 3, plate: "03", title: "दो दोस्त", cls: "rotate-[-2deg]" },
  { n: 4, plate: "04", title: "veena, before dusk", cls: "rotate-[1deg]" },
  { n: 5, plate: "05", title: "मोर का मन", cls: "rotate-[-1deg]" },
  { n: 9, plate: "06", title: "a little elephant", cls: "rotate-[2.5deg]" },
  { n: 36, plate: "07", title: "तोता, चुप", cls: "rotate-[-2deg]" },
  { n: 40, plate: "08", title: "stitched, slowly", cls: "rotate-[1.5deg]" },
];

const RIBBON = [
  ["चाय", "f-brush"],
  ["गली", "f-blob"],
  ["गूँज", "f-heer"],
  ["कहानी", "f-salt"],
  ["ठहर", "f-tukda"],
  ["सुनाओ", "f-konkani"],
  ["अक्षर", "f-swirl"],
  ["रस", "f-tiro"],
];

function Home() {
  return (
    <div className="relative overflow-hidden pt-24">
      {/* HERO */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1.1fr_1fr]">
        <Art n={30} className="pointer-events-none absolute -bottom-10 -left-16 hidden w-56 rotate-[-8deg] opacity-95 md:block" look="multiply" />
        <div className="relative reveal">
          <Wordmark className="text-6xl sm:text-7xl md:text-8xl" />
          <p lang="hi" className="font-tiro mt-6 min-h-[4rem] text-xl leading-[1.8] sm:text-2xl">
            <Typewriter phrases={[HERO_LINE]} typingMs={60} holdingMs={4200} />
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed">
            Welcome to Qambakht. — a quiet corner of the internet where ordinary life reads like
            literature. Free, in English and Hindi, whenever the mood strikes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/library" className="cut-btn" lang="hi">पुस्तकालय चलें</Link>
            <Link to="/author" className="cut-btn cut-btn-alt" lang="hi">मिलिए कम्बख़्त से</Link>
          </div>
          <p lang="hi" className="margin-note mt-8 rotate-[-2deg]">पढ़ते-पढ़ते चाय ठंडी न हो जाए</p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <Art n={25} className="absolute -left-10 -top-10 z-0 w-32 rotate-[-4deg]" look="multiply" />
          <div className="relative z-[1]">
            <Art n={24} className="w-full" look="multiply" priority />
            <img
              src={covers.hindi.url}
              alt="Cover of आम ज़िंदगी! by Adarsh Anand"
              width={600}
              height={900}
              fetchPriority="high"
              className="cover-in-arch"
            />
          </div>
          <Art n={27} className="absolute -bottom-8 -right-10 z-[2] w-32" look="multiply" />
          <Art n={8} className="sticker absolute -right-6 top-6 z-[3] w-24 rotate-[12deg]" />
          <Art n={7} className="sticker absolute -left-8 bottom-20 z-[3] hidden w-24 rotate-[-10deg] sm:block" />
          <Art n={20} className="swan-glide absolute -bottom-16 left-1/3 z-[3] w-24" look="multiply" />
        </div>
      </section>

      {/* WORD RIBBON */}
      <div className="ribbon" aria-hidden>
        <div className="ribbon-track">
          {[...RIBBON, ...RIBBON].map(([w, f], i) => (
            <span key={i} className={`${f} mx-8 text-4xl`} lang="hi">{w} ·</span>
          ))}
        </div>
      </div>

      {/* GALLERY WALL */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-14 text-center">
          <h2 lang="hi" className="h1-hindi text-5xl md:text-6xl">दीवार</h2>
          <p className="sub">the wall — a small salon of prints</p>
        </header>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {WALL.map((p) => (
            <figure key={p.n} className={`print-hang ${p.cls}`}>
              <span className="nail" aria-hidden />
              <Art n={p.n} look="print" className="w-full" />
              <figcaption className="museum-label">
                <span className="stencil">Plate {p.plate}</span>
                <span className="hand block text-lg">{p.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FRIEZE */}
      <div className="frieze" aria-hidden style={{ backgroundImage: "url(/assets/art/41-baraat-procession.jpg)" }} />

      {/* TWO BOOKS */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="khoob text-center text-5xl md:text-6xl">two books.</h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {(["english", "hindi"] as const).map((k, i) => (
            <article key={k} className={`paper-card book-card p-6 ${i ? "rotate-[1.5deg]" : "rotate-[-1.5deg]"}`}>
              <span className="tape tape-tl" aria-hidden />
              <img src={covers[k].url} alt={`Cover of ${covers[k].title}`} width={600} height={900} loading="lazy" decoding="async" className="mx-auto w-48 shadow-paper" />
              <div className="overprint mt-6">
                <span className="op-hi" lang="hi">आम ज़िंदगी!</span>
                <span className="op-en">Aam Zindagi!</span>
              </div>
              <p className="stamp mt-3">{k === "hindi" ? "भाषा: हिन्दी" : "LANGUAGE: ENGLISH"}</p>
              <p className="mt-4 leading-relaxed">{BLURBS[k]}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/library" className="cut-btn" lang="hi">पढ़ें</Link>
                <Link to="/buy" className="cut-btn cut-btn-alt" lang="hi">किताब ले लो!</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
