import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AUTHOR_EMAIL, LOGO, pageHead } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () => pageHead("और सुनाओ? — आम ज़िंदगी पर अपनी राय आदर्श आनंद तक पहुँचाएँ।"),
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
      setProblem("कृपया अपनी बात ज़रूर लिखें।");
      return;
    }
    setProblem("");
    const subject = `Qambakht. पर प्रतिक्रिया — ${name || "एक पाठक"}`;
    const body = [
      `नाम: ${name || "नहीं दिया गया"}`,
      email ? `ईमेल: ${email}` : null,
      `रेटिंग: ${rating ? `${rating} / 5` : "नहीं दी गई"}`,
      "",
      "पाठक की बात:",
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
            from_name: name || "Qambakht. के पाठक",
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
      <section
        lang="hi"
        className="feedback-panel relative mx-auto max-w-4xl rounded-3xl px-6 py-12 md:px-12"
      >
        <header className="relative text-center">
          <p className="eyebrow">आम ज़िंदगी · पाठकों की बात</p>
          <h1 className="feedback-title mt-3 text-5xl md:text-6xl">और सुनाओ?</h1>
          <p className="feedback-intro mt-3">चाय पर, किताब पर — जो मन में हो, लिख भेजिए।</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="postcard relative mx-auto mt-10 max-w-2xl p-6 md:p-10"
        >
          {sent && (
            <div className="postmark" aria-hidden>
              <span lang="hi">शुक्रिया!</span>
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            <label className="field">
              <span className="feedback-label">आपका नाम</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                autoComplete="name"
                placeholder="नाम लिखें"
              />
            </label>
            <label className="field">
              <span className="feedback-label">ईमेल (वैकल्पिक)</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                autoComplete="email"
                placeholder="ईमेल लिखें"
              />
            </label>
          </div>

          <fieldset className="mt-8">
            <legend className="feedback-label text-lg">चाय कैसी लगी?</legend>
            <div className="mt-2 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`पाँच में से ${n}`}
                  aria-pressed={rating === n}
                  onClick={() => setRating(n)}
                  className={`cup-rate ${n <= rating ? "on" : ""}`}
                >
                  <img src={LOGO} alt="" width={44} height={44} />
                </button>
              ))}
              <span lang="hi" className="feedback-rating-label ml-3 text-xl">
                {LABELS[rating]}
              </span>
            </div>
          </fieldset>

          <label className="field mt-8 block">
            <span className="feedback-label">मन की बात</span>
            <textarea
              rows={6}
              className="lined"
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              maxLength={4000}
              placeholder="अपनी राय यहाँ लिखें…"
            />
          </label>

          {problem && (
            <p className="feedback-message mt-3 text-lg" lang="hi" role="alert">
              {problem}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={sending} className="cut-btn">
              {sending ? "भेज रहे हैं…" : <span>चिट्ठी भेजें</span>}
            </button>
            {sent && (
              <p className="tiro-thanks" lang="hi" role="status" aria-live="polite">
                शुक्रिया! आपकी चिट्ठी पहुँच गई।
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
