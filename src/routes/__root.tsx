import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteChrome, ExitScreen, useExitScreen } from "@/components/SiteChrome";
import { BackToTop, ScrollThumb } from "@/components/ScrollAids";
import { NavLink, Preloader, TransitionProvider, usePageTransition } from "@/components/Transition";
import { Footer } from "@/components/Footer";
import { MANDALA, SITE_NAME } from "@/data/site";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div className="paper-card max-w-md rotate-[-1deg] p-10 text-center">
        <h1 className="h1-hindi text-6xl" lang="hi">
          खो गए?
        </h1>
        <p className="mt-4">This page doesn't exist — the lane ends here.</p>
        <NavLink to="/" className="cut-btn mt-6" lang="hi">
          घर चलें
        </NavLink>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="paper-card max-w-md p-10 text-center">
        <h1 className="h1-hindi text-4xl" lang="hi">
          अरे!
        </h1>
        <p className="mt-3">This page didn't load. Try again, or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cut-btn"
          >
            Try again
          </button>
          <a href="/" className="cut-btn cut-btn-alt">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

const FONTS =
  "https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Bagel+Fat+One&family=Bodoni+Moda:ital,wght@0,400..700;1,400..700&family=Bowlby+One&family=Caveat+Brush&family=Chonburi&family=Cormorant+Garamond:ital,wght@0,500;1,500;1,700&family=Eczar:wght@500;800&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Gloock&family=Kalam:wght@400;700&family=Modak&family=Rozha+One&family=Sarpanch:wght@600&family=Teko:wght@500&family=Tiro+Devanagari+Hindi:ital@0;1&family=Yatra+One&display=swap";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      { name: "application-name", content: SITE_NAME },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "theme-color", content: "#FCD2A2" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS },
      { rel: "preload", as: "image", href: MANDALA },
      { rel: "icon", type: "image/png", href: "/assets/logo/qambakht-cup-192.png" },
      { rel: "apple-touch-icon", href: "/assets/logo/qambakht-cup-192.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Site-wide mandala background (fixed layer), mirrored on wide screens, plus paper grain. */
function SiteAtmosphere() {
  return (
    <div className="atmosphere" aria-hidden>
      <div className="mandala-l" style={{ backgroundImage: `url(${MANDALA})` }} />
      <div className="mandala-r" style={{ backgroundImage: `url(${MANDALA})` }} />
      <div className="grain" />
    </div>
  );
}

function RootComponent() {
  return (
    <TransitionProvider>
      <AppFrame />
    </TransitionProvider>
  );
}

function AppFrame() {
  const go = usePageTransition();
  useSwipeNavigation(go);
  const { exit, openFromMenu, arm, tap, dismiss } = useExitScreen();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isReader = pathname.startsWith("/read");
  return (
    <>
      <SiteAtmosphere />
      <Preloader />
      {!isReader && <SiteChrome onExit={openFromMenu} />}
      <div id="site-main" className="relative">
        <main key={pathname} className="page-enter relative z-[2]">
          <Outlet />
        </main>
        {!isReader && <Footer />}
      </div>
      {!isReader && <BackToTop />}
      <ScrollThumb />
      {exit && <ExitScreen armed={exit.armed} onTap={tap} onArm={arm} onStay={dismiss} />}
    </>
  );
}
