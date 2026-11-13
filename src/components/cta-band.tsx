import { useTranslations } from "next-intl";
import { GlassLink } from "./buttons";

/**
 * Closing call to action, set on the centre circle: the kick-off spot.
 */
export function CtaBand({ title, text }: { title: string; text?: string }) {
  const t = useTranslations("common");
  return (
    <section className="relative overflow-clip">
      <div className="relative grid min-h-[34rem] place-items-center py-24 md:min-h-[44rem]">
        {/* halfway line */}
        <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
        {/* centre circle */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 aspect-square w-[clamp(24rem,62vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black"
        />
        <div className="wrap relative flex flex-col items-center text-center">
          <h2 className="t-heading max-w-[18ch] md:text-[2.75rem]">{title}</h2>
          {text ? <p className="t-body mt-5 max-w-[34ch]">{text}</p> : null}
          <GlassLink href="/contact" className="mt-9">
            {t("talk")}
          </GlassLink>
        </div>
      </div>
    </section>
  );
}
