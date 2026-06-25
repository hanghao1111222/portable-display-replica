import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, FileQuestion, Headphones, Laptop, Phone, QrCode } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center - Anyking" },
      {
        name: "description",
        content:
          "Find setup help, compatibility guidance, cable connection tips, and direct Anyking support contact details.",
      },
    ],
  }),
  component: HelpCenterPage,
});

const quickLinks = [
  {
    title: "Laptop Compatibility",
    body: "Check whether your laptop can connect directly or needs an extra adapter cable.",
    to: "/compatibility",
    icon: Laptop,
  },
  {
    title: "Connection Troubleshooting",
    body: "Learn what to try when your screen does not light up, flickers, or only mirrors.",
    to: "/compatibility",
    icon: Cable,
  },
  {
    title: "Customer Reviews",
    body: "See how other customers use Anyking portable displays in real setups.",
    to: "/reviews",
    icon: FileQuestion,
  },
] as const;

const supportOptions = [
  {
    label: "Customer service email",
    value: "service@anykingscreen.com",
    href: "mailto:service@anykingscreen.com",
    icon: Headphones,
  },
  {
    label: "Customer service phone",
    value: "+1 (888) 688-5025",
    href: "tel:+18886885025",
    icon: Phone,
  },
] as const;

const topics = [
  "How to connect with USB-C",
  "How to connect with HDMI",
  "How to identify DisplayPort Alt Mode",
  "When an H5 adapter cable is required",
  "No signal / black screen troubleshooting",
  "Return and warranty support",
] as const;

function HelpCenterPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border/40 bg-[linear-gradient(180deg,#0f1114_0%,#171b22_100%)] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.28em] text-primary/90">Anyking Help Center</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Get setup help fast and send customers to the right answer.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              Use this help center to check device compatibility, understand cable requirements,
              and contact Anyking support when a customer needs one more step to get connected.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link to="/compatibility">
                  Check compatibility <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/12"
              >
                <a href="#support-contact">Contact support</a>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-primary">
              <QrCode className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Help Center QR</p>
            </div>
            <div className="mt-5 overflow-hidden rounded-2xl bg-white p-5">
              <img
                src="/help-center-qr.png"
                alt="QR code linking to the Anyking Help Center"
                className="mx-auto aspect-square w-full max-w-[260px] object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-white/72">
              QR destination: <span className="text-white">https://www.anykingscreen.com/help-center</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {quickLinks.map(({ title, body, to, icon: Icon }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-3xl border border-border bg-card p-7 transition hover:border-primary/40 hover:shadow-lg"
            >
              <Icon className="h-6 w-6 text-primary" />
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Open
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/40 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Popular topics</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Most customers only need one quick answer.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Start with compatibility, cable type, and signal troubleshooting. Those are the
              fastest ways to reduce avoidable returns and solve connection issues.
            </p>
          </div>

          <div className="grid gap-3">
            {topics.map((topic) => (
              <div
                key={topic}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 shadow-sm"
              >
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="support-contact" className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <div className="rounded-[32px] border border-border bg-card p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-primary">Direct support</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Reach Anyking support directly.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {supportOptions.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="rounded-2xl border border-border bg-background px-5 py-5 transition hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                </div>
                <p className="mt-3 text-lg font-semibold">{value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
