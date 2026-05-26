import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/data/products";
import { useLang, formatPrice } from "@/i18n/LangContext";
import { Star, Truck, RotateCcw, ShieldCheck, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "motion/react";
import { reviews, expertReviews, starDistributions } from "@/data/reviews";
import { TrustStars } from "@/components/TrustStars";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product } as const;
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — Anyking` : "Product" },
        { name: "description", content: p?.description.en ?? "Portable monitor" },
        { property: "og:title", content: p?.name ?? "Product" },
        { property: "og:description", content: p?.description.en ?? "" },
        ...(p?.images?.[0] ? [{ property: "og:image", content: p.images[0] }] : []),
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-32 text-center">
        <h1 className="text-4xl font-bold">Product not found</h1>
        <Link to="/products" className="text-primary mt-4 inline-block">
          Back to all products →
        </Link>
      </div>
    </SiteLayout>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: import("@/data/products").Product };
  const { t, lang } = useLang();
  const { addToCart, setCartOpen } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const discount = Math.round((1 - product.price / product.compareAt) * 100);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-8 pb-6">
        <nav className="text-xs text-muted-foreground space-x-2">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">{t.products.breadcrumb}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-10 pb-16">
        <div className="space-y-3">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-2xl overflow-hidden bg-white flex items-center justify-center border border-white/5"
          >
            <img
              src={product.images[active]}
              alt={product.name}
              className="w-full h-full object-contain p-4 bg-white"
              width={1024}
              height={1024}
            />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition bg-white ${i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={src} alt="" className="w-full h-full object-contain p-1 bg-white" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs">
            {product.badge && (
              <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full font-semibold">
                {product.badge[lang]}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-sale text-white px-2.5 py-1 rounded-full font-semibold">
                −{discount}%
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground text-lg">{product.tagline[lang]}</p>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            </div>
            <span>{product.rating.toFixed(2)}</span>
            <span className="text-muted-foreground">· {product.reviews} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-3xl font-bold text-sale">
              {formatPrice(product.price, lang)}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compareAt, lang)}
            </span>
          </div>

          <p className="text-foreground/90 leading-relaxed">{product.description[lang]}</p>

          <div className="flex items-center gap-4 pt-4">
            <span className="text-sm text-muted-foreground">{t.detail.quantity}</span>
            <div className="flex items-center border border-border rounded-full">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                addToCart(product, qty);
                setCartOpen(true);
              }}
              className="flex-1 px-7 py-4 rounded-full bg-foreground text-background font-medium hover:bg-primary hover:text-primary-foreground transition"
            >
              {t.detail.addToCart} — {formatPrice(product.price * qty, lang)}
            </button>
            <button
              onClick={() => {
                addToCart(product, qty);
                setCartOpen(false);
                navigate({ to: "/checkout" });
              }}
              className="px-7 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              {t.detail.buyNow}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
            {[
              { i: Truck, l: t.detail.shipping },
              { i: RotateCcw, l: t.detail.returns },
              { i: ShieldCheck, l: t.detail.warranty },
            ].map(({ i: Icon, l }, idx) => (
              <div key={idx} className="text-center space-y-2">
                <Icon className="w-5 h-5 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.aplus && (
        <div className="bg-black text-white">
          {/* Hero A+ banner */}
          {product.aplus.hero && (
            <section className="mx-auto max-w-6xl px-5 lg:px-10 py-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
                <motion.img
                  src={product.aplus.hero}
                  alt={`${product.name} hero`}
                  className="w-full h-auto block"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </section>
          )}

          {/* Premium display banner */}
          {product.aplus.display && (
            <section className="mx-auto max-w-6xl px-5 lg:px-10 py-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
                <motion.img
                  src={product.aplus.display}
                  alt="Premium display"
                  className="w-full h-auto block"
                  loading="lazy"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </section>
          )}

          {/* Scenarios grid — auto-degrade columns by count */}
          {product.aplus.scenes && product.aplus.scenes.length > 0 && (
            <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16 space-y-8">
              {product.aplus.scenesHeading && (
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  {product.aplus.scenesHeading[lang]}
                </h2>
              )}
              <div
                className={`grid gap-4 ${
                  product.aplus.scenes.length === 1
                    ? "grid-cols-1"
                    : product.aplus.scenes.length <= 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : product.aplus.scenes.length === 3
                        ? "grid-cols-1 md:grid-cols-3"
                        : "grid-cols-1 md:grid-cols-2"
                }`}
              >
                {product.aplus.scenes.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="overflow-hidden rounded-2xl group"
                  >
                    <img
                      src={s.image}
                      alt={s.label[lang]}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Ecosystem banner */}
          {product.aplus.ecosystem && (
            <section className="mx-auto max-w-6xl px-5 lg:px-10 py-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
                <motion.img
                  src={product.aplus.ecosystem}
                  alt="Ecosystem"
                  className="w-full h-auto block"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </section>
          )}

          {/* Comfort hero — contained image with overlaid title */}
          {product.aplus.comfort && (
            <section className="mx-auto max-w-6xl px-5 lg:px-10 py-6">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
                <motion.img
                  src={product.aplus.comfort.image}
                  alt={product.aplus.comfort.title[lang]}
                  className="w-full h-auto block"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 flex items-start md:items-center justify-center pt-8 md:pt-0 pointer-events-none">
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-white text-2xl md:text-5xl font-semibold text-center px-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
                  >
                    {product.aplus.comfort.title[lang]}
                  </motion.h2>
                </div>
              </div>
            </section>
          )}

          {/* Clarity — heading + responsive image grid with eyebrow + label */}
          {product.aplus.clarity && product.aplus.clarity.items.length > 0 && (
            <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16 space-y-8">
              <h2 className="text-2xl md:text-4xl font-semibold text-white">
                {product.aplus.clarity.title[lang]}
              </h2>
              <div
                className={`grid gap-3 ${
                  product.aplus.clarity.items.length === 1
                    ? "grid-cols-1"
                    : product.aplus.clarity.items.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : product.aplus.clarity.items.length === 3
                        ? "grid-cols-1 sm:grid-cols-3"
                        : "grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {product.aplus.clarity.items.map((it, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-900 group"
                  >
                    <img
                      src={it.image}
                      alt={it.label[lang]}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <p className="text-[11px] uppercase tracking-wider text-white/70">
                        {it.eyebrow[lang]}
                      </p>
                      <p className="text-base md:text-lg font-semibold text-white mt-0.5">
                        {it.label[lang]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Deploy — split image / copy on dark card */}
          {product.aplus.deploy && (
            <section className="mx-auto max-w-7xl px-5 lg:px-10 pb-16">
              <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-neutral-900">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className="aspect-[4/3] lg:aspect-auto bg-black flex items-center justify-center p-8"
                >
                  <img
                    src={product.aplus.deploy.image}
                    alt={product.aplus.deploy.title[lang]}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex flex-col justify-center p-8 lg:p-12 space-y-4"
                >
                  <h2 className="text-2xl md:text-4xl font-semibold text-white">
                    {product.aplus.deploy.title[lang]}
                  </h2>
                  <p className="text-white/70 leading-relaxed text-base md:text-lg">
                    {product.aplus.deploy.body[lang]}
                  </p>
                </motion.div>
              </div>
            </section>
          )}

          {/* Generic stacked banners (contained, black bg) */}
          {product.aplus.banners?.map((src, i) => (
            <section key={i} className="mx-auto max-w-6xl px-5 lg:px-10 py-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-950">
                <motion.img
                  src={src}
                  alt={`${product.name} A+ ${i + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                />
              </div>
            </section>
          ))}

          {product.aplus.sliders && product.aplus.sliders.length > 0 && (
            <section className="mx-auto max-w-6xl px-5 lg:px-10 py-8 space-y-6 bg-neutral-50 text-black">
              {product.aplus.sliders.map((slider, idx) => (
                <AplusSliderBlock
                  key={idx}
                  title={slider.title?.[lang]}
                  slides={slider.slides}
                  productName={product.name}
                />
              ))}
            </section>
          )}
        </div>
      )}

      <section className="bg-black text-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 space-y-16">
        {product.features.map((f, i) => (
          <div
            key={i}
            className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>:first-child]:order-2" : ""}`}
          >
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#e9eef5] border border-white/10 p-2 md:p-3">
              <img
                src={f.image || product.images[i % product.images.length]}
                alt={f.title[lang]}
                className="w-full h-full object-contain"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
                — 0{i + 1}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold">{f.title[lang]}</h2>
              <p className="text-white/60 text-lg leading-relaxed">{f.body[lang]}</p>
            </div>
          </div>
        ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 lg:px-10 py-16">
        <h2 className="text-3xl font-bold mb-6">{t.detail.specs}</h2>
        {(() => {
          const groupDefs: { key: string; title: { en: string; ja: string }; match: string[] }[] = [
            { key: "display", title: { en: "Display", ja: "ディスプレイ" }, match: ["Display type", "Display technology", "Aspect ratio", "Screen finish", "Contrast ratio", "Refresh rate", "Picture enhancement", "Response time", "Panel", "Brightness", "HDR"] },
            { key: "measurements", title: { en: "Measurements", ja: "サイズ・重量" }, match: ["Screen size", "Item dimensions", "Weight"] },
            { key: "resolution", title: { en: "Display resolution", ja: "解像度" }, match: ["Resolution"] },
            { key: "connectivity", title: { en: "Connectivity", ja: "接続" }, match: ["Connectivity"] },
            { key: "ports", title: { en: "Ports", ja: "ポート" }, match: ["Ports", "HDMI ports"] },
            { key: "item", title: { en: "Item details", ja: "商品詳細" }, match: ["Brand", "Model", "Manufacturer", "Warranty", "ASIN", "Color"] },
          ];
          const groups = groupDefs
            .map((g) => ({
              ...g,
              rows: product.specs.filter((s) => g.match.includes(s.label.en)),
            }))
            .filter((g) => g.rows.length > 0);
          const used = new Set(groups.flatMap((g) => g.rows.map((r) => r.label.en)));
          const other = product.specs.filter((s) => !used.has(s.label.en));
          if (other.length) {
            groups.push({
              key: "other",
              title: { en: "Other", ja: "その他" },
              match: [],
              rows: other,
            });
          }
          return (
            <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
              {groups.map((g) => (
                <details key={g.key} className="group bg-card/20 open:bg-card/40">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-semibold text-base hover:bg-card/50 transition">
                    <span>{g.title[lang]}</span>
                    <Plus className="w-4 h-4 transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="border-t border-border">
                    {g.rows.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between gap-4 px-6 py-3 odd:bg-background/40 text-sm"
                      >
                        <span className="text-muted-foreground">{s.label[lang]}</span>
                        <span className="font-medium text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          );
        })()}
      </section>


      <ExpertReviewsSection slug={product.slug} />

      <CustomerReviewsSection slug={product.slug} productName={product.name} rating={product.rating} />

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
        <h2 className="text-3xl font-bold mb-8">{t.detail.relatedTitle}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function AplusSliderBlock({
  title,
  slides,
  productName,
}: {
  title?: string;
  slides: string[];
  productName: string;
}) {
  const [index, setIndex] = useState(0);

  if (slides.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4 md:p-6">
      {title && <h3 className="hidden md:block text-xl font-semibold mb-4 text-neutral-900">{title}</h3>}
      <div className="relative overflow-hidden rounded-xl bg-white">
        <motion.div
          className="flex"
          animate={{ x: `${-index * 100}%` }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) prev();
            if (info.offset.x < -80) next();
          }}
        >
          {slides.map((src, i) => (
            <div key={i} className="w-full shrink-0 flex items-center justify-center bg-white px-2 py-4">
              <img
                src={src}
                alt={`${productName} slider ${i + 1}`}
                className="w-full max-h-[500px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-neutral-300 flex items-center justify-center hover:bg-white transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-neutral-300 flex items-center justify-center hover:bg-white transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
      {slides.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((_, dot) => (
            <button
              key={dot}
              aria-label={`Go to slide ${dot + 1}`}
              onClick={() => setIndex(dot)}
              className={`w-2.5 h-2.5 rounded-full transition ${dot === index ? "bg-neutral-900" : "bg-neutral-300 hover:bg-neutral-400"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub-components (hooks-compliant) ──────────────────────────

function ExpertReviewsSection({ slug }: { slug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const expertItems = expertReviews.filter((r) => !r.product || r.product === slug);
  if (expertItems.length === 0) return null;
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -480 : 480, behavior: "smooth" });
  };
  return (
    <section className="bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Tested by experts</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-white/20 hover:border-white/60 transition text-white/70 hover:text-white"
              aria-label="Previous expert review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-white/20 hover:border-white/60 transition text-white/70 hover:text-white"
              aria-label="Next expert review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {expertItems.map((expert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex-shrink-0 w-[400px] snap-start border-l-2 border-white/15 pl-6 py-2 space-y-4"
            >
              <TrustStars rating={expert.stars} size={20} />
              <p className="text-white/90 text-lg leading-relaxed italic">
                &ldquo;{expert.quote}&rdquo;
              </p>
              <p className="text-white/45 text-sm">&mdash; {expert.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomerReviewsSection({
  slug,
  productName,
  rating,
}: {
  slug: string;
  productName: string;
  rating: number;
}) {
  const dist = starDistributions[slug] ?? [0, 0, 0, 0, 0];
  const total = dist.reduce((a, b) => a + b, 0);
  const avg =
    total > 0
      ? dist.reduce((sum, count, i) => sum + count * (5 - i), 0) / total
      : rating;
  const productReviews = reviews.filter((r) => r.product === productName).slice(0, 8);

  return (
    <section className="bg-black text-white py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 space-y-12">
        {/* Header + aggregate */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">Customer Reviews</h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center border-b border-white/10 pb-10">
            {/* Left: avg score */}
            <div className="space-y-2 shrink-0">
              <div className="flex items-center gap-3">
                <TrustStars rating={avg} size={24} />
                <span className="text-white font-semibold text-lg">
                  {avg.toFixed(2)} out of 5
                </span>
              </div>
              <p className="text-white/50 text-sm flex items-center gap-1">
                Based on {total.toLocaleString()} reviews
                <ShieldCheck className="w-4 h-4 text-[#00b67a] ml-1" />
              </p>
            </div>
            {/* Divider */}
            <div className="hidden md:block w-px h-24 bg-white/10" />
            {/* Bar chart */}
            <div className="flex-1 space-y-2 min-w-0">
              {dist.map((count, i) => {
                const stars = 5 - i;
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <TrustStars rating={stars} size={14} />
                    <div className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-amber-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                      />
                    </div>
                    <span className="text-white/50 w-8 text-right tabular-nums">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Individual review cards */}
        {productReviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {productReviews.map((r, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col"
              >
                <TrustStars rating={r.stars} size={18} />
                <h3 className="mt-4 text-base font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed flex-1">{r.body}</p>
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                  <span className="font-medium text-white/60">{r.name}</span>
                  <span>
                    {new Date(r.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white/80 hover:border-white/50 hover:text-white transition text-sm font-medium"
          >
            See all reviews &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
