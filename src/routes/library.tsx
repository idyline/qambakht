import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, BookOpenText } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { covers, pdfs } from "@/data/site";

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
          className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[760px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.745 0.115 75 / 9%), transparent 72%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6">
          <p className="eyebrow">The Library</p>
          <h1 className="font-display mt-3 text-4xl font-medium text-tan sm:text-5xl">
            Every story, both languages
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-tan-muted">
            Read right here in the browser, or carry the manuscript with you as
            a PDF. Either way — it's free, today and always.
          </p>
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
          />
          <LibraryRow
            language="हिन्दी"
            title={covers.hindi.title}
            blurb="The original edition, exactly as it was written."
            cover={covers.hindi.url}
            pdfUrl={pdfs.hindi.url}
          />
        </div>

        <p className="mt-12 text-center text-sm text-tan-muted/80">
          <BookOpenText className="mr-2 inline h-4 w-4 align-[-3px] text-gold" />
          Prefer paper? Screenshot a page, print the PDF — the story doesn't mind.
        </p>
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
}: {
  language: string;
  title: string;
  blurb: string;
  cover: string;
  pdfUrl: string;
}) {
  return (
    <div className="surface flex flex-col items-center gap-8 rounded-3xl p-8 sm:flex-row sm:p-10">
      <img
        src={cover}
        alt={`Cover of ${title} (${language})`}
        loading="lazy"
        className="w-44 shrink-0 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
      />
      <div className="text-center sm:text-left">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-bright/90">{language}</p>
        <h2 className="font-display mt-2 text-3xl font-medium text-tan">{title}</h2>
        <p className="mt-3 text-sm text-tan-muted">{blurb}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link
            to={language === "English" ? "/read/english" : "/read/hindi"}
            className="btn-gold px-5 py-2.5 text-sm"
          >
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

export function BackToLibraryLink() {
  return (
    <Link to="/library" className="btn-outline px-4 py-2 text-sm">
      <ArrowLeft className="h-4 w-4" />
      Back to Library
    </Link>
  );
}
