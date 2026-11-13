import Image from "next/image";
import type { PortfolioItem } from "@/content/portfolio";

/** A delivered piece, shown whole and in its own colours. */
export function WorkPiece({
  item,
  alt,
  category,
  demoLabel,
  sizes,
}: {
  item: PortfolioItem;
  alt: string;
  category: string;
  demoLabel: string;
  sizes: string;
}) {
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-[1.5rem] bg-graphite shadow-[0_0_0_1px_rgb(255_255_255/0.1)]"
        style={{ aspectRatio: `${item.image.width} / ${item.image.height}` }}
      >
        <Image
          src={item.image}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          className="object-cover"
        />
        {item.demo ? (
          <span data-glass className="glass glass-deep chip absolute left-4 top-4">
            <span className="relative">{demoLabel}</span>
          </span>
        ) : null}
      </div>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-chalk">{item.title}</span>
        <span className="t-label">{category}</span>
      </figcaption>
    </figure>
  );
}
