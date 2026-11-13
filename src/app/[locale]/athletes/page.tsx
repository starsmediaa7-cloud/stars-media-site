import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/cta-band";
import { LitPhoto } from "@/components/lit-photo";
import { PageIntro } from "@/components/page-intro";

const profileKeys = ["identity", "history", "stats", "media", "contact"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/athletes">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/athletes",
    title: t("meta.athletes"),
    description: t("athletesPage.lead"),
  });
}

export default async function AthletesPage() {
  const t = await getTranslations("athletesPage");

  return (
    <>
      <PageIntro title={t("title")} lead={t("lead")} status={t("status")} />

      <section className="wrap">
        <LitPhoto
          src={photos.profile}
          alt={t("photoAlt")}
          sizes="(min-width: 768px) 640px, 100vw"
          focus="50% 12%"
          lightFrom="22%"
          frame="inset-y-0 left-0 w-full md:w-[52%]"
          imageClassName="md:[mask-image:linear-gradient(to_left,transparent,#000_32%)]"
          className="lit-deep min-h-[44rem] rounded-[2.25rem] md:min-h-[36rem]"
        >
          <div className="relative z-[3] flex min-h-[inherit] items-end justify-end p-3 sm:p-6 md:items-center md:p-10">
            <div
              data-glass
              className="glass glass-deep w-full p-7 md:w-[30rem] md:p-9"
              style={{ ["--radius-plate" as string]: "1.75rem" }}
            >
              <h2 className="t-heading relative !text-[1.5rem]">{t("profileTitle")}</h2>
              <ul className="relative mt-5">
                {profileKeys.map((key) => (
                  <li
                    key={key}
                    className="border-t border-white/10 py-3.5 text-chalk first:border-t-0"
                  >
                    {t(`profile.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </LitPhoto>
      </section>

      <section className="band !pb-0">
        <div className="wrap grid gap-4 md:grid-cols-12">
          <h2 className="t-label md:col-span-3 md:pt-3">{t("rulesTitle")}</h2>
          <p className="t-statement md:col-span-9">{t("rules")}</p>
        </div>
      </section>

      <CtaBand title={t("ctaTitle")} />
    </>
  );
}
