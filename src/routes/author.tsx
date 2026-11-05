import { createFileRoute, Link } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { AUTHOR_EMAIL, BLURBS, CONTACT_EMAIL, INTRO_LINE, covers, pageHead, portraitUrl } from "@/data/site";

export const Route = createFileRoute("/author")({
  head: () =>
    pageHead(
      "Meet Adarsh Anand, the author of Aam Zindagi! — a note from the author and the recommended Hindi edition.",
    ),
  component: Author,
});

function Author() {
  return (
    <div className="relative pt-32 md:pt-36">
      {/* the wall-peek: someone from the lane watching the reader, quietly */}
      <Art n={21} className="peek pointer-events-none absolute right-0 top-44 z-[3] hidden w-24 md:block" />

      <header className="mx-auto max-w-5xl px-6 text-center">
        <h1 lang="hi" className="h1-hindi text-6xl md:text-7xl">
          कम्बख़्त
        </h1>
        <p className="sub">The Artist's Studio</p>
      </header>

      <section className="relative mx-auto mt-14 grid max-w-6xl items-start gap-14 px-6 md:grid-cols-[1fr_1.3fr]">
        <div className="relative mx-auto w-full max-w-sm text-center">
          <Art n={19} look="multiply" className="absolute inset-0 h-full w-full opacity-70" cover />
          <img
            src={portraitUrl}
            alt="Adarsh Anand"
            width={600}
            height={600}
            className="scallop relative mx-auto mt-10 w-60"
          />
          <p className="font-cormorant mt-6 text-sm uppercase tracking-[0.4em]">The Author</p>
          <h2 className="font-cormorant text-5xl italic">Adarsh Anand</h2>
          <p lang="hi" className="font-tiro mt-2 text-xl">
            {INTRO_LINE}
          </p>
        </div>

        <div className="relative">
          <article className="paper-card letter relative rotate-[1deg] p-8 md:p-12">
            <span className="tape tape-tl" aria-hidden />
            <span className="tape tape-br" aria-hidden />
            <p className="font-cormorant text-2xl italic">A note from the author —</p>
            <div className="mt-4 space-y-4 text-lg leading-relaxed">
              <p>
                I write the way rain writes on a tin roof: one small sound at a time, until a whole
                evening has quietly changed. <em>Aam Zindagi!</em> began as overheard arguments at a
                tea stall — a copper pot missing, a father's silence, a street that refused to lose —
                and grew into a book about the heroism of ordinary Tuesdays.
              </p>
              <p>
                I don't chase clever sentences; I chase the ones that taste like the truth of a
                chai-shared afternoon. If a line here makes you pause mid-sip, or smile at someone who
                isn't in the room, the manuscript has done its work.
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
        </div>
      </section>

      <div className="mx-auto my-20 flex max-w-3xl flex-col items-center px-6">
        <Art n={11} className="w-64" />
      </div>

      <section className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[1fr_1.4fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <Art n={22} className="w-full rotate-[-2deg]" />
        </div>
        <article className="paper-card relative p-8">
          <span className="iconic-badge">RECOMMENDED</span>
          <div className="mt-4 grid items-center gap-6 sm:grid-cols-[140px_1fr]">
            <img
              src={covers.hindi.url}
              alt="Cover of आम ज़िंदगी!"
              width={600}
              height={900}
              loading="lazy"
              className="mx-auto w-36"
            />
            <div>
              <p className="title-hi text-3xl" lang="hi">
                आम ज़िंदगी!
              </p>
              <p className="stamp mt-2">भाषा: हिन्दी</p>
              <p className="mt-3 leading-relaxed">{BLURBS.hindi}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/library" className="cut-btn" lang="hi">
                  पुस्तकालय चलें
                </Link>
                <Link to="/feedback" className="cut-btn cut-btn-alt" lang="hi">
                  और सुनाओ
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
