import { createFileRoute, Link } from "@tanstack/react-router";

import { NAV, pageHead } from "@/data/site";

export const Route = createFileRoute("/menu")({
  head: () => pageHead("Qambakht. के सभी पन्नों तक पहुँचने का सरल रास्ता।"),
  component: Menu,
});

function Menu() {
  return (
    <div className="menu-page">
      <section className="menu-page-panel">
        <div className="menu-page-copy">
          <p className="eyebrow">Qambakht. · किताबों और कहानियों का घर</p>
          <h1 lang="hi" className="menu-page-heading">
            कहाँ चलें?
          </h1>
          <p lang="hi" className="menu-page-description">
            अपनी पसंद की गली चुनिए।
          </p>
        </div>

        <nav aria-label="मुख्य नेविगेशन" lang="hi" className="menu-page-nav">
          <ol className="menu-page-list">
            {NAV.map((item, index) => (
              <li
                key={item.to}
                className="menu-page-item"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <Link to={item.to} className="menu-page-link">
                  <span className="menu-page-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="menu-page-label">{item.label}</span>
                  <span className="menu-page-arrow" aria-hidden>
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </div>
  );
}
