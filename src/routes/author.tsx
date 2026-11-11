import { createFileRoute } from "@tanstack/react-router";

import { pageHead, portraitUrl } from "@/data/site";

export const Route = createFileRoute("/author")({
  head: () => pageHead("Adarsh Anand, author of Aam Zindagi!"),
  component: Author,
});

function Author() {
  return (
    <div className="relative pt-28 md:pt-36">
      <section className="author-card mx-auto grid max-w-3xl items-center gap-8 px-6 pb-20 md:grid-cols-[260px_1fr] md:gap-12">
        <figure className="author-artwork-frame mx-auto w-full">
          <img
            src={portraitUrl}
            alt="A hand-painted folk mask on warm, textured paper."
            width={455}
            height={568}
            className="author-artwork"
          />
        </figure>
        <div>
          <p className="eyebrow">Author</p>
          <h1 className="title-en mt-2 text-4xl sm:text-5xl">Adarsh Anand</h1>
          <p className="author-quote mt-4 text-lg">
            life is like a novel, a novel is like a women. A women is like a wall, a wall is like a
            novel.
          </p>
          <a
            href="https://www.instagram.com/aapka.adarsh/"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link mt-5 inline-flex"
          >
            Get in touch <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
