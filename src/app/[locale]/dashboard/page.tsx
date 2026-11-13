import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";
import { GlassLink } from "@/components/buttons";
import { LitPhoto } from "@/components/lit-photo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/dashboard">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/dashboard",
    title: t("meta.dashboard"),
    description: t("dashboardPage.text"),
    index: false,
  });
}

export default async function DashboardPage() {
  const t = await getTranslations();

  return (
    <section className="wrap pb-16 pt-24 md:pt-28">
      <LitPhoto
        src={photos.crest}
        alt={t("dashboardPage.photoAlt")}
        sizes="100vw"
        focus="50% 14%"
        frame="inset-y-0 left-0 w-full md:left-[27%] md:w-[46%]"
        imageClassName="md:[mask-image:linear-gradient(to_right,transparent,#000_22%,#000_78%,transparent)]"
        className="lit-deep min-h-[calc(100svh-10rem)] rounded-[2.25rem]"
      >
        <div className="relative z-[3] flex min-h-[inherit] items-end justify-center p-3 sm:p-8">
          <div
            data-glass
            className="glass glass-deep w-full max-w-[34rem] p-7 md:p-10"
            style={{ ["--radius-plate" as string]: "1.75rem" }}
          >
            <p className="t-label relative inline-flex items-center gap-2.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-flood" />
              {t("common.inDevelopment")}
            </p>
            <h1 className="t-heading relative mt-4">{t("dashboardPage.title")}</h1>
            <p className="relative mt-4 text-silver">{t("dashboardPage.text")}</p>
            <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <GlassLink href="/contact">{t("dashboardPage.cta")}</GlassLink>
              <Link href="/" className="link-line">
                {t("common.backHome")}
              </Link>
            </div>
          </div>
        </div>
      </LitPhoto>
    </section>
  );
}
