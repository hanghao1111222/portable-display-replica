import { useCart } from "@/context/CartContext";
import { useLang, formatPrice } from "@/i18n/LangContext";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();
  const { lang } = useLang();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="h-16 border-b border-border px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">Your Cart</h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-accent transition"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.slug} className="rounded-2xl border border-border p-3">
                    <div className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-contain bg-white p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium leading-tight">{item.product.name}</p>
                        <p className="text-sm text-primary mt-1">
                          {formatPrice(item.product.price, lang)}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center border border-border rounded-full">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.slug, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.slug, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.slug)}
                            className="p-2 rounded-full hover:bg-accent transition text-muted-foreground hover:text-destructive"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-lg">{formatPrice(cartSubtotal, lang)}</span>
              </div>
              <button
                disabled={cartItems.length === 0}
                onClick={() => {
                  setCartOpen(false);
                  navigate({ to: "/checkout" });
                }}
                className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
