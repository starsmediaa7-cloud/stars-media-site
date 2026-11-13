import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // An explicit locale (e.g. from a Server Action) wins; otherwise read the
  // [locale] segment that sits above the root layout.
  const candidate = locale ?? (await rootLocale());
  const resolved = hasLocale(routing.locales, candidate)
    ? candidate
    : routing.defaultLocale;

  return {
    locale: resolved,
    timeZone: "UTC",
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
