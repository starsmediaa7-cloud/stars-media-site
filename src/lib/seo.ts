import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { site } from "@/config/site";

type Href = Parameters<typeof getPathname>[0]["href"];

/** Canonical + hreflang for one page, in every language. */
export function localizedAlternates(locale: AppLocale, href: Href) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = site.url + getPathname({ locale: l, href });
  }
  languages["x-default"] =
    site.url + getPathname({ locale: routing.defaultLocale, href });

  return {
    canonical: site.url + getPathname({ locale, href }),
    languages,
  } satisfies Metadata["alternates"];
}

export function pageMetadata({
  locale,
  href,
  title,
  description,
  index = true,
}: {
  locale: AppLocale;
  href: Href;
  title: string;
  description: string;
  index?: boolean;
}): Metadata {
  const alternates = localizedAlternates(locale, href);
  return {
    title,
    description,
    alternates,
    robots: index ? undefined : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: site.name,
      locale: locale.replace("-", "_"),
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}
