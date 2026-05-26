import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { strings, type Lang, type Strings } from "./strings";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "en" || stored === "ja") {
      setLangState(stored);
    } else if (typeof navigator !== "undefined" && navigator.language.startsWith("ja")) {
      setLangState("ja");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: strings[lang] }}>{children}</LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
}

export function formatPrice(n: number, lang: Lang) {
  if (lang === "ja") {
    return `¥${Math.round(n * 150).toLocaleString("ja-JP")}`;
  }
  return `$${n.toFixed(2)}`;
}
