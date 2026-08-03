import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { detectRequestCountry, parseLanguage, readLanguageCookie } from "./geoLocale";
import { marketForCountry, marketFromSearch, readMarketCookie, type Market } from "@/market/market";
import type { Lang } from "./strings";

type InitialLocale = {
  lang: Lang;
  market: Market;
};

export const getInitialLocale = createServerFn({ method: "GET" }).handler((): InitialLocale => {
  const request = getRequest();
  const requestUrl = new URL(request.url);
  const cookieHeader = request.headers.get("cookie") ?? "";
  const requestedLanguage = parseLanguage(requestUrl.searchParams.get("lang"));
  const requestedMarket = marketFromSearch(requestUrl.search);
  const selectedLanguage = readLanguageCookie(cookieHeader);
  const selectedMarket = readMarketCookie(cookieHeader);
  const detectedCountry = detectRequestCountry(request);
  const market = requestedMarket ?? selectedMarket ?? marketForCountry(detectedCountry);
  const lang = requestedLanguage ?? selectedLanguage ?? (market === "JP" ? "ja" : "en");

  return { lang, market };
});
