import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cable,
  ChevronRight,
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
import { helpCenterArticles } from "@/data/helpCenterArticles";
import mobileCompatibilityCard from "@/assets/mobile-compatibility-card.jpg";
import mobileSetupCard from "@/assets/mobile-setup-card.jpg";
import mobileBuyingGuideBanner from "@/assets/s10pro-aplus-ecosystem.jpg";

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

const products = helpCenterArticles.map((article) => ({
  name: article.shortName,
  image: article.image,
  slug: article.slug,
})) as const;

const mobileProductGroups = [
  {
    title: "Portable Monitor Guides",
    items: products,
  },
  {
    title: "Connection Help",
    items: [
      {
        name: "Laptop Compatibility",
        image: products[0]?.image,
        slug: "compatibility",
        href: "/compatibility",
      },
      {
        name: "Cable & Port Guide",
        image: products[1]?.image ?? products[0]?.image,
        slug: "cable-guide",
        href: "/compatibility",
      },
    ],
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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactCards = [
  {
    title: "WhatsApp",
    body: "+1 (657) 395-7180. Message us directly on WhatsApp.",
    href: "https://wa.me/16573957180",
    icon: WhatsAppIcon,
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

type HelpSearchResult = {
  title: string;
  description: string;
  href: string;
  type: "FAQ" | "A6 Guide" | "S10 Pro Guide" | "Compatibility" | "Support";
  keywords: string;
  body: string;
};

type RankedHelpSearchResult = HelpSearchResult & {
  score: number;
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSearchTerms(value: string) {
  return value
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function normalizeSearchText(value: string) {
  return value.toLowerCase();
}

function getArticleResultType(shortName: string): HelpSearchResult["type"] {
  return shortName.toLowerCase().includes("a6") ? "A6 Guide" : "S10 Pro Guide";
}

function buildHelpSearchIndex(): HelpSearchResult[] {
  const faqEntries = faqGroups.flatMap((group) =>
    group.articles.map((article) => ({
      title: article.question,
      description: article.answer,
      href: "/help-center#articles",
      type: "FAQ" as const,
      keywords: `${group.title} ${group.description}`,
      body: `${article.question} ${article.answer}`,
    }))
  );

  const productEntries = helpCenterArticles.flatMap((article) => {
    const type = getArticleResultType(article.shortName);
    const baseKeywords = `${article.name} ${article.shortName} ${article.asin}`;

    return [
      {
        title: `${article.shortName}: design and setup overview`,
        description: article.overview.designSummary,
        href: `/help-articles/${article.slug}#design-look`,
        type,
        keywords: `${baseKeywords} product overview design look setup`,
        body: `${article.heroTitle} ${article.heroBody} ${article.overview.designSummary}`,
      },
      {
        title: `${article.shortName}: key highlights`,
        description: article.overview.highlights.join(" "),
        href: `/help-articles/${article.slug}#key-highlights`,
        type,
        keywords: `${baseKeywords} highlights MacBook USB-C HDMI H5 adapter no signal flicker`,
        body: article.overview.highlights.join(" "),
      },
      {
        title: `${article.shortName}: specifications`,
        description: article.specifications.map((spec) => `${spec.label}: ${spec.value}`).join(" "),
        href: `/help-articles/${article.slug}#specs`,
        type,
        keywords: `${baseKeywords} specs specification screen size resolution refresh rate warranty`,
        body: article.specifications.map((spec) => `${spec.label} ${spec.value}`).join(" "),
      },
      {
        title: `${article.shortName}: accessories and compatibility`,
        description: [...article.compatibility, ...article.setup.compatibilityNotes].join(" "),
        href: `/help-articles/${article.slug}#compatibility-accessories`,
        type,
        keywords: `${baseKeywords} compatibility accessories MacBook Apple silicon USB-C HDMI H5 adapter`,
        body: [
          ...article.compatibility,
          ...article.connectionMethods,
          article.setup.tutorialBody,
          ...article.setup.accessories,
          ...article.setup.compatibilityNotes,
          ...article.reminders,
        ].join(" "),
      },
      {
        title: `${article.shortName}: downloads and support`,
        description: article.downloads.note,
        href: `/help-articles/${article.slug}#user-manual`,
        type,
        keywords: `${baseKeywords} manual firmware download support warranty`,
        body: `${article.downloads.manual.label} ${article.downloads.firmware.label} ${article.downloads.note} ${article.support.email} ${article.support.phone}`,
      },
      ...article.sections.flatMap((section, sectionIndex) =>
        section.items.map((item) => ({
          title: `${article.shortName}: ${item.question}`,
          description: item.answer,
          href: `/help-articles/${article.slug}#faq-${sectionIndex + 1}`,
          type,
          keywords: `${baseKeywords} ${section.title}`,
          body: `${item.question} ${item.answer}`,
        }))
      ),
    ];
  });

  return [
    ...faqEntries,
    ...productEntries,
    {
      title: "Compatibility checker",
      description: "Check whether your laptop supports direct USB-C video, HDMI, or an H5 adapter workflow.",
      href: "/compatibility",
      type: "Compatibility",
      keywords: "compatibility laptop model MacBook Windows Chromebook USB-C HDMI H5 adapter port checker",
      body: "Laptop compatibility checker for Anyking portable monitors and triple screen extenders.",
    },
    {
      title: "Contact Anyking support",
      description: "Get direct help by live chat, phone, or email when setup troubleshooting does not solve the issue.",
      href: "/help-center#support",
      type: "Support",
      keywords: "support contact service email phone warranty replacement return chat help",
      body: contactCards.map((card) => `${card.title} ${card.body} ${card.href}`).join(" "),
    },
  ];
}

const helpSearchIndex = buildHelpSearchIndex();

function scoreSearchResult(result: HelpSearchResult, terms: string[]) {
  const title = normalizeSearchText(result.title);
  const description = normalizeSearchText(result.description);
  const keywords = normalizeSearchText(result.keywords);
  const body = normalizeSearchText(result.body);
  const haystack = `${title} ${description} ${keywords} ${body}`;

  if (!terms.every((term) => haystack.includes(term))) {
    return 0;
  }

  return terms.reduce((score, term) => {
    let nextScore = score;
    if (title.includes(term)) nextScore += 12;
    if (keywords.includes(term)) nextScore += 8;
    if (description.includes(term)) nextScore += 5;
    if (body.includes(term)) nextScore += 2;
    return nextScore;
  }, 0);
}

function getHelpSearchResults(query: string) {
  const terms = getSearchTerms(query);
  if (terms.length === 0) return [];

  return helpSearchIndex
    .map((result) => ({ ...result, score: scoreSearchResult(result, terms) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 5);
}

function openSmartSupport() {
  const chatHost = document.getElementById("nextop-chat");
  const chatFrame = document.querySelector<HTMLIFrameElement>('iframe[title="nextop live chat"]');
  const clickable = chatHost?.querySelector<HTMLElement>(
    'button, [role="button"], a, iframe, [class*="bubble"], [class*="launcher"], [class*="chat"]'
  );

  clickable?.click();
  chatHost?.click();
  chatFrame?.click();

  if (!chatHost && !chatFrame) {
    document.getElementById("support")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  const terms = getSearchTerms(highlight);
  if (terms.length === 0) {
    return <>{text}</>;
  }
  const regex = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        terms.includes(part.toLowerCase()) ? (
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

function HelpSearchResultsPanel({
  query,
  results,
  activeIndex,
  onSelect,
  onAskSupport,
  compact = false,
}: {
  query: string;
  results: RankedHelpSearchResult[];
  activeIndex: number;
  onSelect: (result: RankedHelpSearchResult) => void;
  onAskSupport: () => void;
  compact?: boolean;
}) {
  if (!query.trim()) return null;

  return (
    <div className={`help-search-results ${compact ? "help-search-results-compact" : ""}`} role="listbox">
      {results.length > 0 ? (
        results.map((result, index) => (
          <button
            key={`${result.href}-${result.title}`}
            type="button"
            role="option"
            aria-selected={activeIndex === index}
            className={`help-search-result ${activeIndex === index ? "is-active" : ""}`}
            onMouseDown={(event) => {
              event.preventDefault();
              onSelect(result);
            }}
          >
            <span className="help-search-result-type">{result.type}</span>
            <span className="help-search-result-title">
              <HighlightText text={result.title} highlight={query} />
            </span>
            <span className="help-search-result-description">
              <HighlightText text={result.description} highlight={query} />
            </span>
          </button>
        ))
      ) : (
        <div className="help-search-empty">
          <span>No exact matches</span>
          <p>Try keywords like USB-C, HDMI, no signal, MacBook, H5 adapter.</p>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={onAskSupport}>
            Ask smart support
          </button>
        </div>
      )}
    </div>
  );
}

function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeSearchSurface, setActiveSearchSurface] = React.useState<"hero" | "sticky" | null>(null);
  const [activeSearchIndex, setActiveSearchIndex] = React.useState(0);
  const [activeMobileTab, setActiveMobileTab] = React.useState("about");

  const scrollToMobileSection = React.useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 110; // header height (64px) + sticky mobile tabs bar (~46px)
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (!isMobile) return;

      const sections = [
        { id: "mobile-about", name: "about" },
        { id: "mobile-products", name: "products" },
        { id: "mobile-learn", name: "learn" },
      ];

      const scrollPos = window.scrollY + 130; // buffer offset to highlight tab slightly earlier

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveMobileTab(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchResults = React.useMemo(() => getHelpSearchResults(searchQuery), [searchQuery]);
  const selectedSearchResult = searchResults[activeSearchIndex] ?? searchResults[0];

  const openResult = React.useCallback((result: RankedHelpSearchResult) => {
    setActiveSearchSurface(null);

    if (result.href.startsWith("/help-center#")) {
      const hash = result.href.split("#")[1];
      const mobileHashMap: Record<string, string> = {
        featured: "mobile-about",
        products: "mobile-products",
        articles: "mobile-learn",
        support: "mobile-support",
      };
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const targetId = hash && isMobile ? mobileHashMap[hash] ?? hash : hash;
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    window.location.href = result.href;
  }, []);

  const handleAskSmartSupport = React.useCallback(() => {
    setActiveSearchSurface(null);
    openSmartSupport();
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedSearchResult) {
      openResult(selectedSearchResult);
      return;
    }

    const el = document.getElementById("articles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSearchIndex((current) =>
        searchResults.length === 0 ? 0 : (current + 1) % searchResults.length
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSearchIndex((current) =>
        searchResults.length === 0 ? 0 : (current - 1 + searchResults.length) % searchResults.length
      );
      return;
    }

    if (event.key === "Enter" && selectedSearchResult) {
      event.preventDefault();
      openResult(selectedSearchResult);
      return;
    }

    if (event.key === "Escape") {
      setActiveSearchSurface(null);
    }
  };

  const updateSearchQuery = (value: string, surface: "hero" | "sticky") => {
    setSearchQuery(value);
    setActiveSearchIndex(0);
    setActiveSearchSurface(value.trim() ? surface : null);
  };

  const filteredFaqGroups = React.useMemo(() => {
    if (!searchQuery.trim()) return faqGroups;
    const terms = getSearchTerms(searchQuery);

    return faqGroups
      .map((group) => {
        const matchingArticles = group.articles.filter(
          (article) => {
            const content = normalizeSearchText(`${article.question} ${article.answer} ${group.title}`);
            return terms.every((term) => content.includes(term));
          }
        );
        return {
          ...group,
          articles: matchingArticles,
        };
      })
      .filter((group) => group.articles.length > 0);
  }, [searchQuery]);

  React.useEffect(() => {
    setActiveSearchIndex(0);
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
      <div className="help-mobile-only bg-[#f7f8fb] text-slate-950">
        <section className="px-5 pb-7 pt-8 text-center">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-primary" />
          <h1 className="text-[1.65rem] font-extrabold leading-tight tracking-tight">
            Welcome to ANYKING
            <br />
            Help Center
          </h1>
          <p className="mx-auto mt-3 max-w-[18rem] text-xs leading-5 text-slate-500">
            We've got you covered. Type a keyword to find setup guides, product help, or compatibility answers.
          </p>
          <form className="relative mx-auto mt-5 max-w-sm" onSubmit={handleSearchSubmit}>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Ask us anything..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value, "hero")}
              onFocus={() => setActiveSearchSurface(searchQuery.trim() ? "hero" : null)}
              onKeyDown={handleSearchKeyDown}
              className="h-11 w-full rounded-full border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveSearchSurface(null);
                }}
                className="absolute right-3.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 text-[10px]"
                aria-label="Clear search"
              >
                ✕
              </button>
            ) : (
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-sm"
                aria-label="Search help"
              >
                <Search className="h-4 w-4" />
              </button>
            )}
            {activeSearchSurface === "hero" && (
              <HelpSearchResultsPanel
                query={searchQuery}
                results={searchResults}
                activeIndex={activeSearchIndex}
                onSelect={openResult}
                onAskSupport={handleAskSmartSupport}
                compact
              />
            )}
          </form>
        </section>

        <nav className="sticky top-16 z-30 border-y border-slate-200 bg-white/95 px-5 backdrop-blur">
          <div className="flex items-center gap-7 overflow-x-auto py-3 text-xs font-bold scrollbar-none">
            <a
              className={`shrink-0 pb-1.5 transition-colors ${
                activeMobileTab === "about"
                  ? "border-b-2 border-primary text-slate-950"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              href="#mobile-about"
              onClick={(e) => {
                e.preventDefault();
                scrollToMobileSection("mobile-about");
              }}
            >
              About ANYKING
            </a>
            <a
              className={`shrink-0 pb-1.5 transition-colors ${
                activeMobileTab === "products"
                  ? "border-b-2 border-primary text-slate-950"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              href="#mobile-products"
              onClick={(e) => {
                e.preventDefault();
                scrollToMobileSection("mobile-products");
              }}
            >
              Products
            </a>
            <a
              className={`shrink-0 pb-1.5 transition-colors ${
                activeMobileTab === "learn"
                  ? "border-b-2 border-primary text-slate-950"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              href="#mobile-learn"
              onClick={(e) => {
                e.preventDefault();
                scrollToMobileSection("mobile-learn");
              }}
            >
              Learn & Explore
            </a>
          </div>
        </nav>

        <section id="mobile-about" className="px-4 py-7">
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/compatibility"
              className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 h-full"
            >
              <div className="aspect-[1.12] bg-gradient-to-br from-orange-50 to-white p-3 flex items-center justify-center">
                <img src={mobileCompatibilityCard} alt="Laptop compatibility guide" className="h-full w-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col justify-between px-3 pb-4 pt-2.5">
                <h2 className="text-sm font-extrabold leading-tight text-slate-900">Compatibility</h2>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
            <a
              href="#mobile-learn"
              className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 h-full"
              onClick={(e) => {
                e.preventDefault();
                scrollToMobileSection("mobile-learn");
              }}
            >
              <div className="aspect-[1.12] bg-gradient-to-br from-red-50 to-white p-3 flex items-center justify-center">
                <img src={mobileSetupCard} alt="Setup and support guide" className="h-full w-full object-contain" />
              </div>
              <div className="flex-1 flex flex-col justify-between px-3 pb-4 pt-2.5">
                <h2 className="text-sm font-extrabold leading-tight text-slate-900">Setup & Support</h2>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </a>
          </div>
        </section>

        <section id="mobile-products" className="bg-white px-4 py-9">
          <h2 className="text-center text-2xl font-extrabold tracking-tight">Products</h2>
          <div className="mt-6 space-y-3">
            {mobileProductGroups.map((group, groupIndex) => (
              <details
                key={group.title}
                open={groupIndex === 0}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f8fb]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-sm font-extrabold">
                  {group.title}
                  <span className="details-chevron text-slate-400">⌄</span>
                </summary>
                <div className="divide-y divide-white">
                  {group.items.map((product) => {
                    const isPlaceholder = ["s15-plus-extender", "f4-extender", "m5-extender", "s12-extender", "s13-extender", "z3-extender"].includes(product.slug);
                    return "href" in product ? (
                      <a
                        key={product.slug}
                        href={product.href}
                        className="flex items-center gap-4 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors"
                      >
                        <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/50 text-slate-400">
                          {isPlaceholder ? (
                            <Laptop className="h-6 w-6 stroke-[1.5]" />
                          ) : (
                            <img src={product.image} alt={product.name} className="h-14 w-16 object-contain" />
                          )}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">{product.name}</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-slate-400 shrink-0" />
                      </a>
                    ) : (
                      <Link
                        key={product.slug}
                        to="/help-articles/$article"
                        params={{ article: product.slug }}
                        className="flex items-center gap-4 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition-colors"
                      >
                        <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200/50 text-slate-400">
                          {isPlaceholder ? (
                            <Laptop className="h-6 w-6 stroke-[1.5]" />
                          ) : (
                            <img src={product.image} alt={product.name} className="h-14 w-16 object-contain" />
                          )}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">{product.name}</span>
                        <ChevronRight className="ml-auto h-4 w-4 text-slate-400 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="mobile-learn" className="px-4 py-10">
          <h2 className="text-center text-2xl font-extrabold tracking-tight">Learn & Explore</h2>
          <a
            href="#mobile-products"
            onClick={(e) => {
              e.preventDefault();
              scrollToMobileSection("mobile-products");
            }}
            className="mt-6 block overflow-hidden rounded-2xl bg-slate-950 shadow-lg cursor-pointer"
          >
            <div className="relative min-h-[170px] p-5 text-white flex items-center">
              <div className="absolute inset-0">
                <img src={mobileBuyingGuideBanner} alt="Choose the right Anyking display" className="h-full w-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Buying Guide</p>
                <h3 className="mt-2 max-w-[13rem] text-xl font-black leading-tight">
                  Choose the Right ANYKING Display
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold">
                  Start Guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </a>
        </section>

        <section id="mobile-support" className="bg-white px-4 py-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Headphones className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold">Can't find answers?</h2>
            <p className="mx-auto mt-3 max-w-xs text-xs leading-5 text-slate-500">
              We are here to help at any time. Choose your preferred method to contact us.
            </p>
          </div>
          <div className="mt-6 space-y-3">
            {contactCards.map(({ title, body, href, icon: Icon }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-sm font-extrabold">{title}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{body}</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>

      {/* ===== 3D Triple-Screen Hero ===== */}
      <section className="triple-screen-hero-container help-desktop-only">
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
                        onChange={(e) => updateSearchQuery(e.target.value, "hero")}
                        onFocus={() => setActiveSearchSurface(searchQuery.trim() ? "hero" : null)}
                        onKeyDown={handleSearchKeyDown}
                      />
                      <span className="spotlight-shortcut">↵ Enter</span>
                    </form>
                    {activeSearchSurface === "hero" && (
                      <HelpSearchResultsPanel
                        query={searchQuery}
                        results={searchResults}
                        activeIndex={activeSearchIndex}
                        onSelect={openResult}
                        onAskSupport={handleAskSmartSupport}
                      />
                    )}
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

      </section>

      {/* Sticky anchor nav */}
      <nav className="help-desktop-only sticky top-16 z-30 border-b border-border/40 bg-background/85 backdrop-blur-xl">
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
          <form className="relative hidden sm:block w-72" onSubmit={handleSearchSubmit}>
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search help..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value, "sticky")}
              onFocus={() => setActiveSearchSurface(searchQuery.trim() ? "sticky" : null)}
              onKeyDown={handleSearchKeyDown}
              className="w-full rounded-full border border-border/50 bg-white/5 py-1.5 pl-9 pr-8 text-xs text-foreground placeholder-muted-foreground/60 focus:border-primary focus:bg-white/10 focus:outline-none transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveSearchSurface(null);
                }}
                className="absolute right-2.5 top-2.5 h-4 w-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            )}
            {activeSearchSurface === "sticky" && (
              <HelpSearchResultsPanel
                query={searchQuery}
                results={searchResults}
                activeIndex={activeSearchIndex}
                onSelect={openResult}
                onAskSupport={handleAskSmartSupport}
                compact
              />
            )}
          </form>
        </div>
      </nav>

      <section id="featured" className="help-desktop-only mx-auto max-w-7xl px-5 py-14 lg:px-10">
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

      <section id="products" className="help-desktop-only border-y border-border/30 bg-secondary/15 backdrop-blur-sm">
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
            {products.map((product) => {
              const isPlaceholder = ["s15-plus-extender", "f4-extender", "m5-extender", "s12-extender", "s13-extender", "z3-extender"].includes(product.slug);
              return (
                <Link
                  key={product.name}
                  to="/help-articles/$article"
                  params={{ article: product.slug }}
                  className="group overflow-hidden rounded-xl border border-border/40 bg-card/60 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-card/85 hover:border-border/80 hover:shadow-xl backdrop-blur-sm"
                >
                  {!isPlaceholder && (
                    <div className="aspect-[16/10] p-4 bg-white/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className="px-5 py-5">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="articles" className="help-desktop-only mx-auto max-w-7xl px-5 py-16 lg:px-10">
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
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveSearchSurface(null);
                }}
                className="ml-1 transition hover:text-primary/80"
              >
                ✕
              </button>
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
              <Headphones className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-foreground">Ask our smart support</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                We couldn't find an article for "{searchQuery}". Open the smart customer service chat and share your laptop model, product model, and connection method.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleAskSmartSupport}
                  className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  Ask smart support
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveSearchSurface(null);
                  }}
                  className="rounded-full border border-border/60 bg-card px-5 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                >
                  Clear search query
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="support" className="help-desktop-only border-t border-border/30 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="text-center">
            <Headphones className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-5 text-3xl font-bold text-foreground md:text-4xl">Can't find answers?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              We are here to help at any time. Choose your preferred method to contact us.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {contactCards.map(({ title, body, href, icon: Icon }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col justify-between rounded-xl border border-border/60 bg-card/85 p-6 shadow-sm transition duration-300 hover:border-primary/50 hover:bg-card"
              >
                <div>
                  <Icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
