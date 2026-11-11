import { Link } from "@tanstack/react-router";

import { covers, pdfs } from "@/data/site";

export function BookTile({ lang, mode }: { lang: "english" | "hindi"; mode: "home" | "library" }) {
  const book = covers[lang];
  const hindi = lang === "hindi";

  return (
    <article className="book-card group">
      <img
        src={book.url}
        alt={`${book.title} book cover`}
        width={600}
        height={900}
        loading="lazy"
        decoding="async"
        className="book-card-cover"
      />
      <div className="book-card-info">
        <p className="eyebrow">{hindi ? "हिन्दी" : "English"}</p>
        <h3
          className={`title-${hindi ? "hi" : "en"} mt-2 text-2xl sm:text-3xl`}
          lang={hindi ? "hi" : "en"}
        >
          {book.title}
        </h3>
        {mode === "home" ? (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link to="/library" className="editorial-link">
              Read online <span aria-hidden>↗</span>
            </Link>
            <Link to="/buy" className="editorial-link editorial-link-muted">
              Buy the book
            </Link>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link to="/read/$lang" params={{ lang }} className="cut-btn" lang={hindi ? "hi" : "en"}>
              {hindi ? "पढ़ें" : "Read"}
            </Link>
            <a
              href={pdfs[lang].url}
              download={`aam-zindagi-${lang}.pdf`}
              className="editorial-link editorial-link-muted"
            >
              Download PDF <span aria-hidden>↓</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
