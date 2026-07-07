import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LangContext";
import { ChevronDown, LogOut, Menu, PackageCheck, ShoppingBag, User, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { t, lang, setLang } = useLang();
  const { cartCount, setCartOpen } = useCart();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const userInitials = currentUser?.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AK";

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setOpen(false);
  };

  const nav = [
    { to: "/products" as const, label: t.nav.sales },
    { to: "/about" as const, label: t.nav.about },
    { to: "/compatibility" as const, label: t.nav.compatibility },
    { to: "/reviews" as const, label: t.nav.reviews },
    { to: "/products" as const, label: t.nav.explore },
    { to: "/help-center" as const, label: t.nav.help },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 h-16 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="font-display font-bold text-lg tracking-tight shrink-0 active font-serif shadow-none"
        >
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
          {isAuthenticated && currentUser ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 py-1 pl-1 pr-3 text-sm shadow-sm transition hover:border-primary/50 hover:text-primary"
                aria-label="Account menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {userInitials}
                </span>
                <span className="hidden max-w-28 truncate lg:inline">{currentUser.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-border bg-background p-2 shadow-2xl">
                  <div className="border-b border-border px-3 py-3">
                    <p className="text-sm font-semibold text-foreground">{currentUser.name}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{currentUser.email}</p>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setAccountOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-primary"
                  >
                    <UserRound className="h-4 w-4" />
                    Personal Center
                  </Link>
                  <a
                    href="/account?tab=orders"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-primary"
                  >
                    <PackageCheck className="h-4 w-4" />
                    My Orders
                  </a>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-foreground/80 transition hover:bg-accent hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 p-2 text-sm hover:text-primary transition"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{t.nav.login}</span>
            </Link>
          )}
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
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Horizontal Scroll Navigation Bar */}
      <div className="lg:hidden flex items-center gap-6 overflow-x-auto whitespace-nowrap px-5 py-3 border-t border-border/30 bg-background/40 backdrop-blur-md scrollbar-none">
        {nav.map((n, i) => (
          <Link
            key={i}
            to={n.to}
            className="text-foreground/75 hover:text-primary transition-colors font-semibold text-xs tracking-tight"
          >
            {n.label}
          </Link>
        ))}
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
          {isAuthenticated && currentUser ? (
            <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {userInitials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{currentUser.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="block text-sm text-foreground/80"
              >
                Personal Center
              </Link>
              <a
                href="/account?tab=orders"
                onClick={() => setOpen(false)}
                className="block text-sm text-foreground/80"
              >
                My Orders
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="block text-sm text-foreground/80"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-sm text-foreground/80"
            >
              {t.nav.login}
            </Link>
          )}
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
