import { createFileRoute } from "@tanstack/react-router";

import { BookTile } from "@/components/BookTile";
import { pageHead } from "@/data/site";

export const Route = createFileRoute("/library")({
  head: () => pageHead("Read Aam Zindagi! by Adarsh Anand online in English or Hindi."),
  component: Library,
});

function Library() {
  return (
    <div className="relative min-h-[65vh] pt-32 md:pt-40">
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow">The reading room</p>
          <h1 lang="hi" className="title-hi mt-3 text-4xl sm:text-5xl">
            पुस्तकालय
          </h1>
          <p className="mt-3 text-ink/70">Choose a language, then settle in.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2">
          <BookTile lang="english" mode="library" />
          <BookTile lang="hindi" mode="library" />
        </div>
      </section>
    </div>
  );
}
