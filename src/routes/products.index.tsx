import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { useLang } from "@/i18n/LangContext";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Portable monitors — Anyking" },
      { name: "description", content: "Browse our full lineup of USB-C portable monitors: Flex Lite, Flex Pro and Flex Duo." },
      { property: "og:title", content: "All portable monitors" },
      { property: "og:description", content: "Browse our full lineup of USB-C portable monitors." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t } = useLang();
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-5 lg:px-10 pt-12 pb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">{t.products.breadcrumb}</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-3">{t.products.title}</h1>
        <p className="text-muted-foreground text-lg max-w-xl">{t.products.sub}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
