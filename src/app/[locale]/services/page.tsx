import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { serviceKeys } from "@/content/services";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";
import { GlassLink } from "@/components/buttons";
import { LitPhoto } from "@/components/lit-photo";
import { PageIntro } from "@/components/page-intro";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/services",
    title: t("meta.services"),
    description: t("servicesPage.lead"),
  });
}

export default async function ServicesPage() {
  const t = await getTranslations();

  return (
    <>
      <PageIntro title={t("servicesPage.title")} lead={t("servicesPage.lead")} />

      <section className="wrap">
        <ul className="row-list">
          {serviceKeys.map((key) => (
            <li key={key} className="row !items-start !py-10 md:!py-14">
              <h2 className="row-name md:text-[2.1rem]">{t(`services.${key}.name`)}</h2>
              <div>
                <p className="t-body text-[1.125rem]">{t(`services.${key}.summary`)}</p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="t-label">{t("servicesPage.benefitLabel")}</span>
                  <span className="text-chalk">{t(`services.${key}.benefit`)}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* how to hire — no public prices, the next step is a conversation */}
      <section className="band">
        <div className="wrap">
          <LitPhoto
            src={photos.upward}
            alt=""
            sizes="(min-width: 768px) 640px, 100vw"
            focus="50% 12%"
            frame="inset-y-0 right-0 w-full md:w-[52%]"
            imageClassName="md:[mask-image:linear-gradient(to_right,transparent,#000_32%)]"
            className="lit-deep min-h-[40rem] rounded-[2.25rem] md:min-h-[34rem]"
          >
            <div className="relative z-[3] flex min-h-[inherit] items-end p-3 sm:p-6 md:items-center md:p-10">
              <div
                data-glass
                className="glass glass-deep w-full p-7 md:w-[32rem] md:p-10"
                style={{ ["--radius-plate" as string]: "1.75rem" }}
              >
                <h2 className="t-heading relative">{t("servicesPage.ctaTitle")}</h2>
                <p className="t-label relative mt-7">{t("servicesPage.noteTitle")}</p>
                <p className="relative mt-2 text-silver">{t("servicesPage.note")}</p>
                <GlassLink href="/contact" className="mt-8">
                  {t("common.talk")}
                </GlassLink>
              </div>
            </div>
          </LitPhoto>
        </div>
      </section>
    </>
  );
}
