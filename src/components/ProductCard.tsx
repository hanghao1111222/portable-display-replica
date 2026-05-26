import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLang, formatPrice } from "@/i18n/LangContext";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t, lang } = useLang();
  const { addToCart, setCartOpen } = useCart();
  const [hover, setHover] = useState(false);
  const discount = Math.round((1 - product.price / product.compareAt) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-contain p-2 bg-white transition-opacity duration-500 ${hover && product.images[1] ? "opacity-0" : "opacity-100"}`}
            loading="lazy"
            width={1024}
            height={1024}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain p-2 bg-white transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-0"}`}
              loading="lazy"
              width={1024}
              height={1024}
            />
          )}
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-sale text-white text-xs font-bold tracking-wide px-2.5 py-1 rounded-full">
              −{discount}%
            </span>
          )}
          {product.badge && (
            <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold tracking-wide px-2.5 py-1 rounded-full">
              {product.badge[lang]}
            </span>
          )}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="block text-center bg-foreground text-background text-sm font-medium py-2.5 rounded-full">
              {t.grid.quickView}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-display font-semibold text-lg group-hover:text-primary transition">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                />
              ))}
            </div>
            <span>{product.rating.toFixed(2)} · ({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-sale">
              {formatPrice(product.price, lang)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAt, lang)}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={() => {
          addToCart(product, 1);
          setCartOpen(true);
          toast.success(t.grid.added, { description: product.name });
        }}
        className="mt-4 w-full px-5 py-3 rounded-full border border-border hover:border-primary text-sm font-medium transition"
      >
        {t.grid.addToCart}
      </button>
    </motion.div>
  );
}
