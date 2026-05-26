import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import feature from "@/assets/s10pro-gallery-7-anywhere.jpg";
import office from "@/assets/s10pro-gallery-1-multitasking.jpg";
import gaming from "@/assets/a6-gallery-2.jpg";
import travel from "@/assets/s10pro-gallery-5-slim.jpg";

export function FeatureBlock() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl overflow-hidden aspect-[4/3]"
      >
        <img src={feature} alt="" className="w-full h-full object-cover" loading="lazy" width={1600} height={1024} />
      </motion.div>
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">— 02</p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t.feature.title}</h2>
        <p className="text-muted-foreground text-lg">{t.feature.body}</p>
        <ul className="space-y-3 pt-2">
          {t.feature.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/products"
          className="inline-block mt-4 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          {t.feature.cta} →
        </Link>
      </div>
    </section>
  );
}

export function ScenesBlock() {
  const { t } = useLang();
  const items = [
    { img: office, pos: "center", ...t.scenes.office },
    { img: gaming, pos: "center", ...t.scenes.gaming },
    { img: travel, pos: "center", ...t.scenes.travel },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">{t.scenes.title}</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-card"
          >
            <img 
              src={it.img} 
              alt={it.t} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              style={{ objectPosition: it.pos }}
              loading="lazy" 
              width={1280} 
              height={896} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold mb-1">{it.t}</h3>
              <p className="text-sm text-muted-foreground">{it.b}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
