import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { mediaCategoryKeys } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/cta-band";
import { PageIntro } from "@/components/page-intro";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media-center">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/media-center",
    title: t("meta.mediaCenter"),
    description: t("mediaPage.lead"),
  });
}

export default async function MediaCenterPage() {
  const t = await getTranslations("mediaPage");

  return (
    <>
      <PageIntro title={t("title")} lead={t("lead")} status={t("status")} />
      <section className="wrap">
        <ul className="row-list">
          {mediaCategoryKeys.map((key) => (
            <li key={key} className="row">
              <h2 className="row-name">{t(`categories.${key}.name`)}</h2>
              <p className="t-body">{t(`categories.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title={t("ctaTitle")} />
    </>
  );
}
