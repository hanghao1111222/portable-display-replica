import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-10 py-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t.faq.title}</h2>
      <div className="space-y-3">
        {t.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="border border-border rounded-xl bg-card/30 overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full px-5 py-5 flex items-center justify-between text-left gap-4"
              >
                <span className="font-medium">{item.q}</span>
                {isOpen ? <Minus className="w-4 h-4 shrink-0 text-primary" /> : <Plus className="w-4 h-4 shrink-0" />}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
