import { TITEM_TYPES } from "./items";

export interface IENEMY {
  NAME: string;
  IMAGE: string;
  DESCRIPTION: string;
  HP: number;
  MAX_HP: number;
  DROPS: TITEM_TYPES[];
}

export const ENEMY = {
  TROLL: {
    NAME: "Troll",
    IMAGE: "🧌",
    DESCRIPTION:
      "A troll is a being in Nordic folklore, including Norse mythology. In Old Norse sources, beings described as trolls dwell in isolated areas of rocks, mountains, or caves, live together in small family units, and are rarely helpful to human beings.",
    HP: 100,
    MAX_HP: 100,
    DROPS: ["BONE", "FANG"],
  },
  GOBLIN: {
    NAME: "Goblin",
    IMAGE: "👺",
    DESCRIPTION:
      "A goblin is a small, grotesque, monstrous creature that appears in the folklore of multiple European cultures. First attested in stories from the Middle Ages, they are ascribed conflicting abilities, temperaments, and appearances depending on the story and country of origin, ranging from mischievous household spirits to malicious, bestial thieves",
    HP: 200,
    MAX_HP: 200,
    DROPS: ["BONE", "FANG"],
  },
  SPIDER: {
    NAME: "Giant Spider",
    IMAGE: "🕷️",
    DESCRIPTION: "A spider",
    HP: 100,
    MAX_HP: 100,
    DROPS: ["POISON"],
  },
};

export type TENEMY_TYPES = keyof typeof ENEMY;
export const ENEMIY_TYPES = Object.keys(ENEMY) as TENEMY_TYPES[];
