import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cable,
  FileText,
  Headphones,
  Laptop,
  Mail,
  Monitor,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import a6Product from "@/assets/product-a6-a.jpg";
import s10Product from "@/assets/product-s10pro-a.jpg";
import cableGuide from "@/assets/anyking-cable-guide.png";

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
  { label: "About Anyking", href: "#featured" },
  { label: "Products", href: "#products" },
  { label: "Learn & Explore", href: "#articles" },
  { label: "Can't find answers?", href: "#support" },
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
  {
    name: "Cable Setup Guide",
    image: cableGuide,
    to: "/compatibility",
  },
] as const;

const articleGroups = [
  {
    title: "Setup & Connection",
    icon: Settings,
    articles: [
      "How to connect with one USB-C cable",
      "How to connect with HDMI and USB power",
      "How to confirm DisplayPort Alt Mode",
      "How to connect older laptop models with H5",
    ],
  },
  {
    title: "Troubleshooting",
    icon: Wrench,
    articles: [
      "No signal or black screen",
      "Screen flickers after connecting",
      "Only duplicate mode appears",
      "Laptop does not recognize the monitor",
    ],
  },
  {
    title: "Policies & Support",
    icon: ShieldCheck,
    articles: [
      "Warranty support",
      "Return and refund help",
      "Shipping questions",
      "Contact customer service",
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

function HelpCenterPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f7f8fb]">
        <div className="pointer-events-none absolute -left-28 top-20 hidden h-72 w-72 rotate-[-18deg] rounded-[42px] border border-slate-200 bg-white/70 shadow-2xl shadow-slate-200/80 lg:block">
          <Monitor className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 text-slate-300" />
        </div>
        <div className="pointer-events-none absolute -right-24 bottom-16 hidden h-64 w-64 rotate-[22deg] rounded-full border border-slate-200 bg-white/70 shadow-2xl shadow-slate-200/80 lg:block">
          <Cable className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-slate-300" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-10 lg:py-28">
          <p className="text-sm font-medium text-slate-500">Anyking Help Center</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            Welcome to Anyking Help Center
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500 md:text-lg">
            We've got you covered. Type a keyword to find answers or explore our knowledge base.
          </p>

          <form
            className="mx-auto mt-10 flex max-w-2xl overflow-hidden rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-200/70"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor="help-search">
              Search help articles
            </label>
            <div className="flex flex-1 items-center gap-3 px-6">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                id="help-search"
                type="search"
                placeholder="Ask us anything..."
                className="h-14 min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-14 shrink-0 items-center gap-2 bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:px-8"
            >
              Search
              <Search className="hidden h-4 w-4 sm:block" />
            </button>
          </form>
        </div>
      </section>

      <nav className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-start gap-3 overflow-x-auto px-5 md:justify-center lg:px-10">
          {anchors.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap border-b-2 border-transparent px-4 py-5 text-sm font-semibold text-slate-500 transition hover:border-primary hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="featured" className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map(({ title, body, to, icon: Icon }) => (
            <Link
              key={title}
              to={to}
              className="group min-h-[170px] overflow-hidden rounded-[8px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <Icon className="h-7 w-7 text-primary" />
                  <h2 className="mt-5 text-2xl font-bold text-slate-950">{title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">{body}</p>
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

      <section id="products" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-950">Products</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Portable Monitors", "Laptop Extenders", "Cable Setup", "Compatibility"].map((item, index) => (
              <a
                key={item}
                href={index === 3 ? "/compatibility" : "#products"}
                className={`rounded-full border px-5 py-2 text-sm font-semibold ${
                  index === 0
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-slate-200 bg-white text-slate-500 hover:text-slate-950"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.name}
                to={product.to}
                className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="aspect-[4/3] bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-5 py-5">
                  <h3 className="font-semibold text-slate-950">{product.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="articles" className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-950">Learn & Explore</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {articleGroups.map(({ title, icon: Icon, articles }) => (
            <article key={title} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-slate-950">{title}</h3>
              </div>
              <div className="mt-5 divide-y divide-slate-100">
                {articles.map((article) => (
                  <Link
                    key={article}
                    to={article.includes("DisplayPort") || article.includes("H5") ? "/compatibility" : "/help-center"}
                    className="flex items-center justify-between gap-4 py-4 text-sm font-medium text-slate-600 transition hover:text-primary"
                  >
                    <span>{article}</span>
                    <FileText className="h-4 w-4 shrink-0" />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="support" className="bg-[#121722] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
          <div className="text-center">
            <Headphones className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-5 text-3xl font-bold md:text-4xl">Can't find answers?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              We are here to help at any time. Choose your preferred method to contact us.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {contactCards.map(({ title, body, href, icon: Icon }) => (
              <a
                key={title}
                href={href}
                className="rounded-[8px] border border-white/10 bg-white/[0.06] p-6 transition hover:border-primary/50 hover:bg-white/[0.09]"
              >
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{body}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
