import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cable,
  Headphones,
  Laptop,
  Mail,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import a6Product from "@/assets/product-a6-a.jpg";
import s10Product from "@/assets/product-s10pro-a.jpg";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Anyking Help Center" },
      {
        name: "description",
        content:
          "Search Anyking setup guides, compatibility help, cable connection tips, troubleshooting, warranty support, and customer service contact details.",
      },
    ],
  }),
  component: HelpCenterPage,
});

const anchors = [
  { label: "Setup Guide", href: "#featured" },
  { label: "Products", href: "#products" },
  { label: "FAQ Articles", href: "#articles" },
  { label: "Can't find answers?", href: "#support" },
] as const;

const quickLinks = [
  { label: "Setup Guide", href: "#articles", icon: Settings },
  { label: "Troubleshooting", href: "#troubleshooting", icon: Wrench },
  { label: "Warranty & Returns", href: "#warranty-returns", icon: ShieldCheck },
  { label: "Contact Support", href: "#support", icon: Headphones },
] as const;

const featured = [
  {
    title: "Laptop Compatibility",
    body: "Check if your laptop supports direct USB-C video or needs an H5 adapter cable.",
    to: "/compatibility",
    icon: Laptop,
  },
  {
    title: "Cable & Port Guide",
    body: "Understand USB-C, HDMI, USB-A power, and when each cable is required.",
    to: "/compatibility",
    icon: Cable,
  },
] as const;

const products = [
  {
    name: "A6 Portable Monitor",
    image: a6Product,
    to: "/products/a6",
  },
  {
    name: "S10 Pro Extender",
    image: s10Product,
    to: "/products/s10-pro",
  },
] as const;

const faqGroups = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Unbox, connect, and set up your Anyking portable display.",
    articles: [
      {
        question: "What should I check before the first setup?",
        answer:
          "Confirm the monitor, bracket, video cable, and power cable are in the box. Then check your laptop ports. A full-featured USB-C or Thunderbolt port can usually connect directly. HDMI-only or older USB-A laptops usually need HDMI video plus USB power, and some older models may need the H5 adapter cable.",
      },
      {
        question: "How do I connect with one USB-C cable?",
        answer:
          "Use the supplied USB-C cable from a laptop USB-C or Thunderbolt port that supports video output to the Anyking display. If the screen turns on but shows no signal, the port may only support charging/data and you should use HDMI plus USB power instead.",
      },
      {
        question: "How do I connect with HDMI?",
        answer:
          "Plug HDMI from the laptop to the Anyking display for video, then connect USB-C power from the laptop, charger, or USB-A power cable. HDMI carries the picture only, so the display still needs a separate power connection.",
      },
      {
        question: "How do I enable extended display on Windows or Mac?",
        answer:
          "On Windows, open Display Settings and choose Extend these displays. On Mac, open System Settings, choose Displays, then arrange the screens and turn off mirroring if needed.",
      },
      {
        question: "Which devices are compatible?",
        answer:
          "Most modern laptops with Thunderbolt, full-featured USB-C, HDMI, Mini DisplayPort, or DisplayPort can work with Anyking. For model-specific cable advice, use the compatibility checker and search your laptop model.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Fix common signal, display, and power issues quickly.",
    articles: [
      {
        question: "Why does the display show no signal or a black screen?",
        answer:
          "First reconnect the cable firmly, then verify the laptop output supports video. If you are using USB-C and the screen has power but no image, try HDMI plus USB power. If your laptop is an older model without direct video support, use the H5 adapter cable.",
      },
      {
        question: "What should I do if the screen flickers or flashes?",
        answer:
          "Flickering is often caused by unstable power or a low-bandwidth cable. Use the original cable, connect an external charger if needed, lower the refresh rate to 60Hz, and avoid USB hubs during setup.",
      },
      {
        question: "Why are the colors or resolution incorrect?",
        answer:
          "Open your laptop display settings and choose the recommended resolution for the Anyking screen. If colors look washed out, switch the color profile back to default and reconnect the display after saving the setting.",
      },
      {
        question: "Why won't the monitor turn on?",
        answer:
          "Check whether the power cable is connected to a port that can supply enough power. HDMI alone cannot power the monitor. Try a wall charger, another USB-C cable, or another USB-A power source.",
      },
      {
        question: "Why are the USB ports not working?",
        answer:
          "USB hub functions need a data-capable USB connection, not only HDMI. Connect the USB cable between the laptop and display, then reconnect the accessory after the monitor is detected.",
      },
    ],
  },
  {
    id: "warranty-returns",
    title: "Warranty & Returns",
    description: "Warranty coverage, replacements, and return guidance.",
    articles: [
      {
        question: "How long is the warranty?",
        answer:
          "Anyking products include a 12-month warranty for eligible manufacturing defects. Keep your order number and product photos ready so support can verify the case faster.",
      },
      {
        question: "How do I request a replacement?",
        answer:
          "Contact support with your order number, laptop model, connection method, and a short video or photo of the issue. If the problem is caused by laptop port compatibility, support may send the correct H5 adapter cable instead of replacing the full product.",
      },
      {
        question: "What is the return policy?",
        answer:
          "Return eligibility depends on order channel, purchase date, and product condition. Contact support before returning so the team can confirm whether a cable solution, replacement, or return is the best next step.",
      },
      {
        question: "How long does a replacement take?",
        answer:
          "After support confirms the issue and shipping address, replacement timing depends on inventory and local carrier speed. The team will share the next step by email.",
      },
    ],
  },
  {
    id: "account-orders",
    title: "Account & Orders",
    description: "Order tracking, delivery, and shipping address help.",
    articles: [
      {
        question: "How do I track my order?",
        answer:
          "Use the tracking link from your order confirmation email. If you cannot find it, email service@anykingscreen.com with your order number and purchase platform.",
      },
      {
        question: "What if tracking says delivered but I did not receive it?",
        answer:
          "Check your mailbox, front desk, parcel locker, and neighbors first. If the package is still missing, contact the carrier and then send support your order number and tracking screenshot.",
      },
      {
        question: "Can I change my shipping address?",
        answer:
          "Contact support as soon as possible. Address changes can only be made before the order ships. Once shipped, the carrier may need to handle any redirect request.",
      },
    ],
  },
] as const;

