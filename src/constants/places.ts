import village0 from "../assets/backgrounds/village/0.webp";
import dungeon0 from "../assets/backgrounds/dungeon/0.webp";
import dungeon1 from "../assets/backgrounds/dungeon/1.webp";
import { IThing } from "./things";

export interface IPlace {
  ID: string;
  NAMES: string[];
  IMAGES: string[];
  THINGS: IThing[];
}

export const PLACES = {
  VILLAGE: {
    ID: "VILLAGE",
    NAMES: ["Cherry", "Blackberry", "Dark", "Bumbling Boar"],
    IMAGES: [village0],
    THINGS: [
      {
        TYPE: "NPC",
        SUBTYPE: "VILLAGER",
      },
      {
        TYPE: "STRUCTURE",
        SUBTYPE: "TAVERN",
      },
    ],
  },
  DUNGEON: {
    ID: "DUNEGON",
    NAMES: ["Mistery", "Shadow", "Death", "Fear"],
    IMAGES: [dungeon0, dungeon1],
    THINGS: [
      {
        TYPE: "ENEMY",
        SUBTYPE: "ENEMY",
      },
    ],
  },
};

export type TPLACE_TYPES = keyof typeof PLACES;
export const PLACE_TYPES = Object.keys(PLACES) as TPLACE_TYPES[];
