import { createFileRoute, Link } from "@tanstack/react-router";

import { NAV, pageHead } from "@/data/site";

export const Route = createFileRoute("/menu")({
  head: () => pageHead("Navigate the pages of Qambakht."),
  component: Menu,
});

function Menu() {
  return (
    <div className="menu-page">
      <nav aria-label="Primary navigation" className="menu-page-panel menu-page-nav">
        <ol className="menu-page-list">
          {NAV.map((item, index) => (
            <li
              key={item.to}
              className="menu-page-item"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <Link to={item.to} className="menu-page-link">
                <span className="menu-page-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span lang="hi" className="menu-page-label">
                  {item.label}
                </span>
                <span className="menu-page-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
