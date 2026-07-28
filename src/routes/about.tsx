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
import { useLang } from "@/i18n/LangContext";

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
  const { lang, t } = useLang();
  const ja = lang === "ja";

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
            <p className={`${eyebrow} text-primary`}>— {t.aboutPage.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              {ja ? (
                <>
                  どんな画面も。
                  <br />
                  どこでも。
                  <br />
                  いつでも。
                </>
              ) : (
                <>
                  Any Screen.
                  <br />
                  Anywhere.
                  <br />
                  Anytime.
                </>
              )}
            </h1>
            <p className="max-w-xl text-base leading-8 md:text-lg">{t.aboutPage.heroBody}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-full px-6">
                <Link to="/products">
                  {t.aboutPage.heroCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="about-outline-button rounded-full px-6">
                <Link to="/compatibility">{t.aboutPage.heroSecondary}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02 BRAND ORIGIN */}
      <section className="border-b border-border/40 bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
          <motion.div {...fadeUp} className="space-y-6">
            <p className={eyebrow}>— 02 / {ja ? "ブランドの原点" : "Brand Origin"}</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              {ja
                ? "一画面では足りない。その不満から始まりました。"
                : "Born from a single-screen frustration."}
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              {t.aboutPage.introBody}
            </p>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              {ja
                ? "私たちが目指したのは、デスクに置き続けるモニターではありません。仕事をする場所へ一緒に移動し、必要なときに画面を増やせるディスプレイです。"
                : "We set out to give that screen back. Not with another monitor that lives on a desk, but with displays engineered to move — and to multiply — wherever the work happens."}
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
          <motion.div
            {...fadeUp}
            className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
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
              <p className={eyebrow}>— 03 / {t.aboutPage.whatWeDo.title}</p>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                {ja
                  ? "本当の仕事のための、ポータブル拡張ディスプレイ。"
                  : "Portable extended displays, built for real work."}
              </h2>
              <p className="text-base leading-8 text-foreground/75 md:text-lg">
                {t.aboutPage.whatWeDo.body}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {(ja
                  ? [
                      "ソフトウェア開発者",
                      "ビジネストラベラー",
                      "金融アナリスト",
                      "コンテンツクリエイター",
                    ]
                  : [
                      "Software developers",
                      "Business travelers",
                      "Financial analysts",
                      "Content creators",
                    ]
                ).map((label) => (
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
            <p className={eyebrow}>— 04 / {t.aboutPage.engineering.title}</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              {ja ? "業界上位1%クラスの技術基盤。" : "A technical foundation in the top 1%."}
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              {t.aboutPage.engineering.body}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "76", label: ja ? "特許" : "Patents", icon: ShieldCheck },
              { value: "5", label: ja ? "登録商標" : "Registered trademarks", icon: Award },
              {
                value: "3",
                label: ja ? "ソフトウェア著作権" : "Software copyrights",
                icon: Layers3,
              },
              {
                value: ja ? "上位1%" : "Top 1%",
                label: ja ? "技術基盤" : "Technical foundation",
                icon: Sparkles,
              },
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
            <p className={eyebrow}>— {t.aboutPage.pillars.title}</p>
            <h3 className="max-w-3xl text-2xl font-bold leading-tight md:text-4xl">
              {ja
                ? "すべてのAnykingディスプレイを支える4つの独自システム。"
                : "Four proprietary systems behind every Anyking display."}
            </h3>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {(ja
              ? t.aboutPage.pillars.items.map((item, index) => ({
                  icon: [BatteryCharging, Layers3, Monitor, Plug][index],
                  tag: `特許 ${String(index + 1).padStart(2, "0")}`,
                  title: item.title,
                  body: item.body,
                }))
              : [
                  {
                    icon: BatteryCharging,
                    tag: "Patent 01",
                    title: "Power Bank Display Splitter",
                    body: "Our proprietary design integrates portable power directly into the display splitter — eliminating the need for separate power sources and enabling true mobile productivity.",
                  },
                  {
                    icon: Layers3,
                    tag: "Patent 02",
                    title: "Foldable Back-Panel System",
                    body: "Engineered for maximum portability, our foldable back-panel collapses flat for travel while providing rock-solid stability when deployed. No bulky stands, no extra parts to carry.",
                  },
                  {
                    icon: Monitor,
                    tag: "Patent 03",
                    title: "Multi-Screen Splitter",
                    body: "Our advanced splitter architecture manages multiple display signals simultaneously, delivering lag-free, high-resolution output across dual and triple screen configurations.",
                  },
                  {
                    icon: Plug,
                    tag: "Patent 04",
                    title: "Tri-Screen Display System",
                    body: "The most advanced portable multi-monitor setup available. Designed for professionals who need maximum screen real estate on the go — from financial traders to software developers.",
                  },
                ]
            ).map(({ icon: Icon, tag, title, body }) => (
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
          <motion.div
            {...fadeUp}
            className="mt-20 rounded-3xl border border-border/60 bg-card/60 p-8 md:p-12"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrow}>— {ja ? "品質基準" : "Quality Standards"}</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
                  {ja
                    ? "研究室だけでなく、移動の毎日に耐える品質。"
                    : "Tested to survive the road, not just the lab."}
                </h3>
              </div>
              <p className="max-w-md text-sm leading-7 text-foreground/65">
                {ja
                  ? "すべてのパネルは出荷前に複数段階の検査を通過します。モバイルワーカーの実際の使い方を前提に設計しています。"
                  : "Every panel passes a multi-stage protocol before it ever leaves the line — built for the way mobile professionals actually use their gear."}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(ja
                ? [
                    {
                      icon: ShieldCheck,
                      title: "全数パネル検査",
                      body: "組立前にすべてのパネルを確認。",
                    },
                    {
                      icon: Sparkles,
                      title: "色精度キャリブレーション",
                      body: "入力ソースに忠実な表示へ調整。",
                    },
                    {
                      icon: Plug,
                      title: "5,000回以上の接続耐久",
                      body: "持ち運びを想定した接続試験を実施。",
                    },
                    { icon: Factory, title: "落下・振動試験", body: "出張や現場での使用を想定。" },
                  ]
                : [
                    {
                      icon: ShieldCheck,
                      title: "100% panel inspection",
                      body: "Every panel checked before assembly.",
                    },
                    {
                      icon: Sparkles,
                      title: "Color accuracy calibration",
                      body: "Tuned for true-to-source output.",
                    },
                    {
                      icon: Plug,
                      title: "5,000+ cycle durability",
                      body: "Connection cycles validated for life on the move.",
                    },
                    {
                      icon: Factory,
                      title: "Drop & vibration tested",
                      body: "Engineered for travel and field use.",
                    },
                  ]
              ).map(({ icon: Icon, title, body }) => (
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
          <motion.div
            {...fadeUp}
            className="order-2 lg:order-1 overflow-hidden rounded-2xl border border-border/60"
          >
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
            <p className={eyebrow}>
              — 05 / {ja ? "サプライチェーンの強み" : "Supply Chain Advantage"}
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              {ja
                ? "部品を集めるだけではない、ものづくりのパートナーシップ。"
                : "A manufacturing partnership, not a parts list."}
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              {t.aboutPage.supplyChain.body}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(ja
                ? [
                    { icon: Factory, label: "共同開発した生産設備" },
                    { icon: ShieldCheck, label: "一貫した品質管理" },
                    { icon: Sparkles, label: "より速い改善サイクル" },
                    { icon: BatteryCharging, label: "競争力のある製造コスト" },
                  ]
                : [
                    { icon: Factory, label: "Co-engineered tooling" },
                    { icon: ShieldCheck, label: "End-to-end quality control" },
                    { icon: Sparkles, label: "Faster innovation cycles" },
                    { icon: BatteryCharging, label: "Competitive unit economics" },
                  ]
              ).map(({ icon: Icon, label }) => (
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
            <p className={eyebrow}>— 06 / {t.aboutPage.difference.title}</p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              {ja
                ? "他社がパネルを再包装するなら、私たちはエコシステムを設計する。"
                : "Others repackage panels. We engineer ecosystems."}
            </h2>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              {t.aboutPage.difference.body}
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
                  {ja ? "一般的なブランド" : "Generic brands"}
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/70">
                  {(ja
                    ? [
                        "汎用パネルで独自技術なし",
                        "汎用筐体と壊れやすいヒンジ",
                        "使うまで分からない互換性",
                        "限定的なサポートと遅い改善",
                      ]
                    : [
                        "Rebadged panels, no IP",
                        "Generic enclosure, fragile hinges",
                        "Compatibility roulette",
                        "Thin support, slow iteration",
                      ]
                  ).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-primary/10 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  Anyking
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/85">
                  {(ja
                    ? [
                        "76件の特許と独自構造",
                        "独自設計のヒンジと給電システム",
                        "ノートPC・スマホ・ゲーム機で検証",
                        "製造現場との深い連携と速い改善",
                      ]
                    : [
                        "76 patents, owned architecture",
                        "Engineered hinge & power systems",
                        "Tested across laptops, phones, consoles",
                        "Deep manufacturing, fast iteration",
                      ]
                  ).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
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
            <p className={`${eyebrow} text-primary`}>
              — 07 / {ja ? "未来へのビジョン" : "Future Vision"}
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              {ja
                ? "より大きく。ワイヤレスに。境界のない仕事へ。"
                : "Bigger surfaces. Wireless signal. Borderless work."}
            </h2>
            <p className="text-base leading-8 md:text-lg">{t.aboutPage.future.body}</p>
            <div className="about-vision-tags flex flex-wrap gap-2 pt-2 text-xs uppercase tracking-[0.2em]">
              {(ja
                ? ["大型化", "高解像度", "ワイヤレス", "ワークフロー統合", "グローバル"]
                : [
                    "Larger formats",
                    "Higher resolution",
                    "Wireless",
                    "Workflow integration",
                    "Global",
                  ]
              ).map((t) => (
                <span key={t} className="rounded-full px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-6">
              <p className="text-2xl font-semibold md:text-3xl">{t.aboutPage.closing.title}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full px-6">
                  <Link to="/products">
                    {t.aboutPage.heroCta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="about-outline-button rounded-full px-6"
                >
                  <Link to="/compatibility">{t.aboutPage.heroSecondary}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </SiteLayout>
  );
}
