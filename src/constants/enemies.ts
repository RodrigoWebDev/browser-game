import { ValidComponent } from "solid-js";
import { Goblin, Spider, Troll, Wolf } from "../components/Icons";
import { TITEM_TYPES } from "./items.ts";

export interface IENEMY {
  NAME: string;
  IMAGE: ValidComponent;
  DESCRIPTION: string;
  HP: number;
  MAX_HP: number;
  DROPS: TITEM_TYPES[];
  color?: string;
}

export const ENEMY = {
  TROLL: {
    NAME: "Troll",
    IMAGE: Troll,
    DESCRIPTION:
      "Troll",
    HP: 100,
    MAX_HP: 100,
    DROPS: ["BONE", "FANG"],
  },
  GOBLIN: {
    NAME: "Goblin",
    IMAGE: Goblin,
    DESCRIPTION:
      "Goblin",
    HP: 200,
    MAX_HP: 200,
    DROPS: ["BONE", "FANG"],
  },
  SPIDER: {
    NAME: "Spider",
    IMAGE: Spider,
    DESCRIPTION: "A spider",
    HP: 100,
    MAX_HP: 100,
    DROPS: ["POISON"],
  },
  WOLF: {
    NAME: "Wolf",
    IMAGE: Wolf,
    DESCRIPTION: "A wolf",
    HP: 100,
    MAX_HP: 100,
    DROPS: ["BONE", "FANG"],
  },
};

export type TENEMY_TYPES = keyof typeof ENEMY;
export const ENEMIY_TYPES = Object.keys(ENEMY) as TENEMY_TYPES[];
