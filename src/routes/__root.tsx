import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  Link,
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
import { SiteChrome } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";
import { SITE_NAME } from "@/data/site";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
      <div className="paper-card max-w-md rotate-[-1deg] p-10 text-center">
        <h1 className="h1-hindi text-6xl" lang="hi">
          खो गए?
        </h1>
        <p className="mt-4">This page doesn't exist — the lane ends here.</p>
        <Link to="/" className="cut-btn mt-6" lang="hi">
          घर चलें
        </Link>
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
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Tiro+Devanagari+Hindi:ital@0;1&display=swap";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_NAME },
      {
        name: "description",
        content: "Aam Zindagi! by Adarsh Anand — read the novel in English or Hindi.",
      },
      { name: "application-name", content: SITE_NAME },
      { name: "apple-mobile-web-app-title", content: SITE_NAME },
      { name: "theme-color", content: "#F8F6F1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS },
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

/** A quiet paper-colored canvas keeps the book artwork in focus. */
function SiteAtmosphere() {
  return <div className="atmosphere" aria-hidden />;
}

function RootComponent() {
  useSwipeNavigation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isReader = pathname.startsWith("/read");
  return (
    <>
      <SiteAtmosphere />
      {!isReader && <SiteChrome />}
      <div id="site-main" className="relative">
        <main className="relative z-[2]">
          <Outlet />
        </main>
        {!isReader && <Footer />}
      </div>
    </>
  );
}
