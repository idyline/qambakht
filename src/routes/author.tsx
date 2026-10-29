import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mail, PenLine } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Typewriter } from "@/components/Typewriter";
import { covers, pdfs, portraitUrl, CONTACT_EMAIL } from "@/data/site";

export const Route = createFileRoute("/author")({
  head: () => ({
    meta: [
      { title: "The Author — Adarsh Anand · Qambakht" },
      { name: "description", content: "Meet Adarsh Anand, the author of Aam Zindagi! — storyteller in the spirit of Premchand and Parsai. Author note, new release and how to write to him." },
      { property: "og:title", content: "The Author — Adarsh Anand · Qambakht" },
      { property: "og:description", content: "Author note, new release Aam Zindagi!, and how to write to Adarsh Anand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Author,
});

function Author() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.745 0.115 75 / 10%), transparent 72%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-20 sm:px-6 md:grid-cols-2 md:pt-24">
          {/* Portrait + author note */}
          <div className="text-center md:text-left">
            <div className="relative mx-auto w-48 md:mx-0">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-gold/35"
                style={{ borderRadius: "48% 52% 46% 54% / 54% 46% 54% 46%" }}
              />
              <img
                src={portraitUrl}
                alt="Portrait of Adarsh Anand, author of Aam Zindagi!"
                className="relative w-48 rounded-full object-cover"
                style={{ aspectRatio: "1 / 1" }}
              />
            </div>

            <p className="eyebrow mt-8">The Author</p>
            <h1 className="font-display mt-3 text-4xl font-medium text-tan sm:text-5xl">
              Adarsh Anand
            </h1>
            <p className="font-hindi mt-4 text-lg text-gold-bright">
              <Typewriter
                phrases={[
                  "कहानियाँ, जो ठहर जाएँ",
                  "Aam Zindagi!",
                  "आम ज़िंदगी!",
                ]}
              />
            </p>

            <div className="mt-8 space-y-4 text-left leading-relaxed text-tan-muted">
              <p>
                <span className="font-display text-xl text-gold-bright">A note from the author —</span>{" "}
                I grew up on stories where nothing much happens, and everything
                changes: a street argument, a copper pot, a father's silence.
                Premchand taught me that ordinary lives are literature; Parsai
                taught me to laugh while saying so.
              </p>
              <p>
                <em className="text-tan">Aam Zindagi!</em> is my attempt to write
                that ordinary life honestly — the small dramas of "aam" people,
                the everyday heroism nobody awards. I don't write to impress; I
                write the way people talk over a cup of chai, and trust you to
                find the poetry.
              </p>
              <p>
                If a line makes you pause, or smile at someone who isn't there —
                my job is done. Tell me about it; I read every note.
              </p>
              <p className="font-display text-2xl italic text-gold-bright/90">— Adarsh</p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link to="/library" className="btn-gold text-sm">
                <PenLine className="h-4 w-4" />
                Explore the Library
              </Link>
              <Link to="/feedback" className="btn-outline text-sm">
                <Mail className="h-4 w-4" />
                Send Feedback
              </Link>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-tan-muted md:justify-start">
              <Mail className="h-4 w-4 text-gold" />
              {CONTACT_EMAIL}
            </p>
          </div>

          {/* New release bookcard */}
          <div className="relative mx-auto w-full max-w-md">
            <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
              New Release
            </span>
            <div className="surface rounded-3xl p-8 pt-12 text-center">
              <img
                src={covers.english.url}
                alt={`Cover of ${covers.english.title}`}
                className="mx-auto w-44 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              />
              <h2 className="font-display mt-6 text-3xl font-medium text-tan">
                Aam Zindagi!
              </h2>
              <p className="mt-1 text-sm text-gold-bright">English & हिन्दी · Free forever</p>
              <p className="mt-4 text-sm leading-relaxed text-tan-muted">
                One story of ordinary people and everyday heroism, told in two
                languages. Read online or take the PDF with you.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/read/$lang" params={{ lang: "english" }} className="btn-gold px-5 py-2.5 text-sm">
                  Read in English
                </Link>
                <Link to="/read/$lang" params={{ lang: "hindi" }} className="btn-outline px-5 py-2.5 text-sm">
                  हिन्दी में पढ़ें
                </Link>
                <a
                  href={pdfs.english.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-outline px-5 py-2.5 text-sm"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
