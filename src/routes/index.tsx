import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Compass, Languages, Sparkles, UserRound } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { covers, classicalArts } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qambakht — Stories that stay with you" },
      { name: "description", content: "A warm little corner of the internet for Aam Zindagi! — free to read in English and Hindi, with the heart behind Qambakht." },
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

      {/* ===== Hero (from the Home tab) ===== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.745 0.115 75 / 9%), transparent 72%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-20 sm:px-6 md:grid-cols-2 md:pb-28 md:pt-28">
          <div>
            <p className="eyebrow">Qambakht · Your next chapter</p>
            <h1 className="font-display mt-4 text-5xl font-medium leading-[1.05] text-tan sm:text-6xl">
              Stories that <em className="text-gold-bright">stay</em> with you
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-tan-muted">
              Welcome to Qambakht — a quality-rich corner of the internet where
              stories hold the essence of Premchand and the witty wisdom of
              Harishankar Parsai. Read free, in English and Hindi, whenever the
              mood strikes.
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
      </section>

      {/* ===== Quote band (brought over from the author tab) ===== */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <p className="font-hindi text-xl text-tan sm:text-2xl">
            शब्द वो हैं जो ठहर जाएँ — काग़ज़ पर नहीं, साँसों में।
          </p>
          <p className="font-display mt-4 text-lg italic text-tan-muted sm:text-xl">
            "Literature is not boring, it's just under-marketed."
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold-bright/90">
            Adarsh Anand
          </p>
        </div>
      </section>

      {/* ===== The Mission (brought over from the author tab) ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Mission</p>
          <h2 className="font-display mt-3 text-3xl font-medium text-tan sm:text-4xl">
            The heart behind Qambakht
          </h2>
          <p className="mt-5 leading-relaxed text-tan-muted">
            Qambakht began with one stubborn belief — a good story should never
            be locked behind a paywall, a bookshop's opening hours, or a language
            you don't read. Here, the story is the product; everything else is
            hospitality.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Accessible Knowledge",
              body: "Both editions of Aam Zindagi! stay free to read and download — knowledge offered like water, not wares behind glass.",
            },
            {
              icon: Sparkles,
              title: "Beautiful Experience",
              body: "Warm light, patient typography, room to breathe. Reading should feel like a favourite armchair, not a transaction.",
            },
            {
              icon: Languages,
              title: "Cultural Connection",
              body: "One story, two languages, and the Indian classical arts woven through — so reading keeps you rooted and curious at once.",
            },
          ].map((card) => (
            <div key={card.title} className="surface rounded-2xl p-7 transition-transform hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-primary/12 text-gold">
                <card.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-5 text-xl font-medium text-tan">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-tan-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Featured Books ===== */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="eyebrow">Featured Books</p>
            <h2 className="font-display mt-3 text-3xl font-medium text-tan sm:text-4xl">
              Aam Zindagi!
            </h2>
            <p className="mt-4 text-tan-muted">One story, both languages. Free, always.</p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <BookCard
              language="English"
              title={covers.english.title}
              cover={covers.english.url}
              readTo="/read/english"
              readLabel="Read Now"
            />
            <BookCard
              language="हिन्दी"
              title={covers.hindi.title}
              cover={covers.hindi.url}
              readTo="/read/hindi"
              readLabel="पढ़ें अभी"
            />
          </div>
        </div>
      </section>

      {/* ===== Indian classical arts gallery ===== */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">From the sketchbook</p>
          <h2 className="font-display mt-3 text-3xl font-medium text-tan sm:text-4xl">
            The Indian classical arts we love
          </h2>
          <p className="mt-5 leading-relaxed text-tan-muted">
            Warli lines, pichwai elephants, mandalas and hand-block prints — the
            visual culture this little press keeps returning to for warmth.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {classicalArts.map((art) => (
            <figure key={art.url} className="surface group overflow-hidden rounded-2xl">
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={art.url}
                  alt={art.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-5 py-4">
                <p className="font-display text-lg text-tan">{art.caption}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-tan-muted/80">{art.note}</p>
              </figcaption>
            </figure>
          ))}
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
}: {
  language: string;
  title: string;
  cover: string;
  readTo: string;
  readLabel: string;
}) {
  return (
    <div className="surface flex flex-col items-center gap-6 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
      <img
        src={cover}
        alt={`Cover of ${title} (${language})`}
        loading="lazy"
        className="w-40 shrink-0 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
      />
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold-bright/90">{language}</p>
        <h3 className="font-display mt-2 text-2xl font-medium text-tan">{title}</h3>
        <p className="mt-2 text-sm text-tan-muted">
          {language === "English" ? "Translated edition" : "Original edition"} · Free to read & download
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link to={readTo} className="btn-gold px-5 py-2.5 text-sm">
            {readLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
