import { createFileRoute } from "@tanstack/react-router";

import { covers, pageHead } from "@/data/site";
import { PURCHASE_LINKS } from "@/data/purchaseLinks";

export const Route = createFileRoute("/buy")({
  head: () => pageHead("Choose a format and find Aam Zindagi! by Adarsh Anand."),
  component: Buy,
});

function Buy() {
  return (
    <div className="relative min-h-[65vh] pt-32 md:pt-40">
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow">Aam Zindagi!</p>
          <h1 className="title-en mt-3 text-4xl sm:text-5xl">Find your copy</h1>
          <p className="mt-3 text-ink/70">Choose your language and bookseller.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2">
          <PurchaseCard
            title={covers.english.title}
            language="English"
            cover={covers.english.url}
            shops={[
              { label: "Amazon", href: PURCHASE_LINKS.englishAmazon },
              { label: "Pothi", href: PURCHASE_LINKS.englishPothi },
            ]}
          />
          <PurchaseCard
            title={covers.hindi.title}
            language="हिन्दी"
            cover={covers.hindi.url}
            shops={[{ label: "Pothi", href: PURCHASE_LINKS.hindiPothi }]}
            hindi
          />
        </div>
      </section>
    </div>
  );
}

function PurchaseCard({
  title,
  language,
  cover,
  shops,
  hindi = false,
}: {
  title: string;
  language: string;
  cover: string;
  shops: { label: string; href: string }[];
  hindi?: boolean;
}) {
  return (
    <article className="book-card">
      <img
        src={cover}
        alt={`${title} book cover`}
        width={600}
        height={900}
        className="book-card-cover"
      />
      <div className="book-card-info">
        <p className="eyebrow">{language}</p>
        <h2
          lang={hindi ? "hi" : "en"}
          className={`title-${hindi ? "hi" : "en"} mt-2 text-2xl sm:text-3xl`}
        >
          {title}
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {shops.map((shop) => (
            <a
              key={shop.label}
              href={shop.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cut-btn"
            >
              {shop.label} <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
