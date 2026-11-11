import { createFileRoute, Link } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { covers, pageHead } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => pageHead("Aam Zindagi! — a novel by Adarsh Anand. Read in English or Hindi."),
  component: Home,
});

function Home() {
  return (
    <div className="relative pt-24 md:pt-28">
      <section className="mx-auto grid max-w-5xl items-center gap-8 px-6 pb-14 md:grid-cols-[1fr_0.7fr] md:gap-14 md:pb-16">
        <div className="relative z-[2] max-w-lg">
          <p className="eyebrow">A novel by Adarsh Anand</p>
          <h1 className="title-en mt-3 text-4xl leading-tight sm:text-5xl md:text-6xl">
            Aam Zindagi!
          </h1>
          <p className="mt-3 max-w-sm text-base text-ink/70">
            Everyday life, in English and Hindi.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link to="/library" className="cut-btn">
              Read the book
            </Link>
            <Link to="/buy" className="editorial-link">
              Buy <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] md:max-w-[360px]">
          <Art n={24} className="absolute inset-0 h-full w-full opacity-75" cover />
          <img
            src={covers.hindi.url}
            alt="आम ज़िंदगी! book cover"
            width={600}
            height={900}
            fetchPriority="high"
            className="book-hero relative z-[1] mx-auto w-[72%] rotate-[-2deg]"
          />
          <Art n={8} className="absolute -right-10 top-4 z-[2] w-16 sm:w-20" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="reading-options" aria-label="Read Aam Zindagi online">
          <Link to="/read/$lang" params={{ lang: "english" }} className="reading-option">
            <span>English</span>
            <span aria-hidden>↗</span>
          </Link>
          <Link to="/read/$lang" params={{ lang: "hindi" }} className="reading-option" lang="hi">
            <span>हिन्दी</span>
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
