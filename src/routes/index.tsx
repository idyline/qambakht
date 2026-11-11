import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

import { BookShowcase } from "@/components/BookShowcase";
import { BookTile } from "@/components/BookTile";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import { NavLink } from "@/components/Transition";
import { Typewriter } from "@/components/Typewriter";
import { LogoBadge } from "@/components/Wordmark";
import { HERO_HEAD, HERO_TAIL, pageHead } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Qambakht. — Aam Zindagi! by Adarsh Anand, in English and Hindi. A small desi art-gallery of a website.",
    ),
  component: Home,
});

function Home() {
  const hero = useRef<HTMLElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = hero.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - r.left}px`);
    el.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  return (
    <div className="relative pt-28 md:pt-32">
      {/* HERO — the Hindi line, a warm welcome, and the two editions floating in 3D */}
      <section ref={hero} onPointerMove={onMove} className="hero">
        <div className="hero-spot" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 md:grid-cols-[1.05fr_0.95fr] md:gap-8">
          <div className="relative">
            <p className="eyebrow enter" style={{ animationDelay: "60ms" }}>
              <LogoBadge size={24} />
              <span>Qambakht.</span>
              <span className="eyebrow-dot" aria-hidden />
              <span>A literary lounge</span>
            </p>
            <h1 lang="hi" className="hero-title enter" style={{ animationDelay: "160ms" }}>
              {HERO_HEAD}
              <span className="hero-tail">
                <Typewriter phrases={[HERO_TAIL]} typingMs={70} holdingMs={4200} />
              </span>
            </h1>
            <p className="hero-copy enter" style={{ animationDelay: "280ms" }}>
              Welcome to Qambakht. — a quiet corner of the internet where ordinary life reads like
              literature. Free, in English and Hindi, whenever the mood strikes.
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3" style={{ animationDelay: "380ms" }}>
              <NavLink to="/library" className="cut-btn glow-btn" lang="hi">
                पुस्तकालय चलें
              </NavLink>
              <NavLink to="/author" className="cut-btn cut-btn-alt glow-btn" lang="hi">
                मिलिए कम्बख़्त से
              </NavLink>
            </div>
            <ul className="hero-chips enter" style={{ animationDelay: "480ms" }}>
              <li>
                English · <span lang="hi">हिन्दी</span>
              </li>
              <li>Free to read</li>
              <li>PDF download</li>
            </ul>
          </div>

          <div className="enter" style={{ animationDelay: "240ms" }}>
            <BookShowcase />
          </div>
        </div>
      </section>

      {/* classical frieze divider — still, dignified */}
      <div
        className="frieze-static"
        aria-hidden
        style={{ backgroundImage: "url(/assets/art/41-baraat-procession.jpg)" }}
      />

      {/* CURATED READING — a calm bento: two books, the lane, and a quick way in */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <header className="mb-12 text-center">
            <p className="kicker">Curated Reading</p>
            <h2 lang="hi" className="section-title">
              दो किताबें, एक दिल।
            </h2>
          </header>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-6">
          <Reveal className="md:col-span-3">
            <BookTile lang="english" mode="home" />
          </Reveal>
          <Reveal className="md:col-span-3" delay={80}>
            <BookTile lang="hindi" mode="home" />
          </Reveal>
          <Reveal className="md:col-span-4" delay={120}>
            <Tilt className="paper-card bento-quote h-full">
              <span className="quote-mark" aria-hidden>
                “
              </span>
              <p lang="hi" className="title-hi text-2xl md:text-3xl">
                गली सुन रही है
              </p>
              <p className="mt-3 max-w-xl leading-relaxed">
                Every story here began as something overheard — a quarrel, a joke, a silence at a
                tea stall. Step in; the lane keeps its secrets and tells them beautifully.
              </p>
              <NavLink to="/author" className="cut-btn cut-btn-alt glow-btn mt-6" lang="hi">
                मिलिए कम्बख़्त से
              </NavLink>
            </Tilt>
          </Reveal>
          <Reveal className="md:col-span-2" delay={160}>
            <Tilt className="paper-card bento-mini h-full">
              <p className="kicker">Reading room</p>
              <p className="mt-2 text-lg leading-relaxed">
                Read in your browser or keep the PDF — both editions, free.
              </p>
              <NavLink to="/library" className="cut-btn glow-btn mt-6" lang="hi">
                पढ़ें
              </NavLink>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* closing note */}
      <section className="mx-auto max-w-4xl px-6 pb-6">
        <Reveal>
          <div className="closing-panel">
            <p lang="hi" className="konkani text-3xl md:text-4xl">
              कहानियाँ, जो ठहर जाएँ
            </p>
            <NavLink to="/library" className="cut-btn glow-btn mt-6" lang="hi">
              पुस्तकालय चलें
            </NavLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
