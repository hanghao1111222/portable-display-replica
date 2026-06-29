import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BatteryCharging,
  CheckCircle2,
  Factory,
  Layers3,
  Monitor,
  Plug,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/about-hero.jpg";
import originImg from "@/assets/about-origin.jpg";
import whatWeDoImg from "@/assets/about-whatwedo.jpg";
import engineeringImg from "@/assets/about-engineering.jpg";
import supplyImg from "@/assets/about-supply.jpg";
import differentImg from "@/assets/about-different.jpg";
import futureImg from "@/assets/about-future.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Anyking — Any Screen. Anywhere. Anytime." },
      {
        name: "description",
        content:
          "Anyking engineers portable extended displays for mobile professionals. 76 patents, deep manufacturing partnerships, and a vision for the future of multi-screen work.",
      },
      { property: "og:title", content: "About Anyking — Any Screen. Anywhere. Anytime." },
      {
        property: "og:description",
        content:
          "Brand story, engineering foundation, and manufacturing depth behind Anyking's portable extended displays.",
      },
      { property: "og:image", content: heroImg },
      { property: "twitter:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const eyebrow = "text-xs uppercase tracking-[0.32em] text-primary";

function AboutPage() {
  return (
    <SiteLayout>
      {/* 01 HERO */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Professional working with portable extended displays in a premium business-travel environment"
            width={1792}
            height={1024}
            className="h-full w-full object-cover"
          />
          <div className="about-hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-28 lg:px-10 lg:py-40">
          <motion.div {...fadeUp} className="about-hero-copy max-w-2xl space-y-7">
            <p className={`${eyebrow} text-primary`}>— About Anyking</p>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Any Screen.<br />Anywhere.<br />Anytime.
            </h1>
            <p className="max-w-xl text-base leading-8 md:text-lg">
              Work demands more screens — but you shouldn't be tied to a desk to get them.
              Anyking builds portable extended displays for the people who move, ship, and
              create on their own terms.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-full px-6">
                <Link to="/products">
                  Explore the lineup <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="about-outline-button rounded-full px-6"
              >
                <Link to="/compatibility">Check compatibility</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 BRAND ORIGIN */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
          <motion.div {...fadeUp} className="space-y-6">
            <p className={eyebrow}>— 02 / Brand Origin</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Born from a single-screen frustration.
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              Anyking started with a simple truth: a laptop screen is never enough.
              Analysts juggle dashboards, developers split terminals and docs, traders
              watch markets across timezones — all from one cramped panel in a hotel,
              a lounge, or a client's office.
            </p>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              We set out to give that screen back. Not with another monitor that lives on
              a desk, but with displays engineered to move — and to multiply — wherever
              the work happens.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="relative">
            <div className="overflow-hidden rounded-2xl border border-border/60">
              <img
                src={originImg}
                alt="A single laptop screen contrasted with an expanded multi-screen portable workspace"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 03 WHAT WE DO */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <motion.div {...fadeUp} className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-border/60">
              <img
                src={whatWeDoImg}
                alt="Developer, business traveler, financial analyst and content creator using Anyking displays"
                width={1600}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className={eyebrow}>— 03 / What We Do</p>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Portable extended displays, built for real work.
              </h2>
              <p className="text-base leading-8 text-foreground/75 md:text-lg">
                We design, engineer, and manufacture portable monitors that snap into the
                workflows of developers, analysts, business travelers, and content
                creators. One cable, instant second screen — at home, on the road, or
                between flights.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Software developers",
                  "Business travelers",
                  "Financial analysts",
                  "Content creators",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-4 py-3 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 04 ENGINEERING */}
      <section className="border-b border-border/40 bg-[radial-gradient(circle_at_top_right,rgba(255,199,64,0.12),transparent_55%)]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <motion.div {...fadeUp} className="max-w-3xl space-y-5">
            <p className={eyebrow}>— 04 / Engineering You Can Trust</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              A technical foundation in the top 1%.
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              Anyking isn't a rebadged panel. Our portfolio of patents, trademarks, and
              proprietary architectures puts us in the rare tier of display brands that
              actually own the technology shipping in the box.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "76", label: "Patents", icon: ShieldCheck },
              { value: "5", label: "Registered trademarks", icon: Award },
              { value: "3", label: "Software copyrights", icon: Layers3 },
              { value: "Top 1%", label: "Technical foundation", icon: Sparkles },
            ].map(({ value, label, icon: Icon }) => (
              <motion.div
                key={label}
                {...fadeUp}
                className="rounded-2xl border border-border/60 bg-card/70 p-6"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-5 text-4xl font-bold text-foreground md:text-5xl">{value}</div>
                <p className="mt-2 text-sm text-foreground/65">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Key Patented Technologies — zigzag */}
          <div className="mt-20 space-y-5">
            <p className={eyebrow}>— Key Patented Technologies</p>
            <h3 className="max-w-3xl text-2xl font-bold leading-tight md:text-4xl">
              Four proprietary systems behind every Anyking display.
            </h3>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                icon: BatteryCharging,
                tag: "Patent 01",
                title: "Power Bank Display Splitter",
                body:
                  "Our proprietary design integrates portable power directly into the display splitter — eliminating the need for separate power sources and enabling true mobile productivity.",
              },
              {
                icon: Layers3,
                tag: "Patent 02",
                title: "Foldable Back-Panel System",
                body:
                  "Engineered for maximum portability, our foldable back-panel collapses flat for travel while providing rock-solid stability when deployed. No bulky stands, no extra parts to carry.",
              },
              {
                icon: Monitor,
                tag: "Patent 03",
                title: "Multi-Screen Splitter",
                body:
                  "Our advanced splitter architecture manages multiple display signals simultaneously, delivering lag-free, high-resolution output across dual and triple screen configurations.",
              },
              {
                icon: Plug,
                tag: "Patent 04",
                title: "Tri-Screen Display System",
                body:
                  "The most advanced portable multi-monitor setup available. Designed for professionals who need maximum screen real estate on the go — from financial traders to software developers.",
              },
            ].map(({ icon: Icon, tag, title, body }) => (
              <motion.div
                key={title}
                {...fadeUp}
                className="group relative rounded-2xl border border-border/60 bg-card/40 p-8 transition hover:border-primary/40 hover:bg-card/70"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
                  <Icon className="h-3.5 w-3.5" />
                  {tag}
                </div>
                <h4 className="mt-5 text-2xl font-bold leading-tight md:text-[1.6rem]">{title}</h4>
                <p className="mt-4 text-base leading-8 text-foreground/75">{body}</p>
              </motion.div>
            ))}
          </div>


          {/* Quality Standards */}
          <motion.div {...fadeUp} className="mt-20 rounded-3xl border border-border/60 bg-card/60 p-8 md:p-12">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrow}>— Quality Standards</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
                  Tested to survive the road, not just the lab.
                </h3>
              </div>
              <p className="max-w-md text-sm leading-7 text-foreground/65">
                Every panel passes a multi-stage protocol before it ever leaves the
                line — built for the way mobile professionals actually use their gear.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShieldCheck, title: "100% panel inspection", body: "Every panel checked before assembly." },
                { icon: Sparkles, title: "Color accuracy calibration", body: "Tuned for true-to-source output." },
                { icon: Plug, title: "5,000+ cycle durability", body: "Connection cycles validated for life on the move." },
                { icon: Factory, title: "Drop & vibration tested", body: "Engineered for travel and field use." },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border/60 bg-background/60 p-5"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <h4 className="mt-4 text-sm font-semibold">{title}</h4>
                  <p className="mt-2 text-xs leading-6 text-foreground/65">{body}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* 05 SUPPLY CHAIN */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
          <motion.div {...fadeUp} className="order-2 lg:order-1 overflow-hidden rounded-2xl border border-border/60">
            <img
              src={supplyImg}
              alt="Anyking manufacturing partners on the assembly and inspection line"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div {...fadeUp} className="order-1 space-y-6 lg:order-2">
            <p className={eyebrow}>— 05 / Supply Chain Advantage</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              A manufacturing partnership, not a parts list.
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              We work deep inside our manufacturing base — co-engineering tooling,
              owning quality protocols, and keeping innovation cycles short. The result
              is premium hardware that ships faster, holds tolerance, and stays priced
              for the people who actually use it.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Factory, label: "Co-engineered tooling" },
                { icon: ShieldCheck, label: "End-to-end quality control" },
                { icon: Sparkles, label: "Faster innovation cycles" },
                { icon: BatteryCharging, label: "Competitive unit economics" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-4 py-3 text-sm"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 06 WHY DIFFERENT */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <motion.div {...fadeUp} className="max-w-3xl space-y-5">
            <p className={eyebrow}>— 06 / Why We're Different</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Others repackage panels. We engineer ecosystems.
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              Most portable displays are commodity panels in a generic case. Anyking is
              built around engineering, compatibility, and the real-world workflow of
              people who depend on a second screen to finish the job.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div {...fadeUp} className="overflow-hidden rounded-2xl border border-border/60">
              <img
                src={differentImg}
                alt="Anyking portable display ecosystem compared with generic mass-market displays"
                width={1600}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/50 p-6">
                <div className="flex items-center gap-2 text-sm text-foreground/55">
                  <XCircle className="h-4 w-4" />
                  Generic brands
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/70">
                  <li>Rebadged panels, no IP</li>
                  <li>Generic enclosure, fragile hinges</li>
                  <li>Compatibility roulette</li>
                  <li>Thin support, slow iteration</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  Anyking
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/85">
                  <li>76 patents, owned architecture</li>
                  <li>Engineered hinge & power systems</li>
                  <li>Tested across laptops, phones, consoles</li>
                  <li>Deep manufacturing, fast iteration</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 07 FUTURE VISION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={futureImg}
            alt="Future of mobile productivity — larger displays, wireless connectivity, global workflow"
            width={1792}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="about-vision-overlay absolute inset-0" />
        </div>
        <div className="about-vision-copy relative mx-auto max-w-7xl px-5 py-24 lg:px-10 lg:py-32">
          <motion.div {...fadeUp} className="max-w-3xl space-y-6">
            <p className={`${eyebrow} text-primary`}>— 07 / Future Vision</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Bigger surfaces. Wireless signal. Borderless work.
            </h2>
            <p className="text-base leading-8 md:text-lg">
              We're investing in larger portable formats, higher resolutions, wireless
              connectivity, and deeper integration with the tools mobile professionals
              already use — and taking Anyking far beyond the US market.
            </p>
            <div className="about-vision-tags flex flex-wrap gap-2 pt-2 text-xs uppercase tracking-[0.2em]">
              {["Larger formats", "Higher resolution", "Wireless", "Workflow integration", "Global"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1.5"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
            <div className="pt-6">
              <p className="text-2xl font-semibold md:text-3xl">
                Any Screen. Anywhere. Anytime.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link to="/products">
                    Shop the lineup <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="about-outline-button rounded-full px-6"
                >
                  <Link to="/compatibility">Check compatibility</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
