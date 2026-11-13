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
  const story = t.raw("story") as {
    title: string;
    tagline: string;
    intro: string[];
    sections: { title: string; paragraphs: string[] }[];
    closing: string;
  };

  const blocks = [
    { title: t("positioningTitle"), text: t("positioning") },
    { title: t("missionTitle"), text: t("mission") },
  ];

  return (
    <>
      <PageIntro title={t("title")} lead={t("lead")}>
        <div className="md:col-span-4 md:col-start-9">
          <Parallax distance={20}>
            <LitPhoto
              src={photos.closeUp}
              alt={t("photoAlt")}
              sizes="(min-width: 768px) 420px, 100vw"
              focus="45% 30%"
              className="in-photo aspect-[3/4] rounded-[2.25rem]"
            />
          </Parallax>
        </div>
      </PageIntro>

      {/* ---------- our story ---------- */}
      <section className="wrap pb-20 md:pb-32">
        <div className="grid gap-x-8 gap-y-10 border-t border-white/10 pt-14 md:grid-cols-12 md:pt-20">
          <h2 className="t-label md:col-span-3 md:pt-3">{story.title}</h2>
          <div className="md:col-span-9">
            <p className="t-statement max-w-[24ch]">{story.tagline}</p>
            <div className="mt-10 space-y-5 text-[1.125rem] leading-[1.7]">
              {story.intro.map((paragraph) => (
                <p key={paragraph} className="t-body">
                  {paragraph}
                </p>
              ))}
            </div>
            {story.sections.map((part) => (
              <div key={part.title} className="mt-14 border-t border-white/10 pt-10">
                <h3 className="row-name">{part.title}</h3>
                <div className="mt-5 space-y-5 text-[1.125rem] leading-[1.7]">
                  {part.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="t-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <p className="mt-16 max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-extralight leading-[1.1] tracking-[-0.02em] text-chalk [font-stretch:116%]">
              {story.closing}
            </p>
          </div>
        </div>
      </section>

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
