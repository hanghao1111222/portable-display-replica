import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Globe2, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/i18n/LangContext";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Anyking" },
      {
        name: "description",
        content:
          "Learn about Anyking, our portable monitor philosophy, and how we help customers connect the right screen and cable setup.",
      },
    ],
  }),
  component: AboutPage,
});

const icons = [MonitorSmartphone, Globe2, ShieldCheck, CheckCircle2] as const;

function AboutPage() {
  const { t } = useLang();

  return (
    <SiteLayout>
      <section className="border-b border-border/40 bg-[radial-gradient(circle_at_top,rgba(255,199,64,0.16),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="space-y-7"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary">
              — {t.aboutPage.heroEyebrow}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              {t.aboutPage.heroTitle}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/72 md:text-lg">
              {t.aboutPage.heroBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link to="/products">
                  {t.aboutPage.heroCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link to="/compatibility">{t.aboutPage.heroSecondary}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="grid gap-4 self-end sm:grid-cols-3 lg:grid-cols-1"
          >
            {t.aboutPage.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border/60 bg-card/80 px-6 py-6 shadow-sm"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <p className="mt-2 text-sm leading-6 text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— {t.brand.eyebrow}</p>
            <h2 className="text-3xl font-bold md:text-5xl">{t.aboutPage.introTitle}</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-foreground/80">
            <p className="text-2xl font-medium text-foreground">{t.brand.p1}</p>
            <p>{t.aboutPage.introBody}</p>
            <p>{t.brand.p2}</p>
            <p>{t.brand.p3}</p>
            <p className="text-foreground">{t.brand.p4}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        <div className="rounded-lg border border-border/60 bg-card/70 p-7 md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— Design principles</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.pillars.title}</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {t.aboutPage.pillars.items.map((item, index) => {
              const Icon = icons[index] ?? CheckCircle2;
              return (
                <div
                  key={item.title}
                  className="rounded-lg border border-border/60 bg-background/30 p-6"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-foreground/72">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-18 lg:grid-cols-[1fr_0.9fr] lg:px-10">
        <div className="rounded-lg border border-border/60 bg-foreground px-7 py-8 text-background md:px-10 md:py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">— Audience</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.audience.title}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-background/76 md:text-base">
            {t.aboutPage.audience.body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {t.aboutPage.audience.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-background/20 bg-background/6 px-4 py-2 text-xs font-medium tracking-[0.18em] text-background/84"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/80 px-7 py-8 md:px-10 md:py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">— Support</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.support.title}</h2>
          <p className="mt-5 text-sm leading-7 text-foreground/72 md:text-base">
            {t.aboutPage.support.body}
          </p>
          <div className="mt-7">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/compatibility">
                Open compatibility checker <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-10">
        <div className="rounded-lg border border-primary/20 bg-primary/10 px-7 py-10 md:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">— Anyking</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">{t.aboutPage.closing.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/78">
            {t.aboutPage.closing.body}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
