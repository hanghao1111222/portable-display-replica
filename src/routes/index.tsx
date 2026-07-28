import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MediaMarquee } from "@/components/MediaMarquee";
import { HomeProductShowcase } from "@/components/HomeProductShowcase";
import { FeatureBlock, ScenesBlock } from "@/components/FeatureBlocks";
import { ReviewsSection, CTASection, BrandStory, VideoShowcase } from "@/components/Sections";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  return (
    <SiteLayout>
      <HeroCarousel />
      <MediaMarquee />

      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">— 01</p>
            <h2 className="text-4xl md:text-5xl font-bold">{t.grid.title}</h2>
            <p className="text-muted-foreground mt-2">{t.grid.sub}</p>
          </div>
          <Link
            to="/products"
            className="text-sm border-b border-foreground/30 hover:border-primary hover:text-primary transition pb-0.5"
          >
            {t.grid.view} →
          </Link>
        </div>
        <HomeProductShowcase products={products} />
      </section>

      <FeatureBlock />
      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-8">
        <div className="rounded-lg border border-border/60 bg-card/80 px-6 py-8 md:px-10 md:py-10 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
                — {lang === "ja" ? "互換性チェック" : "Compatibility"}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                {lang === "ja"
                  ? "直接接続できるか不安ですか？まずは機種を確認しましょう。"
                  : "Unsure whether it connects directly? Check the model first."}
              </h2>
              <p className="mt-3 text-muted-foreground leading-7">
                {lang === "ja"
                  ? "互換性チェックでは、一般的なノートPCの型番を入力するだけで、USB-Cで直接接続できるか、HDMI-Type-C変換ケーブルやH5 DisplayLinkアダプターが必要かをすぐに確認できます。"
                  : "We added a compatibility page where shoppers can enter common laptop models and quickly see whether USB-C direct connection works or whether an HDMI-to-Type-C or H5 DisplayLink Adapter is required."}
              </p>
            </div>
            <Button asChild className="rounded-full px-6">
              <Link to="/compatibility">
                {lang === "ja" ? "互換性を確認" : "Open compatibility checker"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <VideoShowcase />
      <BrandStory />
      <ScenesBlock />
      <ReviewsSection />
      <FAQ />
      <CTASection />
    </SiteLayout>
  );
}
