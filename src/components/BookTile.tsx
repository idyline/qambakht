import { Link } from "@tanstack/react-router";

import { Tilt } from "@/components/Tilt";
import { NavLink } from "@/components/Transition";
import { BLURBS, covers, pdfs } from "@/data/site";

/**
 * One book, one script: "Aam Zindagi!" in the Chonburi display face,
 * "आम ज़िंदगी!" in Rozha One — never both stacked on the same card.
 */
export function BookTile({ lang, mode }: { lang: "english" | "hindi"; mode: "home" | "library" }) {
  const c = covers[lang];
  const hi = lang === "hindi";
  return (
    <Tilt className="paper-card relative h-full p-6 text-center md:p-8">
      <span className="book3d book3d-tile mx-auto w-36 md:w-40">
        <img
          src={c.url}
          alt={`Cover of ${c.title}`}
          width={640}
          height={989}
          loading="lazy"
          decoding="async"
        />
      </span>
      <p className={`title-${hi ? "hi" : "en"} mt-5 text-3xl md:text-4xl`} lang={hi ? "hi" : "en"}>
        {c.title}
      </p>
      <p className="stamp mt-3">{hi ? "भाषा: हिन्दी" : "LANGUAGE: ENGLISH"}</p>
      <p className="mt-4 leading-relaxed" lang={hi ? "hi" : "en"}>
        {BLURBS[lang]}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {mode === "home" ? (
          <>
            <NavLink to="/library" className="cut-btn glow-btn" lang="hi">
              पढ़ें
            </NavLink>
            <NavLink to="/buy" className="cut-btn cut-btn-alt glow-btn" lang="hi">
              किताब ले लो!
            </NavLink>
          </>
        ) : (
          <>
            <Link to="/read/$lang" params={{ lang }} className="cut-btn glow-btn">
              Read Now
            </Link>
            <a
              href={pdfs[lang].url}
              download={`aam-zindagi-${lang}.pdf`}
              className="cut-btn cut-btn-alt glow-btn"
            >
              Download PDF
            </a>
          </>
        )}
      </div>
    </Tilt>
  );
}
