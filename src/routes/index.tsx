import { createFileRoute, Link } from "@tanstack/react-router";

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

        <figure className="home-art-frame mx-auto w-full max-w-[440px]">
          <div className="home-book-stack">
            <img
              src={covers.english.url}
              alt="English cover of Aam Zindagi!"
              width={600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="home-book home-book-english"
            />
            <img
              src={covers.hindi.url}
              alt="Hindi cover of Aam Zindagi!"
              width={600}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="home-book home-book-hindi"
            />
          </div>
          <figcaption className="sr-only">
            Aam Zindagi! is available in English and Hindi.
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="reading-options" aria-label="Read Aam Zindagi online">
          <Link to="/read/$lang" params={{ lang: "english" }} className="reading-option">
            <span>English</span>
            <span aria-hidden>↗</span>
          </Link>
          <Link to="/read/$lang" params={{ lang: "hindi" }} className="reading-option">
            <span>Hindi</span>
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
