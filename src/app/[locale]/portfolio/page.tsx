import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { portfolioItems } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";
import { PortfolioGallery } from "@/components/portfolio-gallery";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/portfolio",
    title: t("meta.portfolio"),
    description: t("portfolioPage.lead"),
  });
}

export default async function PortfolioPage() {
  const t = await getTranslations();

  return (
    <>
      <PageIntro title={t("portfolioPage.title")} lead={t("portfolioPage.lead")} />
      <section className="wrap pb-10">
        {portfolioItems.some((item) => item.demo) ? (
          <p className="mb-10 max-w-[58ch] border-l border-white/25 pl-5 text-[0.9375rem] text-silver">
            {t("portfolioPage.notice")}
          </p>
        ) : null}
        <PortfolioGallery />
      </section>
      <CtaBand title={t("home.cta.title")} text={t("home.cta.text")} />
    </>
  );
}
