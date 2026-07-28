import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { detectRequestCountry, languageForCountry, readLanguageCookie } from "./geoLocale";

export const getInitialLanguage = createServerFn({ method: "GET" }).handler(() => {
  const request = getRequest();
  const selectedLanguage = readLanguageCookie(request.headers.get("cookie") ?? "");

  return selectedLanguage ?? languageForCountry(detectRequestCountry(request)) ?? "en";
});
