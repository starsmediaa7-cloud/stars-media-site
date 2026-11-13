import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { links, site } from "@/config/site";
import { currentYear } from "@/lib/year";
import { BrandMark } from "./brand-mark";
import { Wordmark } from "./wordmark";
import { CornerArc } from "./pitch";

const footerLink =
  "text-silver transition-colors hover:text-chalk inline-block py-1";

export async function SiteFooter() {
  const t = await getTranslations();
  const year = await currentYear();

  return (
    <footer className="relative overflow-clip border-t border-white/10">
      <CornerArc corner="bl" className="absolute bottom-0 left-0 hidden w-12 md:block" />
      <CornerArc corner="br" className="absolute bottom-0 right-0 hidden w-12 md:block" />

      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label={site.name} className="inline-flex items-center gap-3 text-chalk">
            <BrandMark size={30} />
            <Wordmark className="h-[22px] w-auto" />
          </Link>
          <p className="mt-6 text-[clamp(1.5rem,2.6vw,2.25rem)] font-extralight uppercase leading-tight text-chalk [font-stretch:120%]">
            {t("common.tagline")}
          </p>
        </div>

        <nav aria-label={t("footer.agency")} className="md:col-span-2">
          <h2 className="t-label mb-4">{t("footer.agency")}</h2>
          <ul>
            <li><Link className={footerLink} href="/about">{t("nav.about")}</Link></li>
            <li><Link className={footerLink} href="/services">{t("nav.services")}</Link></li>
            <li><Link className={footerLink} href="/portfolio">{t("nav.portfolio")}</Link></li>
            <li><Link className={footerLink} href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </nav>

        <nav aria-label={t("footer.platform")} className="md:col-span-2">
          <h2 className="t-label mb-4">{t("footer.platform")}</h2>
          <ul>
            <li><Link className={footerLink} href="/athletes">{t("nav.athletes")}</Link></li>
            <li><Link className={footerLink} href="/media-center">{t("nav.mediaCenter")}</Link></li>
            <li><Link className={footerLink} href="/dashboard">{t("nav.athleteArea")}</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="t-label mb-4">{t("footer.contact")}</h2>
          <ul>
            <li><a className={footerLink} href={links.email}>{site.contact.email}</a></li>
            <li><a className={footerLink} href={links.whatsapp} target="_blank" rel="noreferrer">{site.contact.whatsappDisplay}</a></li>
            <li><a className={footerLink} href={links.instagram} target="_blank" rel="noreferrer">@{site.contact.instagram}</a></li>
          </ul>
        </div>
      </div>

      <div className="wrap pb-10">
        <p className="text-[0.8125rem] text-metal">{t("footer.rights", { year })}</p>
      </div>
    </footer>
  );
}
