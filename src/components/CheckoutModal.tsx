import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang, formatPrice } from "@/i18n/LangContext";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ExternalLink, Lock, Package, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { shopifyConfig } from "@/config/shopify";
import { redirectToShopifyCheckout } from "@/lib/shopify";
import { useMarket } from "@/market/MarketContext";
import { getAmazonProductUrl } from "@/market/market";

export function CheckoutModal() {
  const { isCheckoutOpen, setCheckoutOpen, cartItems, cartSubtotal, clearCart } = useCart();
  const { currentUser, createOrder } = useAuth();
  const { lang } = useLang();
  const { market } = useMarket();
  const navigate = useNavigate();
  const copy =
    lang === "ja"
      ? {
          saved: "注文をアカウントに保存しました。",
          close: "チェックアウトを閉じる",
          title: "チェックアウト",
          shopifyTitle: "Shopifyで購入手続きを完了します",
          amazonTitle: "Amazonで購入手続きを完了します",
          shopifyBody: "安全にお支払いいただくため、Shopifyの決済画面へ移動します。",
          amazonBody: "新しいタブでAmazonの商品ページを開き、購入手続きを完了します。",
          empty: "カートは空です。",
          quantity: "数量",
          summary: "注文概要",
          subtotal: "小計",
          shopifySecure: "Shopify セキュアチェックアウト",
          amazonFlow: "Amazon購入フロー",
          shopifySecurity: "お支払いは、PCIに準拠したShopifyの決済システムで安全に処理されます。",
          amazonSecurity: "商品詳細と購入手続きはAmazonの商品ページから進みます。",
          signedIn: "ログイン中",
          recorded: "この購入はアカウントの注文履歴に記録されます。",
          shopifyGuest:
            "ログインまたはアカウントを作成すると、後から注文記録を確認できます。ログインせずにShopifyへ進むこともできます。",
          amazonGuest:
            "ログインまたはアカウントを作成すると、後から注文記録を確認できます。ゲストとしてAmazonへ進むこともできます。",
          shopifyContinue: "Shopifyの決済へ進む",
          amazonContinue: "Amazonへ進む",
          back: "ストアへ戻る",
        }
      : {
          saved: "Order saved to your account.",
          close: "Close checkout",
          title: "Checkout",
          shopifyTitle: "Purchase completes on Shopify",
          amazonTitle: "Purchase completes on Amazon",
          shopifyBody: "We will redirect you to Shopify to securely complete your payment.",
          amazonBody:
            "We will open the product page in a new tab so you can finish the order on Amazon, just like your reference flow.",
          empty: "Your cart is empty.",
          quantity: "Qty",
          summary: "Order summary",
          subtotal: "Subtotal",
          shopifySecure: "Shopify Secure Checkout",
          amazonFlow: "Amazon checkout flow",
          shopifySecurity:
            "Your transaction is processed securely through Shopify's PCI-compliant payment gateway.",
          amazonSecurity:
            "Product detail pages and checkout will open the Amazon listing first, so the purchase path stays consistent with your existing site.",
          signedIn: "Signed in as",
          recorded: "This purchase will be recorded in your account order history.",
          shopifyGuest:
            "Sign in or create an account to view order records later. You can still continue to Shopify checkout.",
          amazonGuest:
            "Sign in or create an account to view order records later. You can still continue to Amazon as a guest.",
          shopifyContinue: "Continue to Shopify Checkout",
          amazonContinue: "Continue to Amazon",
          back: "Back to store",
        };

  const amazonUrl = useMemo(
    () => (cartItems.length > 0 ? getAmazonProductUrl(cartItems[0].product, market) : undefined),
    [cartItems, market],
  );

  const openCheckout = () => {
    if (shopifyConfig.useShopifyCheckout) {
      redirectToShopifyCheckout(cartItems, createOrder, clearCart, setCheckoutOpen);
    } else {
      if (!amazonUrl || typeof window === "undefined") return;
      const order = createOrder(cartItems, cartSubtotal);
      window.open(amazonUrl, "_blank", "noopener,noreferrer");

      if (order) {
        clearCart();
        setCheckoutOpen(false);
        toast.success(copy.saved);
        navigate({ to: "/account", search: { tab: "orders" } });
      }
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.button
            aria-label={copy.close}
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCheckoutOpen(false)}
          />
          <motion.div
            className="fixed inset-0 z-50 p-4 flex items-center justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div className="w-full max-w-2xl rounded-3xl border border-border bg-background shadow-2xl overflow-hidden">
              <div className="h-14 px-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold">{copy.title}</h2>
                </div>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="p-2 rounded-full hover:bg-accent transition"
                  aria-label={copy.close}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
                <div className="p-5 md:p-6 space-y-5">
                  <div className="rounded-2xl border border-border bg-muted/40 p-4 flex gap-3">
                    <div className="mt-0.5">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {shopifyConfig.useShopifyCheckout ? copy.shopifyTitle : copy.amazonTitle}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {shopifyConfig.useShopifyCheckout ? copy.shopifyBody : copy.amazonBody}
                      </p>
                    </div>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                      {copy.empty}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.product.slug}
                          className="flex items-center gap-3 rounded-2xl border border-border p-3"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-contain bg-white p-1"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium leading-tight">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {copy.quantity} {item.quantity} ·{" "}
                              {formatPrice(item.product.price, lang)}
                            </p>
                          </div>
                          {!shopifyConfig.useShopifyCheckout && (
                            <a
                              href={getAmazonProductUrl(item.product, market)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary transition"
                            >
                              Amazon
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t md:border-t-0 md:border-l border-border bg-muted/20 p-5 md:p-6 space-y-5">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                      {copy.summary}
                    </p>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-muted-foreground">{copy.subtotal}</span>
                      <span className="text-2xl font-semibold">
                        {formatPrice(cartSubtotal, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {shopifyConfig.useShopifyCheckout ? copy.shopifySecure : copy.amazonFlow}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {shopifyConfig.useShopifyCheckout
                        ? copy.shopifySecurity
                        : copy.amazonSecurity}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                    {currentUser ? (
                      <>
                        {copy.signedIn}{" "}
                        <span className="font-semibold text-foreground">{currentUser.name}</span>.
                        {copy.recorded}
                      </>
                    ) : (
                      <>{shopifyConfig.useShopifyCheckout ? copy.shopifyGuest : copy.amazonGuest}</>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      disabled={
                        shopifyConfig.useShopifyCheckout ? cartItems.length === 0 : !amazonUrl
                      }
                      onClick={openCheckout}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {shopifyConfig.useShopifyCheckout
                        ? copy.shopifyContinue
                        : copy.amazonContinue}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCheckoutOpen(false)}
                      className="w-full rounded-full border border-border px-6 py-3 font-medium hover:bg-accent transition"
                    >
                      {copy.back}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
