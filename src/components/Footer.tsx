import { Lockup } from "@/components/Wordmark";
import { AUTHOR_EMAIL, INTRO_LINE } from "@/data/site";
import { PURCHASE_LINKS } from "@/data/purchaseLinks";

/**
 * Dark terracotta glass footer. No nav tabs (by request) — only the brand,
 * the purchase links (the site's only new-tab links) and a line to write in.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glass">
        <div className="footer-border" aria-hidden />
        <div className="footer-grid">
          <div className="space-y-4">
            <Lockup size={32} className="footer-lockup" />
            <p lang="hi" className="footer-tag">
              {INTRO_LINE}
            </p>
            <p className="footer-copy">
              Aam Zindagi! — ordinary life, read like literature. Free, in English and हिन्दी.
            </p>
          </div>

          <div>
            <p className="footer-head">Get the book</p>
            <ul className="footer-links">
              <li>
                <a href={PURCHASE_LINKS.englishAmazon} target="_blank" rel="noopener noreferrer">
                  Amazon <span>· English</span>
                </a>
              </li>
              <li>
                <a href={PURCHASE_LINKS.englishPothi} target="_blank" rel="noopener noreferrer">
                  Pothi <span>· English</span>
                </a>
              </li>
              <li>
                <a href={PURCHASE_LINKS.hindiPothi} target="_blank" rel="noopener noreferrer">
                  Pothi <span lang="hi">· हिन्दी</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer-head">Write in</p>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${AUTHOR_EMAIL}`}>{AUTHOR_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <p>© 2026 Qambakht. · Adarsh Anand</p>
          <p lang="hi">पढ़ते-पढ़ते चाय ठंडी न हो जाए</p>
        </div>
      </div>
    </footer>
  );
}
