import { createFileRoute, Link } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { BookTile } from "@/components/BookTile";
import { Tilt } from "@/components/Tilt";
import { Typewriter } from "@/components/Typewriter";
import { Wordmark } from "@/components/Wordmark";
import { HERO_LINE, covers, pageHead } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Qambakht. — Aam Zindagi! by Adarsh Anand, in English and Hindi. A small desi art-gallery of a website.",
    ),
  component: Home,
});

function Home() {
  return (
    <div className="relative pt-32 md:pt-36">
      {/* HERO — wordmark, the fixed Hindi line, a warm welcome, and the Hindi cover in its arch */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-16 md:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal relative">
          <Wordmark className="text-6xl sm:text-7xl md:text-[7rem]" />
          <p lang="hi" className="font-tiro mt-6 min-h-[4rem] text-xl leading-[1.8] sm:text-2xl">
            <Typewriter phrases={[HERO_LINE]} typingMs={60} holdingMs={4200} />
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed">
            Welcome to Qambakht. — a quiet corner of the internet where ordinary life reads like
            literature. Free, in English and Hindi, whenever the mood strikes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/library" className="cut-btn" lang="hi">
              पुस्तकालय चलें
            </Link>
            <Link to="/author" className="cut-btn cut-btn-alt" lang="hi">
              मिलिए कम्बख़्त से
            </Link>
          </div>
          <p lang="hi" className="margin-note mt-8 rotate-[-2deg]">
            पढ़ते-पढ़ते चाय ठंडी न हो जाए
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <Art n={24} className="w-full" priority />
          <img
            src={covers.hindi.url}
            alt="Cover of आम ज़िंदगी! by Adarsh Anand"
            width={600}
            height={900}
            fetchPriority="high"
            className="cover-in-arch"
          />
          <Art n={8} className="absolute -right-5 top-4 z-[3] w-20 rotate-[12deg]" />
        </div>
      </section>

      {/* classical frieze divider — still, dignified */}
      <div
        className="frieze-static"
        aria-hidden
        style={{ backgroundImage: "url(/assets/art/41-baraat-procession.jpg)" }}
      />

      {/* CURATED READING — a calm bento: two books and the lane that watches back */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-12 text-center">
          <h2 className="title-en text-4xl md:text-5xl">Curated Reading</h2>
          <p lang="hi" className="font-tiro mt-3 text-2xl text-ink/80">
            दो किताबें, एक दिल।
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          <BookTile lang="english" mode="home" />
          <BookTile lang="hindi" mode="home" />
          <Tilt className="md:col-span-2">
            <div className="paper-card relative grid items-center gap-6 p-6 sm:grid-cols-[120px_1fr] md:p-8">
              <Art n={21} className="mx-auto w-24 md:w-28" />
              <div>
                <p lang="hi" className="title-hi text-2xl md:text-3xl">
                  गली सुन रही है
                </p>
                <p className="mt-2 leading-relaxed">
                  Every story here began as something overheard — a quarrel, a joke, a silence at a
                  tea stall. Step in; the lane keeps its secrets and tells them beautifully.
                </p>
                <Link to="/author" className="cut-btn cut-btn-alt mt-4" lang="hi">
                  मिलिए कम्बख़्त से
                </Link>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* closing note */}
      <section className="mx-auto max-w-4xl px-6 pb-10">
        <div className="night-panel rounded-3xl px-8 py-12 text-center">
          <p lang="hi" className="konkani text-3xl md:text-4xl">
            कहानियाँ, जो ठहर जाएँ
          </p>
          <Link to="/library" className="cut-btn mt-6" lang="hi">
            पुस्तकालय चलें
          </Link>
        </div>
      </section>
    </div>
  );
}
