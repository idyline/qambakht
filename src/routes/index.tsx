import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, UserRound } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroBooks } from "@/components/HeroBooks";
import { ArtDivider } from "@/components/ArtDivider";
import { Typewriter } from "@/components/Typewriter";
import { covers, arts, HERO_LINES } from "@/data/site";

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
    <div className="relative min-h-screen pt-16">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
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
            <p className="font-hindi mt-6 min-h-[3.6rem] text-lg text-tan sm:min-h-[3.2rem] sm:text-xl">
              <Typewriter phrases={HERO_LINES} typingMs={55} holdingMs={2200} />
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

          <HeroBooks
            hindiUrl={covers.hindi.url}
            englishUrl={covers.english.url}
            hindiTitle={covers.hindi.title}
            englishTitle={covers.english.title}
            crestUrl={arts.warli}
          />
        </div>
      </section>

      {/* elephant-procession frieze dividing the hero from curated reading */}
      <div className="px-4 sm:px-6">
        <ArtDivider className="max-w-3xl" />
      </div>

      {/* ===== Curated Reading ===== */}
      <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {/* pichwai elephant & florals, a quiet accent in the open corner */}
        <img
          src={arts.pichwai}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="art-spread absolute -left-8 bottom-10 hidden h-[420px] w-[290px] lg:block"
        />
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
            crest={arts.warli}
          />
          <BookCard
            language="हिन्दी"
            title={covers.hindi.title}
            cover={covers.hindi.url}
            readTo="/read/hindi"
            readLabel="पढ़ें अभी"
            blurb="आम ज़िंदगी as it was first breathed — unhurried, in Hindi, where every line settles like steam off a cup of chai."
            crest={arts.warli}
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
  crest,
}: {
  language: string;
  title: string;
  cover: string;
  readTo: string;
  readLabel: string;
  blurb: string;
  crest: string;
}) {
  return (
    <div className="book-tilt surface relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl p-8 pt-10 text-center sm:flex-row sm:text-left">
      {/* elephant frieze along the top edge */}
      <div
        aria-hidden="true"
        className="art-cornice absolute inset-x-8 top-4"
        style={{ backgroundImage: `url(${arts.frieze})` }}
      />
      {/* faint hand-block buti pattern behind the description */}
      <img
        src={arts.buti}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="art-texture absolute inset-0 h-full w-full object-cover"
      />
      {/* warli crest ribbons framing the card */}
      <div
        aria-hidden="true"
        className="art-edge absolute bottom-5 left-2.5 top-6 hidden sm:block"
        style={{ backgroundImage: `url(${crest})` }}
      />
      <div
        aria-hidden="true"
        className="art-edge absolute bottom-5 right-2.5 top-6 hidden sm:block"
        style={{ backgroundImage: `url(${crest})` }}
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
