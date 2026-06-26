import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cable,
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
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500 md:text-lg">
            Search setup guides, troubleshooting articles, warranty support, and laptop compatibility answers.
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
                placeholder="Search for articles..."
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

          <div className="mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/60 hover:text-slate-950"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </a>
            ))}
          </div>
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
            {["Portable Monitors", "Laptop Extenders", "Compatibility"].map((item, index) => (
              <a
                key={item}
                href={index === 2 ? "/compatibility" : "#products"}
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

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.name}
                to={product.to}
                className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="aspect-[16/10] bg-white p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain object-center transition duration-500 group-hover:scale-[1.02]"
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
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ Articles</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Learn & Explore</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Follow the most common support paths first. Each answer includes the next step if your laptop needs a
            different cable or adapter.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {faqGroups.map(({ id, title, description, articles }) => (
            <article id={id} key={title} className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </div>
              <Accordion type="single" collapsible className="mt-5 divide-y divide-slate-100">
                {articles.map((article, index) => (
                  <AccordionItem
                    key={article.question}
                    value={`${id}-${index}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="py-4 text-left text-sm font-semibold text-slate-800 hover:text-primary hover:no-underline">
                      {article.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-slate-500">
                      <p>{article.answer}</p>
                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Was this helpful?
                        </span>
                        <button
                          type="button"
                          className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary hover:text-primary"
                        >
                          No
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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
