import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Send, Star } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArtDivider } from "@/components/ArtDivider";
import { AUTHOR_EMAIL, arts } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — Qambakht" },
      { name: "description", content: "Rate Aam Zindagi! and share your reader thoughts — feedback goes straight to Adarsh Anand's inbox." },
      { property: "og:title", content: "Feedback — Qambakht" },
      { property: "og:description", content: "Rate the stories and share your reader thoughts with the author." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Feedback,
});

const WEB3FORMS_KEY = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"] as string | undefined;

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [thoughts, setThoughts] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Qambakht feedback from ${name || "a reader"}`;
    const body = [
      `Name: ${name || "(not given)"}`,
      email ? `Email: ${email}` : null,
      `Rating: ${rating ? `${rating} / 5` : "(not given)"}`,
      "",
      "Reader thoughts:",
      thoughts,
    ]
      .filter((line) => line !== null)
      .join("\n");

    if (WEB3FORMS_KEY) {
      setSending(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: name || "A Qambakht reader",
            replyto: email || undefined,
            message: body,
          }),
        });
        if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`);
        setSent(true);
      } catch (err) {
        console.error(err);
        // Fall back to the reader's own mail client, addressed to the author.
        window.location.href = `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      } finally {
        setSending(false);
      }
    } else {
      // Mailto fallback — opens the reader's mail app pre-filled for the author.
      window.location.href = `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-16">
      <Navbar />

      {/* hand-block buti texture as an atmospheric backdrop */}
      <img
        src={arts.buti}
        alt=""
        aria-hidden="true"
        className="art-watermark absolute -right-24 top-24 hidden h-[520px] w-[520px] rounded-full object-cover lg:block"
      />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[680px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.740 0.118 80 / 8%), transparent 72%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-4 pb-24 pt-20 sm:px-6">
          <div className="text-center">
            <p className="eyebrow">Feedback</p>
            <h1 className="font-display mt-3 text-4xl font-medium text-cream sm:text-5xl">
              Reader Feedback
            </h1>
            <p className="mx-auto mt-4 max-w-md text-tan-muted">
              A minute of your time, straight to the author's inbox.
            </p>
          </div>

          <div className="surface mt-10 rounded-3xl p-7 sm:p-10">
            {sent ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
                <h2 className="font-display mt-4 text-2xl text-tan">Thank you!</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-tan-muted">
                  Your note is on its way to the author. If your mail app didn't
                  open automatically, write to{" "}
                  <a className="text-gold-bright underline" href={`mailto:${AUTHOR_EMAIL}`}>
                    {AUTHOR_EMAIL}
                  </a>
                  .
                </p>
                <Link to="/" className="btn-outline mt-6 text-sm">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-2 block text-tan">Name</span>
                    <input
                      className="input-warm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-2 block text-tan">
                      Email <span className="text-tan-muted/70">(optional)</span>
                    </span>
                    <input
                      className="input-warm"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Only if you'd like a reply"
                    />
                  </label>
                </div>

                <fieldset className="block text-sm">
                  <legend className="mb-2 block text-tan">Your impression</legend>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        onClick={() => setRating(n)}
                        className="rounded-md p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Star
                          className={`h-6 w-6 transition-colors ${
                            n <= rating
                              ? "fill-gold text-gold"
                              : "text-tan-muted/50 hover:text-gold/70"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs text-tan-muted">
                      {rating ? `${rating} / 5` : "Tap to rate"}
                    </span>
                  </div>
                </fieldset>

                <label className="block text-sm">
                  <span className="mb-2 block text-tan">Reader thoughts</span>
                  <textarea
                    className="input-warm min-h-32"
                    value={thoughts}
                    onChange={(e) => setThoughts(e.target.value)}
                    placeholder="What did the stories leave you with?"
                    required
                  />
                </label>

                <button type="submit" disabled={sending} className="btn-gold w-full text-sm disabled:opacity-60">
                  <Send className="h-4 w-4" />
                  {sending ? "Sending…" : "Send Feedback"}
                </button>
                <p className="text-center text-xs text-tan-muted/70">
                  Goes straight to {AUTHOR_EMAIL} — no newsletters, no spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* elephant frieze page break before the footer */}
      <div className="px-4 sm:px-6">
        <ArtDivider className="max-w-xl" />
      </div>

      <Footer />
    </div>
  );
}
