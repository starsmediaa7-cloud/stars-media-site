"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
} from "@/content/portfolio";
import { WorkPiece } from "./work-piece";

type Filter = "all" | PortfolioCategory;

// posters sit three to a row, each column starting at a different height
const offsets = ["", "md:mt-20", "md:mt-8"];

export function PortfolioGallery() {
  const t = useTranslations();
  const [filter, setFilter] = useState<Filter>("all");
  // only categories that already have work are offered
  const used = portfolioCategories.filter((category) =>
    portfolioItems.some((item) => item.category === category),
  );
  const filters: Filter[] = ["all", ...used];
  const visible = portfolioItems.filter(
    (item) => filter === "all" || item.category === filter,
  );

  return (
    <div>
      {used.length > 1 ? (
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
      ) : null}

      {visible.length === 0 ? (
        <p className="mt-16 text-metal">{t("portfolioPage.empty")}</p>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-14 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
          {visible.map((item, index) => (
            <li key={item.id} className={offsets[index % 3]}>
              <WorkPiece
                item={item}
                alt={t("portfolioPage.artAlt", { title: item.title })}
                category={t(`portfolioPage.categories.${item.category}`)}
                demoLabel={t("common.demo")}
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
