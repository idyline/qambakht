import { createFileRoute } from "@tanstack/react-router";

import { BookTile } from "@/components/BookTile";
import { Reveal } from "@/components/Reveal";
import { pageHead } from "@/data/site";

export const Route = createFileRoute("/library")({
  head: () =>
    pageHead(
      "The reading room of Qambakht. — Aam Zindagi! in English and Hindi, read online or download the PDF.",
    ),
  component: Library,
});

function Library() {
  return (
    <div className="relative pt-28 md:pt-32">
      <header className="page-head enter">
        <p className="kicker">The Reading Room</p>
        <h1 lang="hi" className="h1-hindi text-5xl md:text-6xl">
          पुस्तकालय
        </h1>
        <p className="sub">Pull a chair, the lamp is on.</p>
      </header>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 px-6 md:grid-cols-2">
        <Reveal>
          <BookTile lang="english" mode="library" />
        </Reveal>
        <Reveal delay={90}>
          <BookTile lang="hindi" mode="library" />
        </Reveal>
      </div>
    </div>
  );
}
