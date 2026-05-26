import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MediaMarquee } from "@/components/MediaMarquee";
import { ProductCard } from "@/components/ProductCard";
import { FeatureBlock, ScenesBlock } from "@/components/FeatureBlocks";
import { ReviewsSection, CTASection, BrandStory, VideoShowcase } from "@/components/Sections";
import { FAQ } from "@/components/FAQ";
import { products } from "@/data/products";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useLang();
  return (
    <SiteLayout>
      <HeroCarousel />
      <MediaMarquee />

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <FeatureBlock />
      <VideoShowcase />
      <BrandStory />
      <ScenesBlock />
      <ReviewsSection />
      <FAQ />
      <CTASection />
    </SiteLayout>
  );
}
