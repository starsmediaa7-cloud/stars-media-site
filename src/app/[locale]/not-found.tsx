import { useTranslations } from "next-intl";
import { FrameLink } from "@/components/buttons";

export default function NotFound() {
  const t = useTranslations();
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-clip">
      <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 aspect-square w-[clamp(24rem,62vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black"
      />
      <div className="wrap relative flex flex-col items-center text-center">
        <h1 className="t-heading">{t("notFound.title")}</h1>
        <p className="mt-4 text-silver">{t("notFound.text")}</p>
        <FrameLink href="/" className="mt-8">
          {t("common.backHome")}
        </FrameLink>
      </div>
    </section>
  );
}
