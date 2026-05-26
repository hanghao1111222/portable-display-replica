import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useLang } from "@/i18n/LangContext";
import { motion } from "motion/react";
import { reviews, reviewStats } from "@/data/reviews";
import { TrustStars } from "@/components/TrustStars";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer reviews — Anyking" },
      { name: "description", content: "Real reviews from real Anyking customers." },
      { property: "og:title", content: "Customer reviews" },
      { property: "og:description", content: "Real reviews from real customers." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { t } = useLang();
  return (
    <SiteLayout>
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-20 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t.reviewsSec.title}
          </h1>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-lg md:text-xl font-medium">Excellent</span>
            <span className="text-2xl md:text-3xl font-bold">
              {reviewStats.average.toFixed(1)} / 5
            </span>
            <TrustStars rating={reviewStats.average} size={28} />
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-sm md:text-base text-background/70">
            <span>based on</span>
            <span className="underline underline-offset-4 font-medium text-background">
              {reviewStats.totalLabel}
            </span>
            <span>reviews</span>
            <ShieldCheck className="w-5 h-5 ml-1 text-[#00b67a]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
            className="bg-card border border-border rounded-2xl p-7 flex flex-col"
          >
            <TrustStars rating={r.stars} size={22} />
            <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
            <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{r.body}</p>
            <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{r.name}</span>
              <span>{r.product}</span>
            </div>
          </motion.article>
        ))}
      </section>
    </SiteLayout>
  );
}
