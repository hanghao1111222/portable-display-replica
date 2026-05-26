import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

export function HeroCarousel() {
  const { t } = useLang();
  const slides = [
    {
      img: hero1,
      title: t.hero.title1,
      sub: t.hero.sub1,
    },
    {
      img: hero2,
      title: t.hero.title2,
      sub: t.hero.sub2,
    },
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[i].img}
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1088}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10 h-full flex items-end pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl space-y-5"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
              {slides[i].title}
            </h1>
            <p className="text-lg text-foreground/80 max-w-lg">{slides[i].sub}</p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-primary hover:text-primary-foreground transition"
              >
                {t.hero.cta1}
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-foreground/30 hover:border-primary hover:text-primary transition"
              >
                {t.hero.cta2} →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-10 right-10 hidden md:flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1 transition-all rounded-full ${i === idx ? "w-10 bg-primary" : "w-5 bg-foreground/30"}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
