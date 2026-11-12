import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { Art } from "@/components/Art";
import { CONNECT_ILLUSTRATION, NAV, type ArtNo } from "@/data/site";

type ActiveIntro = {
  pathname: string;
  title: string;
  illustration: ArtNo;
};

const INTRO_DURATION = 1800;

export function PageIntro() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [activeIntro, setActiveIntro] = useState<ActiveIntro | null>(null);

  useEffect(() => {
    const page = NAV.find((item) => item.to === pathname);
    if (!page || pathname === "/") {
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

  const isBuy = activeIntro.pathname === "/buy";
  const isConnect = activeIntro.pathname === "/connect";

  return (
    <div className="page-intro" aria-hidden="true">
      <div className="page-intro-stage">
        <div className="page-intro-art-frame" data-art={activeIntro.illustration}>
          {isConnect ? (
            <img
              src={CONNECT_ILLUSTRATION}
              alt=""
              width={736}
              height={736}
              className="page-intro-connect-image"
              fetchPriority="high"
            />
          ) : (
            <Art
              n={activeIntro.illustration}
              look="multiply"
              shape={isBuy ? "arch" : "circle"}
              cover={!isBuy}
              priority
              className="page-intro-art"
            />
          )}
        </div>
        <p className="page-intro-title">{activeIntro.title}</p>
        <span className="page-intro-progress" />
      </div>
    </div>
  );
}
