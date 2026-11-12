import { createFileRoute } from "@tanstack/react-router";

import {
  AUTHOR_EMAIL,
  CONNECT_ILLUSTRATION,
  GMAIL_ICON,
  INSTAGRAM_ICON,
  pageHead,
} from "@/data/site";

export const Route = createFileRoute("/connect")({
  head: () => pageHead("Connect with Adarsh Anand, author of Aam Zindagi!"),
  component: Connect,
});

function Connect() {
  return (
    <div className="connect-page relative pt-32 md:pt-36">
      <section className="connect-card" aria-labelledby="connect-title">
        <div className="connect-illustration-wrap">
          <img
            src={CONNECT_ILLUSTRATION}
            alt="Watercolor illustration of a woman holding a leafy potted plant."
            width={736}
            height={736}
            className="connect-illustration"
            fetchPriority="high"
          />
        </div>

        <div className="connect-content">
          <p className="eyebrow">Adarsh Anand</p>
          <h1 id="connect-title" className="connect-title">
            Connect
          </h1>
          <div className="connect-links">
            <a
              href="https://www.instagram.com/aapka.adarsh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram account aapka.adarsh"
              className="connect-link"
            >
              <img src={INSTAGRAM_ICON} alt="Instagram" width={24} height={24} />
              <span>aapka.adarsh</span>
              <span className="connect-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              href={`mailto:${AUTHOR_EMAIL}`}
              aria-label={`Email ${AUTHOR_EMAIL}`}
              className="connect-link"
            >
              <img src={GMAIL_ICON} alt="Gmail" width={24} height={24} />
              <span>{AUTHOR_EMAIL}</span>
              <span className="connect-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        <p className="connect-note">more connection are yet to come.</p>
      </section>
    </div>
  );
}
