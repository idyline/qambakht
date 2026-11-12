import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { ART, NAV, type ArtNo } from "@/data/site";

type ActiveIntro = {
  pathname: string;
  title: string;
  illustration: ArtNo;
};

const INTRO_DURATION = 1800;

const FEATURED_INTRO_ART: Record<string, { src: string; w: number; h: number; className: string }> =
  {
    "/": {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2856%29-CmXd9UcKa4L9ccYa2BwwxnwWxnGQyN.jpg",
      w: 736,
      h: 1104,
      className: "page-intro-art-home",
    },
    "/feedback": {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20%2836%29-C4yhNoFCbGnYv8n7nwYNyzjEUNAPW6.jpg",
      w: 736,
      h: 1472,
      className: "page-intro-art-feedback",
    },
  };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageIntro() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [activeIntro, setActiveIntro] = useState<ActiveIntro | null>(null);

  useEffect(() => {
    const page = NAV.find((item) => item.to === pathname);
    if (!page || prefersReducedMotion()) {
      setActiveIntro(null);
      return;
    }

    setActiveIntro({
      pathname,
      title: page.english,
      illustration: page.interstitial,
    });

    const timeout = window.setTimeout(() => setActiveIntro(null), INTRO_DURATION);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  if (!activeIntro || activeIntro.pathname !== pathname) return null;

  const source = FEATURED_INTRO_ART[activeIntro.pathname] ?? ART[activeIntro.illustration];
  const artClassName = "className" in source ? source.className : "";

  return (
    <div className="page-intro" aria-hidden="true">
      <div className="page-intro-stage">
        <div
          className="page-intro-art-frame"
          data-art={activeIntro.illustration}
          data-route={activeIntro.pathname}
        >
          <img
            src={source.src}
            alt=""
            aria-hidden="true"
            width={source.w}
            height={source.h}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className={`page-intro-art ${artClassName}`}
          />
        </div>
        <p className="page-intro-title">{activeIntro.title}</p>
        <span className="page-intro-progress" />
      </div>
    </div>
  );
}
