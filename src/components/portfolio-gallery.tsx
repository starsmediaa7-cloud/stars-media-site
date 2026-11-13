"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
} from "@/content/portfolio";
import { LitPhoto } from "./lit-photo";

type Filter = "all" | PortfolioCategory;

// Editorial rhythm: the frame changes size and height as the list goes on.
const layouts = [
  { span: "md:col-span-7", ratio: "aspect-[4/5]", offset: "" },
  { span: "md:col-span-5", ratio: "aspect-[3/4]", offset: "md:mt-28" },
  { span: "md:col-span-4", ratio: "aspect-[3/4]", offset: "" },
  { span: "md:col-span-8", ratio: "aspect-[4/3]", offset: "md:mt-16" },
  { span: "md:col-span-6", ratio: "aspect-[4/5]", offset: "" },
  { span: "md:col-span-6", ratio: "aspect-[1/1]", offset: "md:mt-24" },
];

export function PortfolioGallery() {
  const t = useTranslations();
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", ...portfolioCategories];
  const visible = portfolioItems.filter(
    (item) => filter === "all" || item.category === filter,
  );

  return (
    <div>
      <div className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]">
        <div
          role="group"
          aria-label={t("portfolioPage.filter")}
          className="inline-flex gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1.5"
        >
          {filters.map((key) => {
            const active = key === filter;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(key)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-[0.875rem] font-medium transition-colors [font-stretch:108%] ${
                  active ? "text-chalk" : "text-silver hover:text-chalk"
                }`}
              >
                {active ? <span className="plate absolute inset-0" /> : null}
                <span className="relative">{t(`portfolioPage.categories.${key}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-metal">{t("portfolioPage.empty")}</p>
      ) : (
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:mt-16 md:grid-cols-12">
          {visible.map((item, index) => {
            const layout = layouts[index % layouts.length];
            return (
              <li key={item.key} className={`${layout.span} ${layout.offset}`}>
                <figure>
                  <LitPhoto
                    src={item.image}
                    alt={t(`portfolioPage.alts.${item.key}`)}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    focus={item.focus}
                    color
                    className={`${layout.ratio} rounded-[1.75rem]`}
                  >
                    {item.demo ? (
                      <span data-glass className="glass glass-deep chip absolute left-4 top-4 z-[3]">
                        <span className="relative">{t("common.demo")}</span>
                      </span>
                    ) : null}
                  </LitPhoto>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="text-chalk">
                      {t(`portfolioPage.items.${item.key}`)}
                    </span>
                    <span className="t-label">
                      {t(`portfolioPage.categories.${item.category}`)}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
