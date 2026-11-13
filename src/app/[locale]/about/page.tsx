import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/cta-band";
import { LitPhoto } from "@/components/lit-photo";
import { PageIntro } from "@/components/page-intro";
import { Parallax } from "@/components/parallax";

const steps = ["understand", "define", "produce", "publish"] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/about",
    title: t("meta.about"),
    description: t("about.lead"),
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const story = t("story").trim();

  const blocks = [
    { title: t("positioningTitle"), text: t("positioning") },
    { title: t("missionTitle"), text: t("mission") },
    // The agency's story appears as soon as the text is filled in /messages.
    ...(story ? [{ title: t("storyTitle"), text: story }] : []),
  ];

  return (
    <>
      <PageIntro title={t("title")} lead={t("lead")}>
        <div className="md:col-span-4 md:col-start-9">
          <Parallax distance={20}>
            <LitPhoto
              src={photos.number}
              alt={t("photoAlt")}
              sizes="(min-width: 768px) 420px, 100vw"
              focus="50% 30%"
              className="in-photo aspect-[3/4] rounded-[2.25rem]"
            />
          </Parallax>
        </div>
      </PageIntro>

      <section className="wrap">
        <dl className="border-t border-white/10">
          {blocks.map((block) => (
            <div
              key={block.title}
              className="grid gap-3 border-b border-white/10 py-12 md:grid-cols-12 md:py-16"
            >
              <dt className="t-label md:col-span-3 md:pt-3">{block.title}</dt>
              <dd className="t-statement whitespace-pre-line md:col-span-9">
                {block.text}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band">
        <div className="wrap">
          <h2 className="t-heading mb-12 md:mb-16">{t("howTitle")}</h2>
          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} className="relative border-t border-white/20 pt-6">
                <span
                  aria-hidden
                  className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full border border-white/60 bg-black"
                />
                <p className="t-label">{index + 1}</p>
                <h3 className="row-name mt-3">{t(`steps.${step}.name`)}</h3>
                <p className="mt-3 max-w-[30ch]">{t(`steps.${step}.text`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap pb-8">
        <h2 className="t-label mb-5">{t("valuesTitle")}</h2>
        <p className="max-w-[26ch] text-[clamp(1.75rem,4.4vw,4rem)] font-extralight leading-[1.08] tracking-[-0.02em] text-chalk [font-stretch:116%] md:max-w-none">
          {t("values")}
        </p>
      </section>

      <CtaBand title={t("ctaTitle")} />
    </>
  );
}
