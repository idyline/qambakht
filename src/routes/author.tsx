import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Mail, PenLine } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { covers, pdfs, portraitUrl, CONTACT_EMAIL } from "@/data/site";
import artMandala from "@/assets/classical-art-2.jpg.asset.json";
import artButi from "@/assets/classical-art-6.jpg.asset.json";

export const Route = createFileRoute("/author")({
  head: () => ({
    meta: [
      { title: "The Author — Adarsh Anand · Qambakht" },
      { name: "description", content: "Meet Adarsh Anand, the author of Aam Zindagi! — storyteller in the spirit of Premchand and Parsai. Author note, recommendation and how to write to him." },
      { property: "og:title", content: "The Author — Adarsh Anand · Qambakht" },
      { property: "og:description", content: "Author note, the recommended Hindi edition of Aam Zindagi!, and how to write to Adarsh Anand." },
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
        {/* faint mandala watermark behind the portrait */}
        <img
          src={artMandala.url}
          alt=""
          aria-hidden="true"
          className="art-watermark absolute left-[12%] top-16 hidden h-[460px] w-[460px] rounded-full object-cover lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.740 0.118 80 / 8%), transparent 72%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-20 sm:px-6 md:grid-cols-2 md:pt-24">
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
            <h1 className="font-display mt-3 text-4xl font-medium text-cream sm:text-5xl">
              Adarsh Anand
            </h1>
            <p className="font-hindi mt-4 text-lg text-gold-bright">
              कहानियाँ, जो ठहर जाएँ
            </p>

            <div className="mt-8 space-y-4 text-left leading-relaxed text-tan-muted">
              <p>
                <span className="font-display text-xl text-gold-bright">A note from the author —</span>{" "}
                I write the way rain writes on a tin roof: one small sound at a
                time, until a whole evening has quietly changed.{" "}
                <em className="text-tan">Aam Zindagi!</em> began as overheard
                arguments at a tea stall — a copper pot missing, a father's
                silence, a street that refused to lose — and grew into a book
                about the heroism of ordinary Tuesdays.
              </p>
              <p>
                I don't chase clever sentences; I chase the ones that taste like
                the truth of a chai-shared afternoon. If a line here makes you
                pause mid-sip, or smile at someone who isn't in the room, the
                manuscript has done its work.
              </p>
              <p>
                Read slowly. Nothing here is in a hurry.
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

          {/* Recommended bookcard — the Hindi edition */}
          <div className="relative mx-auto w-full max-w-md">
            <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
              Recommended
            </span>
            <div className="book-tilt surface relative overflow-hidden rounded-3xl p-8 pt-12 text-center">
              {/* faint hand-block texture across the card */}
              <img
                src={artButi.url}
                alt=""
                aria-hidden="true"
                className="art-texture absolute inset-0 h-full w-full object-cover"
              />
              <img
                src={covers.hindi.url}
                alt={`Cover of ${covers.hindi.title}`}
                loading="lazy"
                className="book-cover relative mx-auto w-44 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              />
              <h2 className="font-display relative mt-6 text-3xl font-medium text-tan">
                आम ज़िंदगी!
              </h2>
              <p className="relative mt-4 text-sm leading-relaxed text-tan-muted">
                The original voice, still warm from the first telling. Read it
                slowly, in Hindi — a story that keeps the kettle on for you.
              </p>
              <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/read/$lang" params={{ lang: "hindi" }} className="btn-gold px-5 py-2.5 text-sm">
                  Read in Hindi
                </Link>
                {/* Opening / downloading the manuscript may open anywhere the reader chooses */}
                <a
                  href={pdfs.hindi.url}
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
