import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { IntroScreen } from "@/components/IntroScreen";
import { arts } from "@/data/site";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-tan">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-tan">Page not found</h2>
        <p className="mt-2 text-sm text-tan-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold text-sm">
            Go home
          </Link>
        </div>
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-tan">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-tan-muted">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold text-sm"
          >
            Try again
          </button>
          <a href="/" className="btn-outline text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Qambakht — Stories that stay with you" },
      { name: "description", content: "Qambakht — a warm little corner of the internet for Aam Zindagi! and stories by Adarsh Anand, free to read in English and Hindi." },
      { name: "theme-color", content: "#151210" },
      { property: "og:title", content: "Qambakht — Stories that stay with you" },
      { property: "og:description", content: "Read Aam Zindagi! free in English and Hindi. Stories that hold the essence of Premchand and the wit of Parsai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Manrope:wght@300..800&family=Tiro+Devanagari+Hindi&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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

/**
 * The site-wide atmosphere: a faint damask wallpaper blended with a soft
 * mandala bloom, plus the regal carpet tapestry running down the left edge.
 * Sits behind every page; pages must be positioned (relative) to paint above.
 */
function SiteAtmosphere() {
  return (
    <div aria-hidden="true" className="site-atmosphere">
      <div
        className="site-atmosphere-damask"
        style={{ backgroundImage: `url(${arts.damask})` }}
      />
      <div
        className="site-atmosphere-mandala"
        style={{ backgroundImage: `url(${arts.mandala})` }}
      />
      <div
        className="site-carpet-border"
        style={{ backgroundImage: `url(${arts.carpet})` }}
      />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useSwipeNavigation();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteAtmosphere />
      {/* On wide screens the content steps aside for the carpet border. */}
      <div className="relative md:pl-20 xl:pl-28">
        <IntroScreen />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
