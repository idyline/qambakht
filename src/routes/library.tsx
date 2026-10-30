import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { covers, pdfs } from "@/data/site";
import artWarli from "@/assets/classical-art-5.jpg.asset.json";
import artElephant from "@/assets/classical-art-1.jpg.asset.json";
import artButi from "@/assets/classical-art-6.jpg.asset.json";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Qambakht" },
      { name: "description", content: "The Qambakht library: Aam Zindagi! in English and Hindi, free to read online or download as PDF." },
      { property: "og:title", content: "Library — Qambakht" },
      { property: "og:description", content: "Aam Zindagi! in English and Hindi, free to read online or download." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Library,
});

function Library() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.740 0.118 80 / 8%), transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-20 text-center sm:px-6">
          <h1 className="font-display text-4xl font-medium text-cream sm:text-5xl">
            The Library
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-tan-muted">
            Two languages. One story that lingers.
          </p>
          <div
            aria-hidden="true"
            className="art-frieze mx-auto mt-8 max-w-md"
            style={{ backgroundImage: `url(${artWarli.url})` }}
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="space-y-8">
          <LibraryRow
            language="English"
            title={covers.english.title}
            blurb="The translated edition — same storms, new words."
            cover={covers.english.url}
            pdfUrl={pdfs.english.url}
            lang="english"
          />
          <LibraryRow
            language="हिन्दी"
            title={covers.hindi.title}
            blurb="The original edition, exactly as it was written."
            cover={covers.hindi.url}
            pdfUrl={pdfs.hindi.url}
            lang="hindi"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function LibraryRow({
  language,
  title,
  blurb,
  cover,
  pdfUrl,
  lang,
}: {
  language: string;
  title: string;
  blurb: string;
  cover: string;
  pdfUrl: string;
  lang: "english" | "hindi";
}) {
  return (
    <div className="book-tilt surface relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl p-8 sm:flex-row sm:p-10">
      {/* ornate frieze along the top edge */}
      <div
        aria-hidden="true"
        className="art-cornice absolute inset-x-10 top-4"
        style={{ backgroundImage: `url(${artElephant.url})` }}
      />
      {/* faint hand-block texture across the card */}
      <img
        src={artButi.url}
        alt=""
        aria-hidden="true"
        className="art-texture absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={cover}
        alt={`Cover of ${title} (${language})`}
        loading="lazy"
        className="book-cover relative w-44 shrink-0 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
      />
      <div className="relative text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-bright/90">{language}</p>
        <h2 className="font-display mt-2 text-3xl font-medium text-tan">{title}</h2>
        <p className="mt-3 text-sm text-tan-muted">{blurb}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link to="/read/$lang" params={{ lang }} className="btn-gold px-5 py-2.5 text-sm">
            Read Now
          </Link>
          {/* Opening / downloading the manuscript is allowed to open anywhere the reader chooses */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn-outline px-5 py-2.5 text-sm"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
