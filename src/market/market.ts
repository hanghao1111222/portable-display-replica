export type Market = "US" | "JP";

export const MARKET_COOKIE_NAME = "anyking_market";

export type MarketConfig = {
  code: Market;
  locale: "en-US" | "ja-JP";
  currency: "USD" | "JPY";
  amazonDomain: "www.amazon.com" | "www.amazon.co.jp";
  amazonStoreUrl: string;
};

const MARKET_CONFIGS: Record<Market, MarketConfig> = {
  US: {
    code: "US",
    locale: "en-US",
    currency: "USD",
    amazonDomain: "www.amazon.com",
    amazonStoreUrl:
      "https://www.amazon.com/stores/AnykingOfficial/page/6E88A3C7-FAEA-46BA-92FE-78B580F52232?lp_asin=B0GJS4XGDJ&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto",
  },
  JP: {
    code: "JP",
    locale: "ja-JP",
    currency: "JPY",
    amazonDomain: "www.amazon.co.jp",
    amazonStoreUrl: "https://www.amazon.co.jp/s?k=Anyking",
  },
};

function readCookieValue(cookieHeader: string, name: string): string | null {
  const prefix = `${name}=`;
  return (
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(prefix))
      ?.slice(prefix.length) ?? null
  );
}

export function parseMarket(value: string | null | undefined): Market | null {
  const market = value?.trim().toUpperCase();
  return market === "US" || market === "JP" ? market : null;
}

export function marketForCountry(country: string | null): Market {
  return country === "JP" ? "JP" : "US";
}

export function marketFromSearch(search: string): Market | null {
  const params = new URLSearchParams(search);
  const explicitMarket = parseMarket(params.get("market"));
  if (explicitMarket) return explicitMarket;

  // Keep the permanent Japanese help-center QR URL backwards compatible.
  return params.get("lang") === "ja" ? "JP" : null;
}

export function createMarketCookie(market: Market): string {
  return `${MARKET_COOKIE_NAME}=${market}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function readMarketCookie(cookieHeader: string): Market | null {
  return parseMarket(readCookieValue(cookieHeader, MARKET_COOKIE_NAME));
}

export function getMarketConfig(market: Market): MarketConfig {
  return MARKET_CONFIGS[market];
}

type AmazonProduct = {
  name: string;
  amazonUrl?: string;
  amazonUrls?: Partial<Record<Market, string>>;
};

function validAmazonUrl(url: string | undefined): string | null {
  return url && url !== "#" ? url : null;
}

export function getAmazonProductUrl(product: AmazonProduct, market: Market): string {
  const configuredUrl = validAmazonUrl(product.amazonUrls?.[market]);
  if (configuredUrl) return configuredUrl;

  // `amazonUrl` is the legacy US field and remains supported for saved carts.
  if (market === "US") {
    const legacyUrl = validAmazonUrl(product.amazonUrl);
    if (legacyUrl) return legacyUrl;
  }

  const { amazonDomain } = getMarketConfig(market);
  return `https://${amazonDomain}/s?k=${encodeURIComponent(product.name)}`;
}
