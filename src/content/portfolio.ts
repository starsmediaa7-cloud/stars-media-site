import type { StaticImageData } from "next/image";
import pulo from "@/assets/work/matchday-pulo-futsal-sao-paulo.jpg";
import pequenoMestre from "@/assets/work/matchday-sao-paulo-pequeno-mestre.jpg";
import wimpro from "@/assets/work/matchday-sao-paulo-wimpro.jpg";
import goiatubaBranco from "@/assets/work/matchday-goiatuba-operario-branco.jpg";
import goiatubaAzul from "@/assets/work/matchday-goiatuba-operario-azul.jpg";

export const portfolioCategories = [
  "graphics",
  "matchday",
  "branding",
  "video",
  "special",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioItem = {
  id: string;
  /** shown as the caption; match names stay the same in every language */
  title: string;
  category: PortfolioCategory;
  image: StaticImageData;
  /** true only for a placeholder that is not a delivered project */
  demo: boolean;
};

/**
 * Delivered pieces, in the order they appear. The first three also
 * appear on the home page. To add one: put the file in
 * src/assets/work/, import it above and add an entry here.
 */
export const portfolioItems: PortfolioItem[] = [
  { id: "pulo-futsal-sao-paulo", title: "Pulo Futsal vs São Paulo", category: "matchday", image: pulo, demo: false },
  { id: "sao-paulo-pequeno-mestre", title: "São Paulo vs Pequeno Mestre", category: "matchday", image: pequenoMestre, demo: false },
  { id: "sao-paulo-wimpro", title: "São Paulo vs Wimpro", category: "matchday", image: wimpro, demo: false },
  { id: "goiatuba-operario-1", title: "Goiatuba vs C.E. Operário", category: "matchday", image: goiatubaBranco, demo: false },
  { id: "goiatuba-operario-2", title: "Goiatuba vs C.E. Operário", category: "matchday", image: goiatubaAzul, demo: false },
];