const contactCards = [
  {
    title: "Let's chat",
    body: "Use the live chat bubble for fast setup help while you are on the website.",
    href: "#",
    icon: Headphones,
  },
  {
    title: "Call us",
    body: "Prefer to speak with us? Call Anyking support at +1 (888) 688-5025.",
    href: "tel:+18886885025",
    icon: Phone,
  },
  {
    title: "Email us",
    body: "Send details to service@anykingscreen.com and our team will help with the next step.",
    href: "mailto:service@anykingscreen.com",
    icon: Mail,
  },
] as const;

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) {
    return <>{text}</>;
  }
  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-primary/20 text-primary font-semibold rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = document.getElementById("articles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredFaqGroups = React.useMemo(() => {
    if (!searchQuery.trim()) return faqGroups;
    const query = searchQuery.toLowerCase();

    return faqGroups
      .map((group) => {
        const matchingArticles = group.articles.filter(
          (article) =>
            article.question.toLowerCase().includes(query) ||
            article.answer.toLowerCase().includes(query)
        );
        return {
          ...group,
          articles: matchingArticles,
        };
      })
      .filter((group) => group.articles.length > 0);
  }, [searchQuery]);

  React.useEffect(() => {
    const input = document.getElementById("helpSearch");
    if (!input) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== input) return;

      const spans = document.querySelectorAll(".keys-grid span");
      if (spans.length === 0) return;

      // Remove active class from any previously highlighted keys
      spans.forEach((span) => span.classList.remove("active"));

      if (e.key === " ") {
        const spacebar = document.querySelector(".keys-grid .spacebar");
        if (spacebar) spacebar.classList.add("active");
      } else {
        // Highlight a random letter key index
        const letterIndices = [
          // row 2
          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
          // row 3
          27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
          // row 4
          40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        ];
        const randomIndex = letterIndices[Math.floor(Math.random() * letterIndices.length)];
        if (spans[randomIndex]) {
          spans[randomIndex].classList.add("active");
        }
      }
    };

    const handleKeyUp = () => {
      const spans = document.querySelectorAll(".keys-grid span");
      spans.forEach((span) => span.classList.remove("active"));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <SiteLayout>
      {/* ===== 3D Triple-Screen Hero ===== */}
      <section className="triple-screen-hero-container">
        {/* Title above the device */}
        <div className="hero-title-area">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-amber-300">Welcome to ANYKING Help Center</h1>
          <p className="text-muted-foreground">We've got you covered for every connection question.</p>
        </div>

        {/* 3D Device */}
        <div className="triple-screen-device">
          {/* Metal bracket behind screens */}
          <div className="extender-bracket" />

          {/* Left screen: macOS Display Connection Assistant */}
          <div className="extender-monitor left-monitor">
            <div className="monitor-hinge hinge-left" />
            <div className="screen-bezel side-bezel">
              <div className="screen-display side-display">
                <div className="screen-gloss" />
                <div className="screen-content side-screen-content">
                  <div className="mac-window">
                    <div className="mac-titlebar">
                      <div className="mac-dots">
                        <span className="mac-dot red" />
                        <span className="mac-dot yellow" />
                        <span className="mac-dot green" />
                      </div>
                      <span className="mac-title">Connection.app</span>
                    </div>
                    <div className="mac-body">
                      <div className="mac-sidebar">
                        <div className="sidebar-item active">Overview</div>
                        <div className="sidebar-item">USB-C Guide</div>
                        <div className="sidebar-item">HDMI Guide</div>
                      </div>
                      <div className="mac-content">
                        <div>
                          <h4>No Display Signal?</h4>
                          <p>
                            If your screen stays black or shows "No Signal", check your port features.
                          </p>
                        </div>
                        <a href="#articles" className="mac-action-btn">
                          View guides
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="extender-cable left-cable" />
          </div>

          {/* Center screen: Apple Spotlight-style Search */}
          <div className="extender-monitor center-monitor">
            <div className="screen-bezel laptop-screen-bezel">
              <div className="camera-notch" />
              <div className="screen-display center-display">
                <div className="screen-gloss" />
                <div className="screen-content center-screen-content">
                  <div className="search-glass-panel search-only-panel">
                    <div className="search-copy">
                      <p className="search-copy-kicker">Help Center</p>
                      <h2>Search connection guides</h2>
                    </div>
                    <form className="help-search-spotlight" onSubmit={handleSearchSubmit}>
                      <Search className="spotlight-search-icon" />
                      <input
                        id="helpSearch"
                        type="search"
                        placeholder="Search connection guides..."
                        className="help-search-input-spotlight"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <span className="spotlight-shortcut">↵ Enter</span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right screen: macOS Compatibility Diagnostics */}
          <div className="extender-monitor right-monitor">
            <div className="monitor-hinge hinge-right" />
            <div className="screen-bezel side-bezel">
              <div className="screen-display side-display">
                <div className="screen-gloss" />
                <div className="screen-content side-screen-content">
                  <div className="mac-window">
                    <div className="mac-titlebar">
                      <div className="mac-dots">
                        <span className="mac-dot red" />
                        <span className="mac-dot yellow" />
                        <span className="mac-dot green" />
                      </div>
                      <span className="mac-title">Diagnostics.app</span>
                    </div>
                    <div className="mac-body">
                      <div className="mac-sidebar">
                        <div className="sidebar-item active">Hardware</div>
                        <div className="sidebar-item">Ports</div>
                        <div className="sidebar-item">Adapter</div>
                      </div>
                      <div className="mac-content">
                        <div>
                          <h4>Device Checker</h4>
                          <p>
                            Verify if your laptop model supports direct USB-C or requires an H5 adapter.
                          </p>
                        </div>
                        <a href="/compatibility" className="mac-action-btn">
                          Check model
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="extender-cable right-cable" />
          </div>

          {/* Laptop base (keyboard deck) */}
          <div className="laptop-base">
            <div className="keyboard-area">
              <div className="keys-grid">
                <div className="key-row row-1"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="key-row row-2"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="key-row row-3"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="key-row row-4"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="key-row row-5"><span></span><span></span><span></span><span className="spacebar"></span><span></span><span></span><span></span></div>
              </div>
            </div>
            <div className="trackpad"></div>
          </div>
        </div>

        {/* Ambient shadow */}
        <div className="device-shadow-reflection" />

        {/* Nav links below device */}
        <nav className="hero-nav-links">
          <a href="/">About ANYKING</a>
          <span className="nav-divider"></span>
          <a href="/products">Products</a>
          <span className="nav-divider"></span>
          <a href="#articles">Learn &amp; Explore</a>
          <span className="nav-divider"></span>
          <a href="#support">Can't find answers?</a>
        </nav>
      </section>

      {/* Sticky anchor nav */}
      <nav className="sticky top-16 z-30 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-10 h-14">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-2">
            {anchors.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap border-b-2 border-transparent px-3 py-4 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
          {/* Quick search input in sticky nav */}
          <div className="relative hidden sm:block w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-border/50 bg-white/5 py-1.5 pl-9 pr-8 text-xs text-foreground placeholder-muted-foreground/60 focus:border-primary focus:bg-white/10 focus:outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 h-4 w-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </nav>

      <section id="featured" className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map(({ title, body, to, icon: Icon }) => (
            <Link
              key={title}
              to={to}
              className="group min-h-[170px] overflow-hidden rounded-xl border border-border/40 bg-card/60 p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-card/85 hover:border-border/80 hover:shadow-xl backdrop-blur-sm"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Icon className="h-7 w-7 text-primary" />
                  <h2 className="mt-5 text-2xl font-bold text-foreground">{title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{body}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="products" className="border-y border-border/30 bg-secondary/15 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">Products</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Portable Monitors", "Laptop Extenders", "Compatibility"].map((item, index) => (
              <a
                key={item}
                href={index === 2 ? "/compatibility" : "#products"}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  index === 0
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/50 bg-card/85 text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.name}
                to={product.to}
                className="group overflow-hidden rounded-xl border border-border/40 bg-card/60 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-card/85 hover:border-border/80 hover:shadow-xl backdrop-blur-sm"
              >
                <div className="aspect-[16/10] p-4 bg-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="px-5 py-5">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ Articles</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">Learn & Explore</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Follow the most common support paths first. Each answer includes the next step if your laptop needs a
            different cable or adapter.
          </p>
          {searchQuery && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary font-medium">
              Showing search results for "{searchQuery}"
              <button onClick={() => setSearchQuery("")} className="ml-1 transition hover:text-primary/80">✕</button>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {filteredFaqGroups.length > 0 ? (
            filteredFaqGroups.map(({ id, title, description, articles }) => (
              <article id={id} key={title} className="rounded-xl border border-border/40 bg-card/65 p-6 shadow-sm backdrop-blur-sm">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
                <Accordion type="single" collapsible className="mt-5 divide-y divide-border/20">
                  {articles.map((article, index) => (
                    <AccordionItem
                      key={article.question}
                      value={`${id}-${index}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground/90 hover:text-primary hover:no-underline">
                        <HighlightText text={article.question} highlight={searchQuery} />
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">
                        <p>
                          <HighlightText text={article.answer} highlight={searchQuery} />
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/20 pt-4">
                          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
                            Was this helpful?
                          </span>
                          <button
                            type="button"
                            className="rounded-full border border-border/50 bg-white/5 px-4 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className="rounded-full border border-border/50 bg-white/5 px-4 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                          >
                            No
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-border/40 bg-card/60 p-12 text-center backdrop-blur-md">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-bold text-foreground">No matches found</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                We couldn't find any articles matching "{searchQuery}". Try using different keywords or scroll down to get direct support.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Clear search query
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="support" className="border-t border-border/30 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="text-center">
            <Headphones className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-5 text-3xl font-bold text-foreground md:text-4xl">Can't find answers?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              We are here to help at any time. Choose your preferred method to contact us.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(({ title, body, href, icon: Icon }) => (
              <a
                key={title}
                href={href}
                className="flex flex-col justify-between rounded-xl border border-border/60 bg-card/85 p-6 shadow-sm transition duration-300 hover:border-primary/50 hover:bg-card"
              >
                <div>
                  <Icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                </div>
              </a>
            ))}

            {/* QR Code Quick Support Card */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-border/60 bg-card/85 p-6 text-center shadow-sm">
              <div className="w-full flex flex-col items-center">
                <img
                  src="/help-center-qr.png"
                  alt="Support QR Code"
                  className="w-24 h-24 bg-white p-1 rounded-lg shadow-lg"
                />
                <h3 className="mt-4 text-lg font-bold text-foreground">Scan for Support</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Scan to load mobile connection guides and chat directly on WhatsApp/WeChat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
