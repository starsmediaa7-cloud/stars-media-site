"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, routing } from "@/i18n/routing";
import { BrandMark } from "./brand-mark";

const items = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/athletes", key: "athletes" },
  { href: "/media-center", key: "mediaCenter" },
  { href: "/contact", key: "contact" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function LanguageSwitch({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`flex items-center rounded-full bg-white/[0.06] p-0.5 ${className}`}
    >
      {routing.locales.map((code) => {
        const current = code === locale;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            hrefLang={code}
            lang={code}
            aria-label={localeLabels[code].name}
            aria-current={current ? "true" : undefined}
            className={`relative rounded-full px-2.5 py-1.5 text-[0.75rem] font-semibold [font-stretch:112%] transition-colors ${
              current ? "text-chalk" : "text-metal hover:text-chalk"
            }`}
          >
            {current ? <span className="plate absolute inset-0" /> : null}
            <span className="relative">{localeLabels[code].short}</span>
          </Link>
        );
      })}
    </div>
  );
}

function PersonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5.2" r="2.7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M2.6 14c.5-2.7 2.7-4.3 5.4-4.3s4.9 1.6 5.4 4.3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex justify-center px-3 pt-3 sm:pt-4">
        <nav
          data-glass
          aria-label={t("main")}
          className="glass glass-deep pointer-events-auto flex w-full max-w-[26rem] items-center justify-between gap-1 p-1.5 lg:w-auto lg:max-w-none"
          style={{ ["--radius-plate" as string]: "999px" }}
        >
          <Link
            href="/"
            aria-label="Stars Media"
            className="relative grid h-10 w-11 shrink-0 place-items-center rounded-full"
            onClick={() => setOpen(false)}
          >
            <BrandMark size={22} />
          </Link>

          <ul className="relative hidden items-center lg:flex">
            {items.map(({ href, key }) => {
              const active = isActive(pathname, href);
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-4 py-2.5 text-[0.875rem] font-medium [font-stretch:108%] transition-colors ${
                      active ? "text-chalk" : "text-silver hover:text-chalk"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-plate"
                        className="plate absolute inset-0"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    <span className="relative">{t(key)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative flex items-center gap-1.5">
            <LanguageSwitch className="lg:ml-2" />
            <Link
              href="/dashboard"
              className="hidden h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-[0.8125rem] font-medium text-chalk transition-colors [font-stretch:108%] hover:border-white/40 hover:bg-white/[0.06] lg:inline-flex"
            >
              <PersonIcon />
              {t("athleteArea")}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
              className="grid h-10 w-11 place-items-center rounded-full text-chalk lg:hidden"
            >
              <span className="sr-only">{open ? t("close") : t("menu")}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* small screens: a sheet of glass over the page */}
      <div
        id="site-menu"
        hidden={!open}
        className="pointer-events-auto fixed inset-0 -z-10 lg:hidden"
      >
        <div
          className="glass glass-deep glass-sheet absolute inset-0 overflow-y-auto"
          style={{ ["--radius-plate" as string]: "0px" }}
        >
          <ul className="relative flex min-h-full flex-col justify-center gap-1 px-[var(--gutter)] pb-10 pt-24">
            {items.map(({ href, key }) => {
              const active = isActive(pathname, href);
              return (
                <li key={key}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-[2rem] font-light leading-tight [font-stretch:112%] ${
                      active ? "text-chalk" : "text-metal"
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            <li className="mt-8">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-[0.9375rem] font-medium text-chalk"
              >
                <PersonIcon />
                {t("athleteArea")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
