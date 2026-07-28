import { Link } from "@tanstack/react-router";
import { Cable, Download, Laptop, Layers3, Monitor, PackageCheck, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/data/products";
import { formatPrice, useLang } from "@/i18n/LangContext";

type Detail = {
  label: string;
  value: string;
  note: string;
  icon: typeof Cable;
};

function spec(product: Product, label: string) {
  return product.specs.find((item) => item.label.en === label)?.value ?? "—";
}

function productName(product: Product, lang: "en" | "ja") {
  const name = product.name.replace("Anyking ", "");
  if (lang !== "ja") return name;
  if (product.slug === "p7-156-extender") return "P7 15.6インチ 拡張ディスプレイ";
  return name;
}

function productWeight(product: Product, lang: "en" | "ja") {
  const weight = spec(product, "Weight");
  if (lang !== "ja") return weight;
  if (product.slug === "s10-pro") return "1.6 kg";
  if (product.slug === "p7-156-extender") return "約1.77 kg";
  if (product.slug === "a6") return "850 g";
  return weight;
}

function productDetails(product: Product, lang: "en" | "ja"): Detail[] {
  const isSinglePanel = product.slug === "a6";

  return [
    {
      label: lang === "ja" ? "接続" : "Connection",
      value: isSinglePanel
        ? lang === "ja"
          ? "映像出力 1系統"
          : "1 video path"
        : lang === "ja"
          ? "映像出力 2系統"
          : "2 video paths",
      note: "USB-C / HDMI",
      icon: Cable,
    },
    {
      label: lang === "ja" ? "画面サイズ" : "Display size",
      value: spec(product, "Screen size"),
      note: lang === "ja" ? "IPSパネル" : "IPS panels",
      icon: Monitor,
    },
    {
      label: lang === "ja" ? "解像度" : "Resolution",
      value: spec(product, "Resolution").split(" (")[0],
      note: "60 Hz",
      icon: Layers3,
    },
    {
      label: lang === "ja" ? "対応OS" : "Systems",
      value: "macOS & Windows",
      note: lang === "ja" ? "ノートPC対応" : "Laptop compatible",
      icon: Laptop,
    },
    {
      label: lang === "ja" ? "セットアップ" : "Setup",
      value: isSinglePanel
        ? lang === "ja"
          ? "ドライバー不要*"
          : "Driver-free*"
        : lang === "ja"
          ? "必要に応じてH5"
          : "H5 if required",
      note: lang === "ja" ? "機種により異なります" : "Model dependent",
      icon: Download,
    },
    {
      label: lang === "ja" ? "携帯性" : "Portable build",
      value: productWeight(product, lang),
      note: lang === "ja" ? "折りたたみ式" : "Foldable design",
      icon: PackageCheck,
    },
  ];
}

export function HomeProductShowcase({ products }: { products: Product[] }) {
  const { lang } = useLang();

  return (
    <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none lg:grid lg:grid-cols-3 lg:overflow-visible">
      {products.map((product, index) => {
        const discount = Math.round((1 - product.price / product.compareAt) * 100);
        const details = productDetails(product, lang);

        return (
          <motion.article
            key={product.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="min-w-[86vw] snap-start overflow-hidden rounded-[1.75rem] border border-black/[0.08] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.13)] sm:min-w-[420px] lg:min-w-0"
          >
            <Link to="/products/$slug" params={{ slug: product.slug }} className="group block">
              <div className="relative aspect-square overflow-hidden bg-white">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                  loading="lazy"
                  width={1600}
                  height={1600}
                />
                <div className="absolute left-5 top-5 flex flex-col items-start gap-2">
                  {product.badge && (
                    <span className="rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-2 text-xs font-bold text-white shadow-sm">
                      {product.badge[lang]}
                    </span>
                  )}
                  <span className="rounded-full bg-sale px-4 py-2 text-xs font-bold text-white shadow-sm">
                    {lang === "ja" ? `${discount}% OFF` : `Save ${discount}%`}
                  </span>
                </div>
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold shadow-sm">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {lang === "ja"
                    ? `${product.rating.toFixed(1)}・レビュー${product.reviews}件`
                    : `${product.rating.toFixed(1)} · ${product.reviews} reviews`}
                </span>
              </div>

              <div className="bg-white px-6 pb-6 pt-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[60%] text-xl font-bold leading-tight transition group-hover:text-primary lg:text-2xl">
                    {productName(product, lang)}
                  </h3>
                  <div className="shrink-0 text-right">
                    <p className="text-sm text-sale">
                      {lang === "ja" ? "価格 " : "From "}
                      <span className="text-lg font-semibold">
                        {formatPrice(product.price, lang)}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.compareAt, lang)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-base font-medium">
                  <span>{lang === "ja" ? "カラー" : "Colors"}</span>
                  <span className="h-5 w-5 rounded-full border-2 border-white bg-neutral-900 shadow" />
                </div>

                <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border-l border-t border-[#e7e7e4] bg-[#fafaf8]">
                  {details.map((detail) => {
                    const Icon = detail.icon;
                    return (
                      <div
                        key={detail.label}
                        className="flex min-h-[96px] gap-3 border-b border-r border-[#e7e7e4] p-4"
                      >
                        <Icon className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.8} />
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                            {detail.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold leading-tight">{detail.value}</p>
                          <p className="mt-1 text-xs leading-tight text-muted-foreground">
                            {detail.note}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          </motion.article>
        );
      })}
    </div>
  );
}
