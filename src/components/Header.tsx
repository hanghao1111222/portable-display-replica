import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { t, lang, setLang } = useLang();
  const { cartCount, setCartOpen } = useCart();
  const [open, setOpen] = useState(false);

  const nav = [
    { to: "/products" as const, label: t.nav.sales },
    { to: "/products" as const, label: t.nav.monitors },
    { to: "/products" as const, label: t.nav.accessories },
    { to: "/reviews" as const, label: t.nav.reviews },
    { to: "/products" as const, label: t.nav.explore },
    { to: "/products" as const, label: t.nav.help },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="font-display font-bold text-lg tracking-tight shrink-0 active font-serif shadow-none">
          Any<span className="text-primary">king</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1 text-xs border border-border rounded-full px-1 py-0.5">
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded-full transition ${lang === "en" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ja")}
              className={`px-2 py-1 rounded-full transition ${lang === "ja" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}
            >
              日本語
            </button>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 p-2 text-sm hover:text-primary transition"
            aria-label="Login"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">{t.nav.login}</span>
          </Link>
          <button
            className="p-2 hover:text-primary transition relative"
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/40 px-5 py-4 space-y-3">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block text-sm text-foreground/80"
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {t.nav.login}
          </Link>
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs rounded-full border ${lang === "en" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ja")}
              className={`px-3 py-1 text-xs rounded-full border ${lang === "ja" ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
            >
              日本語
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
