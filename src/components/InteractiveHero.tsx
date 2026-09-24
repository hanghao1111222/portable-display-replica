import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useLang } from "@/i18n/LangContext";

const roles = [
  {
    key: "role-3",
    poster: "/videos/interactive-hero/role-3-clean.png",
    video: "/videos/interactive-hero/role-3-clean.webm",
    width: 640,
    height: 640,
    layout: "left-0 z-10 w-[30%]",
    mediaClass: "origin-bottom scale-[1.04]",
    href: "/products/a6",
    label: "Explore A6 single-screen monitors",
  },
  {
    key: "role-1",
    poster: "/videos/interactive-hero/role-1-clean.png",
    video: "/videos/interactive-hero/role-1-clean.webm",
    width: 854,
    height: 640,
    layout: "left-[30%] z-20 w-[40%]",
    mediaClass: "origin-bottom",
    href: "/products/s10-pro",
    label: "Explore S10 Pro dual-screen monitors",
  },
  {
    key: "role-2",
    poster: "/videos/interactive-hero/role-2-clean.png",
    video: "/videos/interactive-hero/role-2-clean.webm",
    width: 480,
    height: 640,
    layout: "right-0 z-10 w-[30%]",
    mediaClass: "origin-bottom scale-[1.08]",
    href: "/products/p7-156-extender",
    label: "Explore P7 15.6-inch triple-screen monitors",
  },
] as const;

export function InteractiveHero() {
  const { t, lang } = useLang();
  const reduceMotion = useReducedMotion();
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const playRole = (index: number) => {
    if (!canHover || reduceMotion) return;
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video || videoIndex === index) return;
      video.pause();
      video.currentTime = 0;
    });
    const video = videoRefs.current[index];
    if (!video) return;
    video.currentTime = 0;
    setActiveRole(index);
    void video.play().catch(() => setActiveRole(null));
  };

  const resetRole = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setActiveRole((current) => (current === index ? null : current));
  };

  return (
    <section className="relative isolate h-[calc(100svh-96px)] min-h-[680px] max-h-[790px] overflow-hidden bg-[#f5f5f8] text-[#1d1d1f]">
      <div className="absolute inset-x-0 top-0 h-[46%] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(245,245,248,0))]" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-40 mx-auto flex max-w-4xl flex-col items-center px-5 pt-12 text-center sm:pt-14 lg:pt-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6e73]">
          {t.hero.eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
          {t.hero.title1}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#515154] sm:text-base">
          {t.hero.sub1}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 text-sm font-medium text-white transition hover:bg-[#0077ed]"
          >
            {t.hero.cta1}
          </Link>
          <Link
            to="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0071e3] px-6 text-sm font-medium text-[#0066cc] transition hover:bg-[#0071e3] hover:text-white"
          >
            {t.hero.cta2}
          </Link>
        </div>
        {canHover && !reduceMotion && (
          <p className="mt-3 text-xs text-[#6e6e73]">
            {lang === "ja"
              ? "人物にカーソルを合わせて再生・クリックして製品を見る"
              : "Hover to animate · Click to explore"}
          </p>
        )}
      </motion.div>

      <div className="absolute bottom-0 left-1/2 z-20 h-[52%] w-[720px] -translate-x-1/2 sm:h-[54%] sm:w-full sm:max-w-[1440px]">
        {roles.map((role, index) => (
          <motion.div
            key={role.key}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: activeRole === index ? -6 : 0 }}
            transition={{
              opacity: { duration: 0.48, delay: reduceMotion ? 0 : index * 0.09 },
              y: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
            }}
            className={`group absolute bottom-[-12px] flex h-[clamp(290px,calc(100svh-370px),360px)] min-w-0 cursor-pointer items-end justify-center outline-none ${role.layout} ${
              activeRole === index ? "!z-40" : ""
            }`}
          >
            <a
              href={role.href}
              aria-label={role.label}
              className="absolute inset-0 z-50 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-4"
              onPointerEnter={() => playRole(index)}
              onPointerLeave={() => resetRole(index)}
              onFocus={() => playRole(index)}
              onBlur={() => resetRole(index)}
            />
            <img
              src={role.poster}
              alt=""
              width={role.width}
              height={role.height}
              className={`pointer-events-none h-full w-auto max-w-full select-none object-contain brightness-[1.02] mix-blend-multiply ${role.mediaClass} ${
                activeRole === index ? "invisible" : "visible"
              }`}
              draggable={false}
            />
            <video
              ref={(video) => {
                videoRefs.current[index] = video;
              }}
              src={role.video}
              muted
              playsInline
              preload={canHover ? "metadata" : "none"}
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-0 left-1/2 h-full w-auto max-w-full -translate-x-1/2 object-contain brightness-[1.02] mix-blend-multiply ${role.mediaClass} ${
                activeRole === index ? "visible" : "invisible"
              }`}
              onEnded={() => resetRole(index)}
            />
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-black/5" />
    </section>
  );
}
