import { Link } from "@tanstack/react-router";
import { formatPrice, useLang } from "@/i18n/LangContext";
import {
  ArrowRight,
  Cable,
  ChevronDown,
  Download,
  Laptop,
  Layers3,
  LogOut,
  Menu,
  Monitor,
  PackageCheck,
  ShoppingBag,
  Star,
  User,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { products, type Product } from "@/data/products";
import type { Lang } from "@/i18n/strings";
import { useMarket } from "@/market/MarketContext";

type MegaCategory = "dual" | "triple" | "quad";

type ProductDetail = {
  label: string;
  value: string;
  note: string;
  icon: typeof Cable;
};

function getProductDetails(product: Product, lang: Lang): ProductDetail[] {
  const screenSize = product.specs.find((spec) => spec.label.en === "Screen size")?.value ?? "—";
  const resolution = product.specs.find((spec) => spec.label.en === "Resolution")?.value ?? "—";
  const weight = product.specs.find((spec) => spec.label.en === "Weight")?.value ?? "—";

  return [
    {
      label: lang === "ja" ? "接続" : "Connection",
      value:
        product.slug === "a6"
          ? lang === "ja"
            ? "映像出力 1系統"
            : "1 video path"
          : lang === "ja"
            ? "映像出力 2系統"
            : "2 video paths",
      note: "USB-C / HDMI",
      icon: Cable,
    },
    {
      label: lang === "ja" ? "画面サイズ" : "Display size",
      value: screenSize,
      note: lang === "ja" ? "IPSパネル" : "IPS panels",
      icon: Monitor,
    },
    {
      label: lang === "ja" ? "解像度" : "Resolution",
      value: resolution.split(" (")[0],
      note: "60 Hz",
      icon: Layers3,
    },
    {
      label: lang === "ja" ? "対応OS" : "Systems",
      value: "macOS & Windows",
      note: lang === "ja" ? "ノートPC対応" : "Laptop compatible",
      icon: Laptop,
    },
    {
      label: lang === "ja" ? "セットアップ" : "Setup",
      value:
        product.slug === "a6"
          ? lang === "ja"
            ? "ドライバー不要*"
            : "Driver-free*"
          : lang === "ja"
            ? "必要に応じてH5"
            : "H5 if required",
      note: lang === "ja" ? "機種により異なります" : "Model dependent",
      icon: Download,
    },
    {
      label: lang === "ja" ? "携帯性" : "Portable build",
      value: weight,
      note: lang === "ja" ? "折りたたみ式" : "Foldable design",
      icon: PackageCheck,
    },
  ];
}

export function Header() {
  const { t, lang, setLang } = useLang();
  const { config: marketConfig } = useMarket();
  const { cartCount, setCartOpen } = useCart();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaCategory, setMegaCategory] = useState<MegaCategory>("triple");
  const headerRef = useRef<HTMLElement>(null);

  const megaLabels =
    lang === "ja"
      ? {
          products: "製品",
          dual: "デュアル拡張ディスプレイ",
          triple: "トリプル拡張ディスプレイ",
          quad: "クアッド拡張ディスプレイ",
          popular: "製品詳細",
          shopAll: "すべて見る",
          comingSoon: "近日公開",
          comingSoonBody: "4画面ワークスペース向けの新製品を準備中です。",
        }
      : {
          products: "Products",
          dual: "Dual Extended Display",
          triple: "Triple Extended Display",
          quad: "Quad Extended Display",
          popular: "Product details",
          shopAll: "Shop all products",
          comingSoon: "Coming soon",
          comingSoonBody: "A new four-display workspace product is being prepared.",
        };

  const megaProducts = useMemo(() => {
    if (megaCategory === "dual") return products.filter((product) => product.slug === "a6");
    if (megaCategory === "triple") return products.filter((product) => product.slug !== "a6");
    return [];
  }, [megaCategory]);

  useEffect(() => {
    if (!megaOpen && !accountOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMegaOpen(false);
        setAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setAccountOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountOpen, megaOpen]);

  const userInitials =
    currentUser?.name
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

  const contactLabel = lang === "ja" ? "お問い合わせ" : "Contact Us";

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        megaOpen
          ? "border-transparent bg-background"
          : "border-border/40 bg-background/90 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-2 px-4 lg:gap-5 lg:px-8 xl:px-10">
        <Link
          to="/"
          onClick={() => setMegaOpen(false)}
          className="shrink-0 font-serif text-xl font-bold tracking-tight shadow-none lg:text-2xl"
        >
          Any<span className="text-primary">king</span>
        </Link>
        <nav className="hidden items-center gap-0 text-[11px] md:flex lg:gap-1 lg:text-sm">
          <button
            type="button"
            onClick={() => {
              setMegaOpen((value) => !value);
              setAccountOpen(false);
            }}
            className={`inline-flex h-10 items-center gap-1 rounded-full px-2 font-medium transition lg:h-11 lg:gap-1.5 lg:px-4 ${
              megaOpen
                ? "bg-foreground text-background"
                : "text-foreground/80 hover:bg-muted hover:text-foreground"
            }`}
            aria-expanded={megaOpen}
            aria-controls="products-mega-menu"
          >
            {megaLabels.products}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`}
            />
          </button>
          <a
            href={marketConfig.amazonStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMegaOpen(false)}
            className="rounded-full px-1.5 py-3 text-foreground/80 transition hover:bg-muted hover:text-foreground lg:px-3.5"
          >
            Amazon
          </a>
          <a
            href="/help-center#software-center"
            onClick={() => setMegaOpen(false)}
            className="rounded-full px-1.5 py-3 text-foreground/80 transition hover:bg-muted hover:text-foreground lg:px-3.5"
          >
            {lang === "ja" ? "ソフトウェア" : "Software"}
          </a>
          <Link
            to="/reviews"
            onClick={() => setMegaOpen(false)}
            className="rounded-full px-1.5 py-3 text-foreground/80 transition hover:bg-muted hover:text-foreground lg:px-3.5"
          >
            {t.nav.reviews}
          </Link>
          <Link
            to="/help-center"
            onClick={() => setMegaOpen(false)}
            className="rounded-full px-1.5 py-3 text-foreground/80 transition hover:bg-muted hover:text-foreground lg:px-3.5"
          >
            {t.nav.help}
          </Link>
          <Link
            to="/about"
            onClick={() => setMegaOpen(false)}
            className="rounded-full px-1.5 py-3 text-foreground/80 transition hover:bg-muted hover:text-foreground lg:px-3.5"
          >
            {t.nav.about}
          </Link>
          <Link
            to="/contact"
            onClick={() => setMegaOpen(false)}
            className="rounded-full px-1.5 py-3 text-foreground/80 transition hover:bg-muted hover:text-foreground lg:px-3.5"
          >
            {contactLabel}
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-1 lg:gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-border px-1 py-0.5 text-xs lg:flex">
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
                onClick={() => {
                  setAccountOpen((value) => !value);
                  setMegaOpen(false);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 py-1 pl-1 pr-3 text-sm shadow-sm transition hover:border-primary/50 hover:text-primary"
                aria-label={lang === "ja" ? "アカウントメニュー" : "Account menu"}
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
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setAccountOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-primary"
                  >
                    <UserRound className="h-4 w-4" />
                    {lang === "ja" ? "マイアカウント" : "Personal Center"}
                  </Link>
                  <a
                    href="/account?tab=orders"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-primary"
                  >
                    <PackageCheck className="h-4 w-4" />
                    {lang === "ja" ? "注文履歴" : "My Orders"}
                  </a>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-foreground/80 transition hover:bg-accent hover:text-primary"
                  >
                    <LogOut className="h-4 w-4" />
                    {lang === "ja" ? "ログアウト" : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 p-2 text-sm hover:text-primary transition"
              aria-label={lang === "ja" ? "ログイン" : "Login"}
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">{t.nav.login}</span>
            </Link>
          )}
          <button
            className="p-2 hover:text-primary transition relative"
            aria-label={lang === "ja" ? "カート" : "Cart"}
            onClick={() => {
              setCartOpen(true);
              setMegaOpen(false);
            }}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="p-2 md:hidden"
            onClick={() => {
              setOpen(!open);
              setMegaOpen(false);
            }}
            aria-label={lang === "ja" ? "メニュー" : "Menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {megaOpen && (
        <div
          id="products-mega-menu"
          className="absolute left-0 top-full hidden w-full overflow-hidden rounded-b-[2rem] border-t border-border/50 bg-background shadow-[0_28px_70px_rgba(15,23,42,0.18)] animate-in fade-in slide-in-from-top-2 duration-200 md:block"
        >
          <div className="mx-auto grid max-h-[calc(100vh-5rem)] max-w-[1440px] grid-cols-[160px_minmax(0,1fr)] gap-5 overflow-y-auto px-5 py-6 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-7 lg:px-8 xl:grid-cols-[240px_minmax(0,1fr)] xl:px-10 xl:py-8">
            <div className="flex min-h-[440px] flex-col border-r border-border/70 pr-4 lg:pr-7">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {megaLabels.products}
              </p>
              <div className="space-y-1">
                {(
                  [
                    ["dual", megaLabels.dual],
                    ["triple", megaLabels.triple],
                    ["quad", megaLabels.quad],
                  ] as const
                ).map(([category, label]) => (
                  <button
                    key={category}
                    type="button"
                    onMouseEnter={() => setMegaCategory(category)}
                    onFocus={() => setMegaCategory(category)}
                    onClick={() => setMegaCategory(category)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left text-sm font-bold leading-snug transition lg:text-base xl:text-lg ${
                      megaCategory === category
                        ? "bg-foreground text-background"
                        : "text-foreground/55 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {label}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <Link
                to="/products"
                onClick={() => setMegaOpen(false)}
                className="mt-auto flex items-center justify-between border-t border-border pt-5 text-sm font-bold hover:text-primary"
              >
                {megaLabels.shopAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="min-w-0">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {megaLabels.popular}
                </p>
                <Link
                  to="/products"
                  onClick={() => setMegaOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-bold hover:text-primary"
                >
                  {megaLabels.shopAll}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {megaCategory === "quad" ? (
                <div className="flex min-h-[440px] items-center justify-center rounded-3xl border border-dashed border-border bg-[#f5f1ec] px-8 text-center">
                  <div className="max-w-md">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Monitor className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-2xl font-bold">{megaLabels.comingSoon}</h3>
                    <p className="mt-3 leading-7 text-muted-foreground">
                      {megaLabels.comingSoonBody}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {megaProducts.map((product) => {
                    const discount = Math.round((1 - product.price / product.compareAt) * 100);
                    const details = getProductDetails(product, lang);
                    return (
                      <Link
                        key={product.slug}
                        to="/products/$slug"
                        params={{ slug: product.slug }}
                        onClick={() => setMegaOpen(false)}
                        className="group overflow-hidden rounded-3xl border border-border/70 bg-[#f3eee8] transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-white">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                          />
                          {discount > 0 && (
                            <span className="absolute left-3 top-3 rounded-full bg-sale px-3 py-1.5 text-xs font-bold text-white">
                              {lang === "ja" ? `${discount}% OFF` : `Save ${discount}%`}
                            </span>
                          )}
                          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm">
                            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                            {product.rating.toFixed(1)} · {product.reviews}
                          </span>
                        </div>
                        <div className="p-4 lg:p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-bold leading-tight group-hover:text-primary lg:text-xl">
                                {product.name.replace("Anyking ", "")}
                              </h3>
                              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                {product.tagline[lang]}
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="font-bold text-sale">
                                {formatPrice(product.price, lang)}
                              </p>
                              <p className="text-xs text-muted-foreground line-through">
                                {formatPrice(product.compareAt, lang)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-xs font-medium">
                            <span>{lang === "ja" ? "カラー" : "Colors"}</span>
                            <span className="h-4 w-4 rounded-full border border-white bg-neutral-900 shadow" />
                          </div>
                          <div className="mt-4 grid grid-cols-2 border-l border-t border-border/70">
                            {details.map((detail) => {
                              const DetailIcon = detail.icon;
                              return (
                                <div
                                  key={detail.label}
                                  className="flex min-h-[72px] gap-2 border-b border-r border-border/70 p-2.5"
                                >
                                  <DetailIcon className="mt-0.5 h-4 w-4 shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                      {detail.label}
                                    </p>
                                    <p className="mt-0.5 text-xs font-semibold leading-tight">
                                      {detail.value}
                                    </p>
                                    <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                                      {detail.note}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Horizontal Scroll Navigation Bar */}
      <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap border-t border-border/30 bg-background/40 px-5 py-3 backdrop-blur-md scrollbar-none md:hidden">
        <Link
          to="/products"
          className="text-xs font-semibold tracking-tight text-foreground/75 transition-colors hover:text-primary"
        >
          {megaLabels.products}
        </Link>
        <a
          href={marketConfig.amazonStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold tracking-tight text-foreground/75 transition-colors hover:text-primary"
        >
          Amazon
        </a>
        <a
          href="/help-center#software-center"
          className="text-xs font-semibold tracking-tight text-foreground/75 transition-colors hover:text-primary"
        >
          {lang === "ja" ? "ソフトウェア" : "Software"}
        </a>
        <Link to="/reviews" className="text-xs font-semibold text-foreground/75 hover:text-primary">
          {t.nav.reviews}
        </Link>
        <Link
          to="/help-center"
          className="text-xs font-semibold text-foreground/75 hover:text-primary"
        >
          {t.nav.help}
        </Link>
        <Link to="/about" className="text-xs font-semibold text-foreground/75 hover:text-primary">
          {t.nav.about}
        </Link>
        <Link to="/contact" className="text-xs font-semibold text-foreground/75 hover:text-primary">
          {contactLabel}
        </Link>
      </div>

      {open && (
        <div className="space-y-3 border-t border-border/40 px-5 py-4 md:hidden">
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {megaLabels.products}
          </Link>
          <a
            href={marketConfig.amazonStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            Amazon
          </a>
          <a
            href="/help-center#software-center"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {lang === "ja" ? "ソフトウェア" : "Software"}
          </a>
          <Link
            to="/reviews"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {t.nav.reviews}
          </Link>
          <Link
            to="/help-center"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {t.nav.help}
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {t.nav.about}
          </Link>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-sm text-foreground/80"
          >
            {contactLabel}
          </Link>
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
                {lang === "ja" ? "マイアカウント" : "Personal Center"}
              </Link>
              <a
                href="/account?tab=orders"
                onClick={() => setOpen(false)}
                className="block text-sm text-foreground/80"
              >
                {lang === "ja" ? "注文履歴" : "My Orders"}
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="block text-sm text-foreground/80"
              >
                {lang === "ja" ? "ログアウト" : "Sign out"}
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
