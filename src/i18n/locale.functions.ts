import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import {
  detectRequestCountry,
  languageForCountry,
  parseLanguage,
  readLanguageCookie,
} from "./geoLocale";

export const getInitialLanguage = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  const requestedLanguage = parseLanguage(new URL(request.url).searchParams.get("lang"));
  const selectedLanguage = readLanguageCookie(request.headers.get("cookie") ?? "");

  return (
    requestedLanguage ??
    selectedLanguage ??
    languageForCountry(detectRequestCountry(request)) ??
    "en"
  );
});
