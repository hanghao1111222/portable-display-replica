import { useLang } from "@/i18n/LangContext";

export function AnnouncementBar() {
  const { t } = useLang();
  const items = [t.ann.a, t.ann.b, t.ann.c];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="border-b border-border/40 bg-background overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap py-2.5 text-xs tracking-widest uppercase text-foreground/80">
        {[...row, ...row].map((s, i) => (
          <span key={i} className="px-8 shrink-0">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
