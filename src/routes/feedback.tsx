import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AUTHOR_EMAIL } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — Qambakht" },
      { name: "description", content: "Tell the author what the stories made you feel — feedback goes straight to Adarsh Anand's inbox." },
      { property: "og:title", content: "Feedback — Qambakht" },
      { property: "og:description", content: "Tell the author what the stories made you feel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Feedback,
});

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feeling, setFeeling] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Qambakht feedback from ${name || "a reader"}`;
    const body = [
      `Name: ${name || "(not given)"}`,
      email ? `Email: ${email}` : null,
      "",
      "What did the stories make you feel?",
      feeling,
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
    <div className="min-h-screen bg-background pt-16">
      <Navbar />

      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[720px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.745 0.115 75 / 9%), transparent 72%)",
          }}
        />
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-20 sm:px-6">
          <div className="text-center">
            <p className="eyebrow">Feedback · Sharing the page</p>
            <h1 className="font-display mt-3 text-4xl font-medium text-tan sm:text-5xl">
              Tell me what the stories left behind
            </h1>
            <p className="mt-5 leading-relaxed text-tan-muted">
              Here's the question this little press keeps returning to:
            </p>
            <p className="font-hindi mt-3 text-xl text-gold-bright">
              If <span className="text-tan">आम ज़िंदगी</span> were an evening, what would it taste like?
            </p>
            <p className="mt-2 text-sm text-tan-muted/80">
              Sweet tea on a hot day? Rain on a tin roof? Write it down — every
              answer lands directly in the author's inbox.
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
                    <span className="mb-2 block text-tan">Your name</span>
                    <input
                      className="input-warm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="How should the author greet you?"
                    />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-2 block text-tan">
                      Your email <span className="text-tan-muted/70">(optional)</span>
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
                <label className="block text-sm">
                  <span className="mb-2 block text-tan">
                    What did the stories make you feel?
                  </span>
                  <textarea
                    className="input-warm min-h-36"
                    value={feeling}
                    onChange={(e) => setFeeling(e.target.value)}
                    placeholder="An evening that tastes like…"
                    required
                  />
                </label>
                <button type="submit" disabled={sending} className="btn-gold w-full text-sm disabled:opacity-60">
                  <Send className="h-4 w-4" />
                  {sending ? "Sending…" : "Send Feedback"}
                </button>
                <p className="text-center text-xs text-tan-muted/70">
                  Goes straight to {AUTHOR_EMAIL} — no newsletters, no spam, just a reader's note.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
