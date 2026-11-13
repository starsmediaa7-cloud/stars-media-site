import type { StaticImageData } from "next/image";
import { photos } from "./photos";

export const portfolioCategories = [
  "graphics",
  "matchday",
  "branding",
  "video",
  "special",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioItem = {
  /** key of the title/alt text in messages → portfolioPage.items / alts */
  key:
    | "presentation"
    | "portrait"
    | "identity"
    | "cover"
    | "number"
    | "celebration";
  category: PortfolioCategory;
  image: StaticImageData;
  /** true while the piece is a placeholder and not a delivered project */
  demo: boolean;
  /** object-position for the crop */
  focus?: string;
};

/**
 * Replace these with real projects as they are cleared for publication.
 * Keep `demo: true` on anything that is not a delivered piece.
 */
export const portfolioItems: PortfolioItem[] = [
  { key: "presentation", category: "graphics", image: photos.portrait, demo: true, focus: "50% 22%" },
  { key: "number", category: "special", image: photos.number, demo: true, focus: "50% 30%" },
  { key: "portrait", category: "matchday", image: photos.profile, demo: true, focus: "50% 20%" },
  { key: "identity", category: "branding", image: photos.crest, demo: true, focus: "50% 25%" },
  { key: "cover", category: "video", image: photos.upward, demo: true, focus: "50% 20%" },
  { key: "celebration", category: "graphics", image: photos.gesture, demo: true, focus: "50% 28%" },
];
