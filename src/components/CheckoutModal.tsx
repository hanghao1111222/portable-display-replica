import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useLang, formatPrice } from "@/i18n/LangContext";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ExternalLink, Lock, Package, ShieldCheck, X } from "lucide-react";

export function CheckoutModal() {
  const { isCheckoutOpen, setCheckoutOpen, cartItems, cartSubtotal } = useCart();
  const { lang } = useLang();

  const amazonUrl = useMemo(
    () => cartItems.find((item) => item.product.amazonUrl)?.product.amazonUrl,
    [cartItems],
  );

  const openAmazon = () => {
    if (!amazonUrl || typeof window === "undefined") return;
    window.open(amazonUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.button
            aria-label="Close checkout"
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
                  <h2 className="font-semibold">Checkout</h2>
                </div>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="p-2 rounded-full hover:bg-accent transition"
                  aria-label="Close checkout"
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
                      <p className="font-semibold">Purchase completes on Amazon</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We will open the product page in a new tab so you can finish the order
                        on Amazon, just like your reference flow.
                      </p>
                    </div>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
                      Your cart is empty.
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
                              Qty {item.quantity} · {formatPrice(item.product.price, lang)}
                            </p>
                          </div>
                          {item.product.amazonUrl && (
                            <a
                              href={item.product.amazonUrl}
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
                      Order summary
                    </p>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-2xl font-semibold">
                        {formatPrice(cartSubtotal, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Amazon checkout flow
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Product detail pages and checkout will open the Amazon listing first, so the
                      purchase path stays consistent with your existing site.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      disabled={!amazonUrl}
                      onClick={openAmazon}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Amazon
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCheckoutOpen(false)}
                      className="w-full rounded-full border border-border px-6 py-3 font-medium hover:bg-accent transition"
                    >
                      Back to store
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
