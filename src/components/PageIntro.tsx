import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { ART, NAV, type ArtNo } from "@/data/site";

type ActiveIntro = {
  pathname: string;
  title: string;
  illustration: ArtNo;
};

const INTRO_DURATION = 900;

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

  const source = ART[activeIntro.illustration];

  return (
    <div className="page-intro" aria-hidden="true">
      <div className="page-intro-stage">
        <div className="page-intro-art-frame" data-art={activeIntro.illustration}>
          <img
            src={source.src}
            alt=""
            aria-hidden="true"
            width={source.w}
            height={source.h}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="page-intro-art"
          />
        </div>
        <p className="page-intro-kicker">Qambakht.</p>
        <p className="page-intro-title">{activeIntro.title}</p>
        <span className="page-intro-progress" />
      </div>
    </div>
  );
}
