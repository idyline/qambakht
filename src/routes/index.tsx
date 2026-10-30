import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, UserRound } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { covers } from "@/data/site";
import artMandala from "@/assets/classical-art-2.jpg.asset.json";
import artWarli from "@/assets/classical-art-5.jpg.asset.json";
import artElephant from "@/assets/classical-art-1.jpg.asset.json";
import artButi from "@/assets/classical-art-6.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qambakht — Stories that stay with you" },
      { name: "description", content: "A warm little corner of the internet for Aam Zindagi! — free to read in English and Hindi, curated for slow evenings." },
      { property: "og:title", content: "Qambakht — Stories that stay with you" },
      { property: "og:description", content: "Aam Zindagi! in English and Hindi, free to read. Stories that hold the essence of Premchand and the wit of Parsai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* faint mandala watermark from the classical arts */}
        <img
          src={artMandala.url}
          alt=""
          aria-hidden="true"
          className="art-watermark absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[680px] w-[860px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.740 0.118 80 / 8%), transparent 72%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-20 sm:px-6 md:grid-cols-2 md:pb-24 md:pt-28">
          <div>
            <p className="eyebrow">Qambakht · Your next chapter</p>
            <h1 className="font-display mt-4 text-5xl font-medium leading-[1.05] text-cream sm:text-6xl">
              Stories that <em className="text-gold-bright">stay</em> with you
            </h1>
            <p className="font-hindi mt-6 text-lg text-tan sm:text-xl">
              शब्द वो हैं जो ठहर जाएँ — काग़ज़ पर नहीं, साँसों में।
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold-bright/90">
              Qambakht
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-tan-muted">
              Welcome to Qambakht — a quiet corner of the internet where
              ordinary life reads like literature. Free, in English and Hindi,
              whenever the mood strikes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/library" className="btn-gold text-sm">
                <Compass className="h-4 w-4" />
                Explore the Library
              </Link>
              <Link to="/author" className="btn-outline text-sm">
                <UserRound className="h-4 w-4" />
                Meet the Author
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <img
              src={covers.hindi.url}
              alt={`Cover of the Hindi edition, ${covers.hindi.title}`}
              className="hero-covers w-52 -rotate-6 rounded-xl sm:w-60"
            />
            <img
              src={covers.english.url}
              alt={`Cover of the English edition, ${covers.english.title}`}
              className="hero-covers -ml-14 w-52 rotate-3 rounded-xl sm:w-60"
            />
          </div>
        </div>

        {/* warli frieze as a decorative divider */}
        <div
          aria-hidden="true"
          className="art-frieze relative mx-auto max-w-6xl"
          style={{ backgroundImage: `url(${artWarli.url})` }}
        />
      </section>

      {/* ===== Curated Reading ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-medium text-cream sm:text-4xl">
            Curated Reading
          </h2>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <BookCard
            language="English"
            title={covers.english.title}
            cover={covers.english.url}
            readTo="/read/english"
            readLabel="Read Now"
            blurb="An evening in English — the same small storms and quieter braveries, in words that feel like they were always yours. Pull up a chair."
            cornice={artElephant.url}
            texture={artButi.url}
          />
          <BookCard
            language="हिन्दी"
            title={covers.hindi.title}
            cover={covers.hindi.url}
            readTo="/read/hindi"
            readLabel="पढ़ें अभी"
            blurb="आम ज़िंदगी as it was first breathed — unhurried, in Hindi, where every line settles like steam off a cup of chai."
            cornice={artElephant.url}
            texture={artButi.url}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BookCard({
  language,
  title,
  cover,
  readTo,
  readLabel,
  blurb,
  cornice,
  texture,
}: {
  language: string;
  title: string;
  cover: string;
  readTo: string;
  readLabel: string;
  blurb: string;
  cornice: string;
  texture: string;
}) {
  return (
    <div className="book-tilt surface relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl p-8 pt-10 text-center sm:flex-row sm:text-left">
      {/* ornate frieze along the top edge */}
      <div
        aria-hidden="true"
        className="art-cornice absolute inset-x-8 top-4"
        style={{ backgroundImage: `url(${cornice})` }}
      />
      {/* faint hand-block texture across the card */}
      <img
        src={texture}
        alt=""
        aria-hidden="true"
        className="art-texture absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={cover}
        alt={`Cover of ${title} (${language})`}
        loading="lazy"
        className="book-cover relative w-40 shrink-0 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
      />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-bright/90">{language}</p>
        <h3 className="font-display mt-2 text-2xl font-medium text-tan">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-tan-muted">{blurb}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link to={readTo} className="btn-gold px-5 py-2.5 text-sm">
            {readLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
