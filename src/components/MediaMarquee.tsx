const media = [
  "clubic",
  "PCWorld",
  "Forbes",
  "TechCrunch",
  "RTL•TVI",
  "HUFFPOST",
  "france•2",
  "techradar.pro",
];

export function MediaMarquee() {
  const row = [...media, ...media, ...media];
  return (
    <section className="border-y border-border/40 bg-card/30 py-10 overflow-hidden">
      <div className="flex marquee-track-slow whitespace-nowrap">
        {[...row, ...row].map((m, i) => (
          <span
            key={i}
            className="px-12 shrink-0 text-2xl md:text-3xl font-display font-semibold text-foreground/40 tracking-tight"
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}
