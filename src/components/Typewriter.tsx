import { useEffect, useState } from "react";

type Props = {
  phrases: string[];
  typingMs?: number;
  holdingMs?: number;
};

/** Typewriter that cycles through phrases, with blinking caret. */
export function Typewriter({ phrases, typingMs = 65, holdingMs = 1800 }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length] ?? "";
    let timer: number;

    if (!deleting && text === current) {
      timer = window.setTimeout(() => setDeleting(true), holdingMs);
    } else if (deleting && text === "") {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, 350);
    } else {
      timer = window.setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1),
          );
        },
        deleting ? typingMs / 2 : typingMs,
      );
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, typingMs, holdingMs]);

  return (
    <span>
      {text}
      <span className="type-caret caret-blink" aria-hidden="true" />
    </span>
  );
}
