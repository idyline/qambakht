import { Link } from "@tanstack/react-router";

import { CupLogo, Steam, Wordmark } from "@/components/Wordmark";

export function HomeIntro() {
  return (
    <section className="home-intro" aria-labelledby="home-intro-title">
      <div className="home-intro-ring" aria-hidden="true" />
      <div className="home-intro-content">
        <div className="home-intro-lockup">
          <span className="home-intro-cup">
            <Steam className="home-intro-steam" />
            <CupLogo size={78} />
          </span>
          <h1 id="home-intro-title" className="home-intro-title">
            <Wordmark animate className="home-intro-wordmark" />
          </h1>
        </div>
        <p className="home-intro-byline">Aam Zindagi! · a novel by Adarsh Anand</p>
        <Link to="/library" className="cut-btn home-intro-cta">
          Explore the novel <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
