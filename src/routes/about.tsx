import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe2,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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

const icons = [Sparkles, Cpu, Layers3, ShieldCheck] as const;

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
            <p>{t.aboutPage.introBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-border/60 bg-foreground px-7 py-8 text-background md:px-10 md:py-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— Product positioning</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.whatWeDo.title}</h2>
            <p className="mt-5 text-sm leading-7 text-background/76 md:text-base">
              {t.aboutPage.whatWeDo.body}
            </p>
          </div>

          <div className="rounded-lg border border-border/60 bg-card/80 px-7 py-8 md:px-10 md:py-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— Technical foundation</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.engineering.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground/72 md:text-base">
              {t.aboutPage.engineering.body}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        <div className="rounded-lg border border-border/60 bg-card/70 p-7 md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— Patented technology</p>
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
          <p className="text-xs uppercase tracking-[0.3em] text-primary">— Quality standards</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.quality.title}</h2>
          <div className="mt-6 grid gap-3">
            {t.aboutPage.quality.items.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-background/12 bg-background/6 px-4 py-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm leading-7 text-background/82 md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/80 px-7 py-8 md:px-10 md:py-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">— Manufacturing</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.supplyChain.title}</h2>
          <p className="mt-5 text-sm leading-7 text-foreground/72 md:text-base">
            {t.aboutPage.supplyChain.body}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-card/70 p-7 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— Brand difference</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.difference.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground/72 md:text-base">
              {t.aboutPage.difference.body}
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground/72 md:text-base">
              {t.aboutPage.difference.body2}
            </p>
          </div>

          <div className="rounded-lg border border-border/60 bg-card/80 p-7 md:p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— Roadmap</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{t.aboutPage.future.title}</h2>
            <p className="mt-5 text-sm leading-7 text-foreground/72 md:text-base">
              {t.aboutPage.future.body}
            </p>
            <div className="mt-7">
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link to="/compatibility">
                  {t.aboutPage.heroSecondary} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
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
