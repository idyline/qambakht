import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";

import { pdfs } from "@/data/site";

type Lang = "english" | "hindi";

function isLang(v: string): v is Lang {
  return v === "english" || v === "hindi";
}

export const Route = createFileRoute("/read/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) {
      throw redirect({ to: "/library" });
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Reading"} · Read — Qambakht` },
      { name: "description", content: `Read ${loaderData?.title ?? "Aam Zindagi!"} free in the browser.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ params }) => {
    const lang = isLang(params.lang) ? (params.lang as Lang) : "english";
    return { lang, ...pdfs[lang] };
  },
  component: Reader,
});

function Reader() {
  const { title, language, url } = Route.useLoaderData();

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border/60 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link to="/library" className="btn-outline px-3 py-1.5 text-xs sm:text-sm">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Library</span>
          </Link>
          <div className="leading-tight">
            <p className="font-display text-sm text-tan sm:text-base">{title}</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold-bright/90">
              {language}
            </p>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="btn-gold px-4 py-2 text-xs sm:text-sm"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </a>
      </header>
      <main className="min-h-0 flex-1">
        <iframe
          src={url}
          title={`${title} — ${language}`}
          className="h-full w-full border-0 bg-white"
        />
      </main>
    </div>
  );
}
