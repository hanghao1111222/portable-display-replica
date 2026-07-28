import type { Lang } from "./strings";

export const COUNTRY_COOKIE_NAME = "anyking_country";
export const LANGUAGE_COOKIE_NAME = "anyking_lang";

const COUNTRY_HEADER_NAMES = [
  "cf-ipcountry",
  "x-vercel-ip-country",
  "cloudfront-viewer-country",
  "fly-client-country",
] as const;

function normalizeCountryCode(value: string | null | undefined): string | null {
  const country = value?.trim().toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : null;
}

export function detectRequestCountry(request: Request): string | null {
  const cloudflareCountry = normalizeCountryCode(
    (request as Request & { cf?: { country?: string } }).cf?.country,
  );
  if (cloudflareCountry) return cloudflareCountry;

  for (const headerName of COUNTRY_HEADER_NAMES) {
    const country = normalizeCountryCode(request.headers.get(headerName));
    if (country) return country;
  }

  return null;
}

export function createCountryCookie(country: string | null): string {
  const value = country ?? "ZZ";
  return `${COUNTRY_COOKIE_NAME}=${value}; Path=/; Max-Age=86400; SameSite=Lax`;
}

export function createLanguageCookie(lang: Lang): string {
  return `${LANGUAGE_COOKIE_NAME}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function parseLanguage(value: string | null | undefined): Lang | null {
  return value === "en" || value === "ja" ? value : null;
}

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

export function readCountryCookie(cookieHeader: string): string | null {
  const country = normalizeCountryCode(readCookieValue(cookieHeader, COUNTRY_COOKIE_NAME));
  return country === "ZZ" ? null : country;
}

export function readLanguageCookie(cookieHeader: string): Lang | null {
  return parseLanguage(readCookieValue(cookieHeader, LANGUAGE_COOKIE_NAME));
}

export function languageForCountry(country: string | null): Lang | null {
  if (!country) return null;
  return country === "JP" ? "ja" : "en";
}
