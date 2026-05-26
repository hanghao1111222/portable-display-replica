import { ChevronLeft, ChevronRight, ShieldCheck, Play, Pause, Volume2, VolumeX, Check } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { reviews, reviewStats } from "@/data/reviews";
import { TrustStars } from "@/components/TrustStars";
import a6Video from "@/assets/a6-video.mp4";
import s10proVideo from "@/assets/s10pro-video.mp4";

export function BrandStory() {
  const { t } = useLang();
  return (
    <section className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 lg:sticky lg:top-28 space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary">— {t.brand.eyebrow}</p>
          <p className="text-sm tracking-[0.25em] uppercase text-foreground/70">
            {t.brand.tagline}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-[1.05]">{t.brand.title}</h2>
          <div className="h-px w-16 bg-primary mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 space-y-6 text-lg leading-relaxed text-foreground/80"
        >
          <p className="text-2xl text-foreground font-medium">{t.brand.p1}</p>
          <p>{t.brand.p2}</p>
          <p>{t.brand.p3}</p>
          <p className="text-foreground">{t.brand.p4}</p>
        </motion.div>
      </div>
    </section>
  );
}


export function ReviewsSection() {
  const { t } = useLang();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-foreground text-background py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t.reviewsSec.title}
          </h2>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-lg md:text-xl font-medium">Excellent</span>
            <span className="text-2xl md:text-3xl font-bold">
              {reviewStats.average.toFixed(1)} / 5
            </span>
            <TrustStars rating={reviewStats.average} size={28} />
          </div>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base text-background/70">
            <span>based on</span>
            <span className="underline underline-offset-4 font-medium text-background">
              {reviewStats.totalLabel}
            </span>
            <span>reviews</span>
            <ShieldCheck className="w-5 h-5 ml-1 text-[#00b67a]" />
          </div>
        </div>

        <div className="relative mt-14">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous reviews"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-background text-foreground items-center justify-center shadow-lg hover:scale-105 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next reviews"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-background text-foreground items-center justify-center shadow-lg hover:scale-105 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.slice(0, 10).map((r, i) => (
              <motion.article
                key={i}
                data-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="snap-start shrink-0 w-[300px] md:w-[360px] bg-background/[0.04] border border-background/10 rounded-2xl p-7 flex flex-col"
              >
                <TrustStars rating={r.stars} size={22} />
                <h3 className="mt-5 text-xl font-bold">{r.product}</h3>
                <p className="mt-4 text-sm leading-relaxed text-background/80 line-clamp-6">
                  {r.body}
                </p>
                <div className="mt-auto pt-6 text-sm text-background/70">— {r.name}</div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/reviews"
            className="inline-block px-7 py-3.5 rounded-full bg-background text-foreground font-medium hover:opacity-90 transition"
          >
            Check our {reviewStats.totalLabel} reviews
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-card to-card border border-border p-10 md:p-16 text-center space-y-5">
        <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mx-auto">{t.cta.title}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">{t.cta.sub}</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-4"
        >
          <input
            type="email"
            placeholder={t.cta.placeholder}
            className="flex-1 px-5 py-3.5 rounded-full bg-background border border-border focus:border-primary outline-none text-sm"
          />
          <button className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
            {t.cta.btn}
          </button>
        </form>
      </div>
    </section>
  );
}

interface ShowcaseRowProps {
  videoSrc: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
  targetLink: string;
  reverse?: boolean;
}

function ShowcaseRow({
  videoSrc,
  title,
  body,
  bullets,
  cta,
  targetLink,
  reverse = false,
}: ShowcaseRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      // Reset sound preference to muted for the next initial hover
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleClickVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !isMuted;
    video.muted = newMuted;
    setIsMuted(newMuted);

    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left/Right Video Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative group rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 aspect-video cursor-pointer border border-white/10 ${
          reverse ? "lg:order-2" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClickVideo}
      >
        {/* Native HTML5 Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
        />

        {/* Hover/Play overlay */}
        <div
          className={`absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-300 flex flex-col items-center justify-center ${
            !isHovered ? "backdrop-blur-[1px]" : ""
          }`}
        >
          {/* Invitation to Hover (Only shown when not hovered) */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.95 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3 bg-black/60 px-6 py-4 rounded-2xl border border-white/10 shadow-lg text-center backdrop-blur-md"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center animate-pulse">
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            </div>
            <span className="text-white text-xs font-semibold tracking-wider uppercase">
              Hover to Play
            </span>
          </motion.div>
        </div>

        {/* Sound Status Pill overlay */}
        {isHovered && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 shadow-md backdrop-blur-sm"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Click for sound</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-primary animate-bounce" />
                  <span>Sound on</span>
                </>
              )}
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Copy Details */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="space-y-6"
      >
        <h3 className="text-3xl md:text-4xl font-bold leading-tight text-white">
          {title}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed">{body}</p>

        <ul className="space-y-4 pt-2">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-5.5 h-5.5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <span className="text-foreground/90 font-medium">{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="pt-4">
          <Link
            to={targetLink}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-primary hover:text-primary-foreground transition shadow-md"
          >
            {cta} →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function VideoShowcase() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-10 py-24 border-t border-white/5 bg-neutral-950/20 space-y-32">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-primary">
          — {t.videoShowcase.eyebrow}
        </span>
      </div>

      {/* A6 Showcase */}
      <ShowcaseRow
        videoSrc={a6Video}
        title={t.videoShowcase.a6.title}
        body={t.videoShowcase.a6.body}
        bullets={t.videoShowcase.a6.bullets}
        cta={t.videoShowcase.a6.cta}
        targetLink="/products/a6"
        reverse={false}
      />

      {/* S10 Pro Showcase */}
      <ShowcaseRow
        videoSrc={s10proVideo}
        title={t.videoShowcase.s10pro.title}
        body={t.videoShowcase.s10pro.body}
        bullets={t.videoShowcase.s10pro.bullets}
        cta={t.videoShowcase.s10pro.cta}
        targetLink="/products/s10-pro"
        reverse={true}
      />
    </section>
  );
}
