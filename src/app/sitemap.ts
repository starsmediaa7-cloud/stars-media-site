import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/config/site";

const pages = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/athletes",
  "/media-center",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: site.url + getPathname({ locale, href }),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, site.url + getPathname({ locale: l, href })]),
        ),
      },
    })),
  );
}
