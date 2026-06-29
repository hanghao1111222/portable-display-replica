import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { LangProvider } from "@/i18n/LangContext";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { siteTheme, siteThemeClassName } from "@/config/site-theme";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
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
      { title: "Anyking — Premium portable USB-C monitors" },
      { name: "description", content: "Ultra-portable USB-C monitors for productivity, gaming and travel. Free worldwide shipping, 30-day returns, 2-year warranty." },
      { property: "og:title", content: "Anyking" },
      { property: "og:description", content: "Ultra-portable USB-C monitors trusted by 800,000+ remote workers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={siteThemeClassName}>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d, w, c) {
    w.NextopLiveChatID = 'LIVECHAT:1692178196559:818246814692110336';
    w[c] = w[c] || function() {
        (w[c].q = w[c].q || []).push(arguments);
    };
    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://livechat.nextop.com/nextop-im-sdk.min.js';
    if (d.head) d.head.appendChild(s);
})(document, window, 'NextopLiveChat');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  function revealNextopChat() {
    var host = document.getElementById('nextop-chat');
    if (host) {
      host.style.setProperty('visibility', 'visible', 'important');
      host.style.setProperty('display', 'block', 'important');
      host.style.setProperty('opacity', '1', 'important');
    }

    var frame = document.querySelector('iframe[title="nextop live chat"]');
    if (frame) {
      frame.style.setProperty('visibility', 'visible', 'important');
      frame.style.setProperty('display', 'block', 'important');
      frame.style.setProperty('opacity', '1', 'important');
    }
  }

  function startWatching() {
    revealNextopChat();
    var timerOne = window.setTimeout(revealNextopChat, 1000);
    var timerTwo = window.setTimeout(revealNextopChat, 3000);
    var observer = new MutationObserver(revealNextopChat);
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

    window.addEventListener('beforeunload', function () {
      window.clearTimeout(timerOne);
      window.clearTimeout(timerTwo);
      observer.disconnect();
    });
  }

  if (document.readyState === 'complete') {
    startWatching();
  } else {
    window.addEventListener('load', startWatching, { once: true });
  }
})();`,
          }}
        />
      </head>
      <body className={siteThemeClassName}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <CartProvider>
          <Outlet />
          <CartDrawer />
          <Toaster theme={siteTheme} position="bottom-right" />
          <Analytics />
          <SpeedInsights />
        </CartProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}
