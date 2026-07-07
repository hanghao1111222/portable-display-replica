import { shopifyConfig } from "@/config/shopify";
import { CartItem } from "@/context/CartContext";

/**
 * Generates a Shopify Cart Permalink URL for direct checkout.
 * Format: https://{domain}/cart/{variant_id}:{quantity},{variant_id}:{quantity}
 */
export function getShopifyCartUrl(items: { variantId: string; quantity: number }[]): string {
  const domain = shopifyConfig.domain.replace(/https?:\/\//, "").replace(/\/$/, "");
  const lineItems = items
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(",");
  
  return `https://${domain}/cart/${lineItems}`;
}

/**
 * Handles the checkout transition: creates a local backup order, clears the cart,
 * and redirects the browser directly to the Shopify Cart Checkout page.
 */
export function redirectToShopifyCheckout(
  cartItems: CartItem[],
  createOrder: (items: any[], subtotal: number) => any,
  clearCart: () => void,
  setCheckoutOpen?: (open: boolean) => void
) {
  if (cartItems.length === 0 || typeof window === "undefined") return;

  // Extract products containing a Shopify variant ID
  const shopifyItems = cartItems
    .map((item) => {
      const variantId = (item.product as any).shopifyVariantId;
      return {
        variantId,
        quantity: item.quantity,
      };
    })
    .filter((item) => !!item.variantId);

  if (shopifyItems.length === 0) {
    console.warn("No products in the cart have shopifyVariantId configured. Redirecting anyway with fallback.");
    return;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // 1. Create a local order in user's profile database so it is logged
  createOrder(
    cartItems.map((item) => ({
      product: {
        slug: item.product.slug,
        name: item.product.name,
        price: item.product.price,
        images: item.product.images,
      },
      quantity: item.quantity,
    })),
    subtotal
  );

  // 2. Clear the cart
  clearCart();

  // 3. Close the modal if present
  if (setCheckoutOpen) {
    setCheckoutOpen(false);
  }

  // 4. Generate link & redirect
  const checkoutUrl = getShopifyCartUrl(shopifyItems);
  window.location.replace(checkoutUrl);
}
