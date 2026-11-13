import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { links, site } from "@/config/site";
import { serviceKeys } from "@/content/services";
import { photos } from "@/content/photos";
import { portfolioItems } from "@/content/portfolio";
import { pageMetadata } from "@/lib/seo";
import { FrameLink, GlassLink } from "@/components/buttons";
import { CtaBand } from "@/components/cta-band";
import { LitPhoto } from "@/components/lit-photo";
import { Parallax } from "@/components/parallax";
import { HeroRing } from "@/components/pitch";
import { Wordmark } from "@/components/wordmark";
import { PlatformShowcase } from "@/components/platform-showcase";

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    ...pageMetadata({
      locale,
      href: "/",
      title: t("siteTitle"),
      description: t("siteDescription"),
    }),
    title: { absolute: t("siteTitle") },
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const work = [portfolioItems[0], portfolioItems[2], portfolioItems[1]];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/stars-media-mark.png`,
    description: t("meta.siteDescription"),
    email: site.contact.email,
    sameAs: [links.instagram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />

      {/* ---------- hero ---------- */}
      <section className="hero">
        <div aria-hidden className="beam in-beam" />
        <div className="wrap hero-grid">
          <div className="relative z-10">
            <h1 className="t-hero">
              <span className="in-line">
                <span>{t("home.hero.line1")}</span>
              </span>
              <span className="in-line">
                <span style={delay(0.58)}>{t("home.hero.line2")}</span>
              </span>
            </h1>
            <p className="t-lead in-fade mt-7 max-w-[31ch]">{t("home.hero.sub")}</p>
            <div
              className="in-fade mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
              style={delay(1.1)}
            >
              <GlassLink href="/contact">{t("common.talk")}</GlassLink>
              <FrameLink href="/portfolio">{t("home.hero.secondary")}</FrameLink>
            </div>
          </div>

          <div className="hero-figure">
            <HeroRing part="back" className="hero-ring" />
            <Parallax distance={22} className="absolute inset-0">
              <LitPhoto
                src={photos.portrait}
                alt={t("home.hero.photoAlt")}
                sizes="(min-width: 900px) 480px, 78vw"
                focus="50% 12%"
                preload
                className="lit-deep hero-photo in-photo"
              />
            </Parallax>
            <HeroRing part="front" className="hero-ring" />
            <Parallax distance={-16} className="pointer-events-none absolute inset-0">
              <div
                aria-hidden
                data-glass
                className="glass hero-plate-b in-plate pointer-events-auto"
                style={delay(0.95)}
              />
              <div
                data-glass
                className="glass hero-plate-a in-plate pointer-events-auto"
              >
                <p className="relative text-[clamp(1.05rem,1.7vw,1.5rem)] font-light uppercase leading-none text-chalk [font-stretch:120%]">
                  {t("common.tagline")}
                </p>
                <Wordmark className="relative mt-3 h-[13px] w-auto text-silver" />
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ---------- what Stars Media is ---------- */}
      <section className="band">
        <div className="wrap grid gap-10 md:grid-cols-12">
          <p className="t-statement md:col-span-9">{t("home.intro.text")}</p>
          <div className="md:col-span-3 md:self-end md:justify-self-end">
            <Link href="/about" className="link-line">
              {t("home.intro.link")}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section className="band !pt-0">
        <div className="wrap">
          <h2 className="t-heading mb-10 md:mb-14">{t("home.services.title")}</h2>
          <ul className="row-list">
            {serviceKeys.map((key) => (
              <li key={key} className="row">
                <h3 className="row-name">{t(`services.${key}.name`)}</h3>
                <p className="t-body">{t(`services.${key}.benefit`)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 md:mt-16">
            <p className="t-heading max-w-[20ch]">{t("home.services.closing")}</p>
            <Link href="/services" className="link-line">
              {t("home.services.link")}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- work ---------- */}
      <section className="band">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div>
              <h2 className="t-heading">{t("home.work.title")}</h2>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] text-metal">
                {t("home.work.note")}
              </p>
            </div>
            <Link href="/portfolio" className="link-line">
              {t("home.work.link")}
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-10 md:gap-x-6">
            {work.map((item, index) => {
              const layout = [
                "col-span-12 md:col-span-5",
                "col-span-8 md:col-span-3 md:mt-80",
                "col-span-9 col-start-4 md:col-span-4 md:col-start-9 md:mt-24",
              ][index];
              const ratio = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[3/4]"][index];
              return (
                <figure key={item.key} className={layout}>
                  <Parallax distance={index === 0 ? 14 : index === 1 ? 30 : 46}>
                    <LitPhoto
                      src={item.image}
                      alt={t(`portfolioPage.alts.${item.key}`)}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      focus={item.focus}
                      color
                      className={`${ratio} rounded-[1.75rem]`}
                    >
                      <span data-glass className="glass glass-deep chip absolute left-4 top-4 z-[3]">
                        <span className="relative">{t("common.demo")}</span>
                      </span>
                    </LitPhoto>
                    <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                      <span className="text-chalk">
                        {t(`portfolioPage.items.${item.key}`)}
                      </span>
                      <span className="t-label">
                        {t(`portfolioPage.categories.${item.category}`)}
                      </span>
                    </figcaption>
                  </Parallax>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- athlete platform ---------- */}
      <section className="band">
        <div className="wrap">
          <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-12">
            <h2 className="t-heading md:col-span-6">{t("home.platform.title")}</h2>
            <div className="md:col-span-5 md:col-start-8">
              <p className="t-body">{t("home.platform.text")}</p>
              <p className="mt-3 text-[0.9375rem] text-metal">{t("home.platform.note")}</p>
            </div>
          </div>
          <PlatformShowcase photoAlt={t("home.platform.photoAlt")} />
        </div>
      </section>

      <CtaBand title={t("home.cta.title")} text={t("home.cta.text")} />
    </>
  );
}
