import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("anyking_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage on changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    try {
      localStorage.setItem("anyking_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cartItems.findIndex((item) => item.product.slug === product.slug);
    if (existingIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingIndex].quantity += quantity;
      saveCart(newItems);
    } else {
      saveCart([...cartItems, { product, quantity }]);
    }
  };

  const removeFromCart = (slug: string) => {
    const newItems = cartItems.filter((item) => item.product.slug !== slug);
    saveCart(newItems);
  };

  const updateQuantity = (slug: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(slug);
      return;
    }
    const newItems = cartItems.map((item) =>
      item.product.slug === slug ? { ...item, quantity: qty } : item
    );
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setCartOpen,
        isCheckoutOpen,
        setCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
