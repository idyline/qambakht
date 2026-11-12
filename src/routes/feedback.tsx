import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties, type FormEvent } from "react";

import { AUTHOR_EMAIL, LOGO, pageHead } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () => pageHead("Share feedback about Aam Zindagi! by Adarsh Anand."),
  component: Feedback,
});

const LABELS = ["", "Not for me", "Okay", "Good", "Great", "Loved it!"];
const CONFETTI_PIECES = Array.from({ length: 42 }, (_, index) => index);

function FeedbackConfetti() {
  return (
    <span className="feedback-confetti" aria-hidden="true">
      {CONFETTI_PIECES.map((piece) => {
        const style = {
          left: `${(piece * 37) % 100}%`,
          animationDelay: `${(piece % 9) * 35}ms`,
          "--confetti-drift": `${((piece * 19) % 120) - 60}px`,
        } as CSSProperties;

        return <i key={piece} data-color={piece % 5} data-shape={piece % 3} style={style} />;
      })}
    </span>
  );
}

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [thoughts, setThoughts] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [problem, setProblem] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!thoughts.trim()) {
      setProblem("Please share a few thoughts before sending.");
      return;
    }

    setProblem("");
    setFallbackHref("");
    setSending(true);
    const message = [
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Rating: ${rating ? `${rating} / 5` : "Not provided"}`,
      "",
      thoughts.trim(),
    ].join("\n");
    const mailto = `mailto:${AUTHOR_EMAIL}?${new URLSearchParams({
      subject: `Feedback on Qambakht. — ${name || "A reader"}`,
      body: message,
    }).toString()}`;

    try {
      const formData = new FormData(e.currentTarget);
      formData.set("_subject", `Feedback on Qambakht. — ${name || "A reader"}`);
      formData.set("_template", "table");
      formData.set("rating", rating ? `${rating} / 5` : "Not provided");
      if (email) formData.set("_replyto", email);

      const response = await fetch(`https://formsubmit.co/ajax/${AUTHOR_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = (await response.json()) as {
        ok?: boolean;
        success?: boolean | string;
        message?: string;
      };
      const delivered = result.ok === true || result.success === true || result.success === "true";
      if (!response.ok || !delivered) throw new Error(result.message || "Feedback delivery failed");
      setSent(true);
    } catch {
      setFallbackHref(mailto);
      setProblem(
        "Automatic delivery is unavailable right now. You can still send your feedback by email.",
      );
    } finally {
      setSending(false);
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
          <input
            className="feedback-honeypot"
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <label className="field">
              <span className="feedback-label">Name</span>
              <input
                name="name"
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
                name="email"
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
              name="message"
              className="lined"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              maxLength={4000}
              placeholder="Share what you liked, what you felt, or what you would change..."
            />
          </label>

          {problem && (
            <div className="feedback-delivery-notice mt-4" role="alert">
              <p className="feedback-message">{problem}</p>
              {fallbackHref && (
                <a href={fallbackHref} className="cut-btn cut-btn-alt mt-3 inline-flex">
                  Open email draft
                </a>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={sending || sent} className="cut-btn">
              {sending ? "Sending..." : sent ? "Sent" : "Send feedback"}
            </button>
            {sent && (
              <p className="feedback-success" role="status" aria-live="polite">
                Thanks for sharing your feedback.
                <FeedbackConfetti />
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
