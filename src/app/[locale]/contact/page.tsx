import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { links, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    href: "/contact",
    title: t("meta.contact"),
    description: t("contactPage.lead"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");

  const channels = [
    { label: t("email"), value: site.contact.email, href: links.email, external: false },
    { label: t("whatsapp"), value: site.contact.whatsappDisplay, href: links.whatsapp, external: true },
    { label: t("instagram"), value: `@${site.contact.instagram}`, href: links.instagram, external: true },
  ];

  return (
    <>
      <PageIntro title={t("title")} lead={t("lead")} />
      <section className="wrap grid gap-16 pb-28 md:grid-cols-12 md:gap-8 md:pb-40">
        <div className="relative md:col-span-7">
          <ContactForm />
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <h2 className="t-label mb-2">{t("channelsTitle")}</h2>
          <ul>
            {channels.map((channel) => (
              <li key={channel.label} className="border-b border-white/10 py-5">
                <p className="t-label mb-1.5">{channel.label}</p>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="break-all text-[1.25rem] font-light text-chalk transition-colors [font-stretch:108%] hover:text-flood"
                >
                  {channel.value}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
