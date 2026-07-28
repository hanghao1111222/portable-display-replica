import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { strings, type Lang, type Strings } from "./strings";
import { createLanguageCookie, languageForCountry, readCountryCookie } from "./geoLocale";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({
  children,
  initialLang = "en",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "en" || stored === "ja") {
      setLangState(stored);
      document.cookie = createLanguageCookie(stored);
      return;
    }

    const countryLanguage =
      typeof document !== "undefined"
        ? languageForCountry(readCountryCookie(document.cookie))
        : null;
    if (countryLanguage) {
      setLangState(countryLanguage);
      return;
    }

    if (typeof navigator !== "undefined" && navigator.language.startsWith("ja")) {
      setLangState("ja");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "ja" ? "ja" : "en";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      document.cookie = createLanguageCookie(l);
    }
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
