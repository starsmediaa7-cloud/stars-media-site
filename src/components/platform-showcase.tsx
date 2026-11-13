"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { platformKeys, type PlatformKey } from "@/content/services";
import { photos } from "@/content/photos";
import { LitPhoto } from "./lit-photo";

/**
 * The athlete platform, shown the way it will be used: a glass menu
 * over photography. Choosing an area explains what it will do.
 */
export function PlatformShowcase({ photoAlt }: { photoAlt: string }) {
  const t = useTranslations();
  const [active, setActive] = useState<PlatformKey>("discover");

  return (
    <LitPhoto
      src={photos.crest}
      alt={photoAlt}
      sizes="(min-width: 1024px) 720px, 100vw"
      focus="50% 16%"
      frame="inset-y-0 right-0 w-full md:w-[58%]"
      imageClassName="md:[mask-image:linear-gradient(to_right,transparent,#000_30%)]"
      className="lit-deep min-h-[44rem] rounded-[2.25rem] md:min-h-[38rem]"
    >
      <div className="relative z-[3] flex min-h-[inherit] items-end p-3 sm:p-6 md:items-center md:p-10">
        <div
          data-glass
          className="glass glass-deep w-full p-2.5 md:w-[24rem]"
          style={{ ["--radius-plate" as string]: "1.75rem" }}
        >
          <div role="tablist" aria-orientation="vertical" className="relative flex flex-col">
            {platformKeys.map((key) => {
              const selected = key === active;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={`platform-tab-${key}`}
                  aria-selected={selected}
                  aria-controls="platform-panel"
                  onClick={() => setActive(key)}
                  onMouseEnter={() => setActive(key)}
                  onFocus={() => setActive(key)}
                  className={`relative rounded-[1.1rem] px-4 py-3 text-left text-[1.0625rem] font-medium transition-colors [font-stretch:108%] ${
                    selected ? "text-chalk" : "text-silver"
                  }`}
                >
                  {selected ? (
                    <span className="plate absolute inset-0 !rounded-[1.1rem]" />
                  ) : null}
                  <span className="relative">{t(`platform.${key}.name`)}</span>
                </button>
              );
            })}
          </div>
          <div
            id="platform-panel"
            role="tabpanel"
            aria-labelledby={`platform-tab-${active}`}
            className="relative mt-2 border-t border-white/10 px-4 pb-4 pt-4"
          >
            <p className="min-h-[6.5rem] text-[0.9375rem] leading-relaxed text-silver">
              {t(`platform.${active}.text`)}
            </p>
            <p className="t-label mt-3 flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-flood" />
              {t("common.inDevelopment")}
            </p>
          </div>
        </div>
      </div>
    </LitPhoto>
  );
}
