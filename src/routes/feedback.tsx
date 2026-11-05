import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Art } from "@/components/Art";
import { AUTHOR_EMAIL, LOGO, pageHead } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () =>
    pageHead("और सुनाओ? — rate Aam Zindagi! and send your reader thoughts straight to Adarsh Anand."),
  component: Feedback,
});

const WEB3FORMS_KEY = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"] as string | undefined;
const LABELS = ["", "थोड़ी फीकी", "ठीक-ठाक", "अच्छी लगी", "बहुत बढ़िया", "दिल छू गई!"];

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
      setProblem("दो शब्द तो लिखिए — just a line or two of thoughts, please.");
      return;
    }
    setProblem("");
    const subject = `Qambakht. feedback from ${name || "a reader"}`;
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
            from_name: name || "A Qambakht. reader",
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
      <section className="night-panel relative mx-auto max-w-4xl rounded-3xl px-6 py-12 md:px-12">
        <header className="relative text-center sm:pr-28">
          <h1 lang="hi" className="konkani text-5xl md:text-6xl">
            और सुनाओ?
          </h1>
          <p className="extrude-night mt-2 text-xl" lang="hi">
            अनुभव लिख भेजिए
          </p>
          <p className="mt-2 font-body italic text-cream/85">The Post Office — a postcard to the author.</p>
          <Art n={16} className="absolute -top-2 right-0 hidden w-20 rotate-[4deg] sm:block" />
        </header>

        <form onSubmit={handleSubmit} className="postcard relative mx-auto mt-10 max-w-2xl p-6 md:p-10">
          {sent && (
            <div className="postmark" aria-hidden>
              <span lang="hi">शुक्रिया!</span>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            <label className="field">
              <span className="hand">Name · नाम</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
            </label>
            <label className="field">
              <span className="hand">Email (optional)</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
            </label>
          </div>

          <fieldset className="mt-8">
            <legend className="hand text-lg">How was the chai? · कैसी लगी?</legend>
            <div className="mt-2 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} of 5`}
                  aria-pressed={rating === n}
                  onClick={() => setRating(n)}
                  className={`cup-rate ${n <= rating ? "on" : ""}`}
                >
                  <img src={LOGO} alt="" width={44} height={44} />
                </button>
              ))}
              <span lang="hi" className="hand ml-3 text-xl">
                {LABELS[rating]}
              </span>
            </div>
          </fieldset>

          <label className="field mt-8 block">
            <span className="hand">Thoughts · मन की बात</span>
            <textarea rows={6} className="lined" value={thoughts} onChange={(e) => setThoughts(e.target.value)} maxLength={4000} />
          </label>

          {problem && <p className="hand mt-3 text-lg" lang="hi">{problem}</p>}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={sending} className="cut-btn">
              {sending ? "भेज रहे हैं…" : <span lang="hi">चिट्ठी भेजो</span>}
            </button>
            {sent && <p className="tiro-thanks" lang="hi">शुक्रिया! आपकी चिट्ठी पहुँच गई।</p>}
          </div>
        </form>

        {sent && <Art n={44} className="dove-out absolute -bottom-2 right-10 w-16" />}
      </section>

      <div className="relative mx-auto -mt-2 max-w-5xl px-6">
        <Art n={29} className="mx-auto w-full max-w-3xl" />
      </div>
    </div>
  );
}
