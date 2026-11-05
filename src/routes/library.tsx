import { createFileRoute } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { BookTile } from "@/components/BookTile";
import { covers, pageHead } from "@/data/site";

export const Route = createFileRoute("/library")({
  head: () =>
    pageHead(
      "The reading room of Qambakht. — Aam Zindagi! in English and Hindi, read online or download the PDF.",
    ),
  component: Library,
});

function Library() {
  return (
    <div className="relative pt-32 md:pt-36">
      <header className="mx-auto max-w-5xl px-6 text-center">
        <h1 lang="hi" className="h1-hindi text-6xl md:text-7xl">
          पुस्तकालय
        </h1>
        <p className="sub">The Reading Room — pull a chair, the lamp is on.</p>
      </header>

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-16 px-6 lg:grid-cols-[110px_1fr_110px]">
        <Art n={35} look="multiply" className="sticky top-32 hidden w-full self-start lg:block" />
        <div className="space-y-20">
          <Stall lang="english" />
          <div
            className="frieze-static"
            aria-hidden
            style={{ backgroundImage: "url(/assets/art/41-baraat-procession.jpg)" }}
          />
          <Stall lang="hindi" />
        </div>
        <Art n={39} look="multiply" className="hidden w-full self-end lg:block" />
      </div>
    </div>
  );
}

function Stall({ lang }: { lang: "english" | "hindi" }) {
  const en = lang === "english";
  return (
    <section className="relative">
      {en ? (
        <Art n={28} className="stall-frame" cover />
      ) : (
        <>
          <div className="warli-strip left-0" style={{ backgroundImage: "url(/assets/art/34-warli-sheet.jpg)" }} aria-hidden />
          <div className="warli-strip right-0" style={{ backgroundImage: "url(/assets/art/34-warli-sheet.jpg)" }} aria-hidden />
          <Art n={42} className="pointer-events-none absolute -bottom-10 right-0 z-[3] hidden w-28 md:block" />
        </>
      )}
      <div className={`relative z-[2] py-6 ${en ? "px-[8%] md:px-[12%]" : "md:px-12"}`}>
        <BookTile lang={lang} mode="library" />
        <p className="sr-only">{covers[lang].title}</p>
      </div>
    </section>
  );
}
