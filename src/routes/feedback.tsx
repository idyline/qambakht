import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AUTHOR_EMAIL, LOGO, pageHead } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () => pageHead("Share feedback about Aam Zindagi! by Adarsh Anand."),
  component: Feedback,
});

const WEB3FORMS_KEY = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"] as string | undefined;
const LABELS = ["", "Not for me", "Okay", "Good", "Great", "Loved it!"];

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [thoughts, setThoughts] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!thoughts.trim()) {
      setProblem("Please share a few thoughts before sending.");
      return;
    }
    setProblem("");
    const subject = `Feedback on Qambakht. — ${name || "A reader"}`;
    const body = [
      `Name: ${name || "Not provided"}`,
      email ? `Email: ${email}` : null,
      `Rating: ${rating ? `${rating} / 5` : "Not provided"}`,
      "",
      "Message:",
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
            from_name: name || "Qambakht. reader",
            replyto: email || undefined,
            message: body,
          }),
        });
        if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`);
        setSent(true);
      } catch (err) {
        console.error(err);
        window.location.href = `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSent(true);
      } finally {
        setSending(false);
      }
    } else {
      window.location.href = `mailto:${AUTHOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSent(true);
    }
  }

  return (
    <div className="relative pt-32 md:pt-36">
      <section className="feedback-panel relative mx-auto max-w-4xl rounded-3xl px-6 py-12 md:px-12">
        <header className="relative text-center">
          <p className="eyebrow">Aam Zindagi! · Reader feedback</p>
          <h1 lang="hi" className="feedback-title mt-3 text-5xl md:text-6xl">
            और सुनाओ?
          </h1>
          <p className="feedback-intro mt-3">Tell us what stayed with you.</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="postcard relative mx-auto mt-10 max-w-2xl p-6 md:p-10"
        >
          {sent && (
            <div className="postmark" aria-hidden>
              <span>Thank you!</span>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            <label className="field">
              <span className="feedback-label">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
            <label className="field">
              <span className="feedback-label">Email (optional)</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <fieldset className="mt-8">
            <legend className="feedback-label text-lg">How did the book feel?</legend>
            <div className="mt-2 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} out of 5`}
                  aria-pressed={rating === n}
                  onClick={() => setRating(n)}
                  className={`cup-rate ${n <= rating ? "on" : ""}`}
                >
                  <img src={LOGO} alt="" width={44} height={44} />
                </button>
              ))}
              <span className="feedback-rating-label ml-3 text-xl">{LABELS[rating]}</span>
            </div>
          </fieldset>

          <label className="field mt-8 block">
            <span className="feedback-label">Your message</span>
            <textarea
              rows={6}
              className="lined"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              maxLength={4000}
              placeholder="Share what you liked, what you felt, or what you would change..."
            />
          </label>

          {problem && (
            <p className="feedback-message mt-3 text-lg" role="alert">
              {problem}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={sending} className="cut-btn">
              {sending ? "Sending..." : "Send feedback"}
            </button>
            {sent && (
              <p className="feedback-success" role="status" aria-live="polite">
                Thanks for sharing your feedback.
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
