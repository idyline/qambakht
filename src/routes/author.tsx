import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { NavLink } from "@/components/Transition";
import {
  AUTHOR_EMAIL,
  BLURBS,
  CONTACT_EMAIL,
  INTRO_LINE,
  covers,
  pageHead,
  portraitUrl,
} from "@/data/site";

export const Route = createFileRoute("/author")({
  head: () =>
    pageHead(
      "Meet Adarsh Anand, the author of Aam Zindagi! — a note from the author and the recommended Hindi edition.",
    ),
  component: Author,
});

function Author() {
  return (
    <div className="relative pt-28 md:pt-32">
      <header className="page-head enter">
        <p className="kicker">The Artist's Studio</p>
        <h1 lang="hi" className="h1-hindi text-5xl md:text-6xl">
          कम्बख़्त
        </h1>
      </header>

      <section className="mx-auto mt-12 grid max-w-6xl items-start gap-8 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="paper-card author-card">
            <img
              src={portraitUrl}
              alt="Adarsh Anand"
              width={600}
              height={615}
              className="author-portrait"
            />
            <p className="kicker mt-6">The Author</p>
            <h2 className="font-cormorant text-4xl italic md:text-5xl">Adarsh Anand</h2>
            <p lang="hi" className="font-tiro mt-2 text-xl">
              {INTRO_LINE}
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <article className="paper-card letter relative p-8 md:p-10">
            <p className="font-cormorant text-2xl italic">A note from the author —</p>
            <div className="mt-4 space-y-4 text-lg leading-relaxed">
              <p>
                I write the way rain writes on a tin roof: one small sound at a time, until a whole
                evening has quietly changed. <em>Aam Zindagi!</em> began as overheard arguments at a
                tea stall — a copper pot missing, a father's silence, a street that refused to lose
                — and grew into a book about the heroism of ordinary Tuesdays.
              </p>
              <p>
                I don't chase clever sentences; I chase the ones that taste like the truth of a
                chai-shared afternoon. If a line here makes you pause mid-sip, or smile at someone
                who isn't in the room, the manuscript has done its work.
              </p>
              <p>Read slowly. Nothing here is in a hurry.</p>
            </div>
            <p className="signature mt-6">— Adarsh</p>
            <p className="mt-4 text-sm">
              Write to me:{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>{" "}
              ·{" "}
              <a className="underline" href={`mailto:${AUTHOR_EMAIL}`}>
                {AUTHOR_EMAIL}
              </a>
            </p>
          </article>
        </Reveal>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-6">
        <Reveal>
          <article className="paper-card relative grid items-center gap-8 p-8 sm:grid-cols-[160px_1fr] md:p-10">
            <span className="book3d book3d-tile mx-auto w-36">
              <img
                src={covers.hindi.url}
                alt="Cover of आम ज़िंदगी!"
                width={640}
                height={989}
                loading="lazy"
              />
            </span>
            <div>
              <span className="iconic-badge">RECOMMENDED</span>
              <p className="title-hi mt-2 text-3xl" lang="hi">
                आम ज़िंदगी!
              </p>
              <p className="stamp mt-2">भाषा: हिन्दी</p>
              <p className="mt-3 max-w-2xl leading-relaxed">{BLURBS.hindi}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <NavLink to="/library" className="cut-btn glow-btn" lang="hi">
                  पुस्तकालय चलें
                </NavLink>
                <NavLink to="/feedback" className="cut-btn cut-btn-alt glow-btn" lang="hi">
                  और सुनाओ
                </NavLink>
              </div>
            </div>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
