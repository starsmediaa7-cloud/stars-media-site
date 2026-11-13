import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-BR", "es"],
  defaultLocale: "en",
  // Every language has its own prefix: /en, /pt-br, /es
  localePrefix: {
    mode: "always",
    prefixes: { "pt-BR": "/pt-br" },
  },
});

export type AppLocale = (typeof routing.locales)[number];

export const localeLabels: Record<AppLocale, { short: string; name: string }> =
  {
    en: { short: "EN", name: "English" },
    "pt-BR": { short: "PT", name: "Português" },
    es: { short: "ES", name: "Español" },
  };
