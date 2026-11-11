import { createFileRoute } from "@tanstack/react-router";

import { AUTHOR_EMAIL, INTRO_LINE, pageHead, portraitUrl } from "@/data/site";

export const Route = createFileRoute("/author")({
  head: () => pageHead("Adarsh Anand, author of Aam Zindagi!"),
  component: Author,
});

function Author() {
  return (
    <div className="relative pt-28 md:pt-36">
      <section className="author-card mx-auto grid max-w-3xl items-center gap-8 px-6 pb-20 md:grid-cols-[200px_1fr] md:gap-12">
        <img
          src={portraitUrl}
          alt="Adarsh Anand"
          width={600}
          height={600}
          className="author-portrait mx-auto w-40 md:w-full"
        />
        <div>
          <p className="eyebrow">Author</p>
          <h1 className="title-en mt-2 text-4xl sm:text-5xl">Adarsh Anand</h1>
          <p lang="hi" className="title-hi mt-3 text-xl">
            {INTRO_LINE}
          </p>
          <a href={`mailto:${AUTHOR_EMAIL}`} className="editorial-link mt-5 inline-flex">
            Get in touch <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
