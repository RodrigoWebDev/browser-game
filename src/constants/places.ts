import village0 from "../assets/backgrounds/village/0.webp";
import dungeon0 from "../assets/backgrounds/dungeon/0.webp";
import dungeon1 from "../assets/backgrounds/dungeon/1.webp";
import tavernOutside0 from "../assets/places/tavern/outside.png";
import tavernInside1 from "../assets/places/tavern/inside.jpeg";
import caveInside0 from "../assets/places/cave/inside0.jpeg";
import forest from "../assets/backgrounds/forest/0.jpg";
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
    NAMES: [
      "Aurora Village",
      "Shadow City",
      "Moonlight Hamlet",
      "Twilight Village",
      "Dragon's Port",
      "Forgotten Valley",
      "Dark Mountain",
      "Mysteries Forest",
      "Serpent Tower",
      "Windswept Rock",
      "Fantasy Isle",
      "Despair Swamp",
      "Moon Camp",
      "Storm Peak",
      "Castle Haven",
      "Enchanted Hollow",
      "Eagle's Nest",
      "Mystic Haven",
      "Silvermere",
      "Emerald Grove",
      "Whispering Pines",
      "Silent Harbor",
      "Lost Haven",
      "Dragon's Roost",
      "Golden Sands",
      "Starlight Refuge",
      "Crimson Citadel",
      "Mystic Hollow",
      "Ebon Keep",
      "Duskwood",
      "Frostfall",
      "Raven's Perch",
      "Sunset Ridge",
      "Everfrost Village",
      "Thunderpeak",
      "Ironhold",
      "Shrouded Haven",
      "Moonshadow Vale",
      "Whitestone Village",
      "Wildwood",
      "Winter's Edge",
      "Stormwatch",
      "Silvermoon",
      "Frostholm",
      "Whisperwind",
      "Sable Point",
      "Harmony Hollow",
    ],
    IMAGES: [village0],
    THINGS: [
      {
        TYPE: "NPC",
        SUBTYPE: "VILLAGER",
      },
      {
        TYPE: "INNER_PLACE",
        SUBTYPE: "TAVERN",
      },
    ],
  },
  FOREST: {
    ID: "FOREST",
    NAMES: ["Floresta"],
    IMAGES: [forest],
    THINGS: [
      {
        TYPE: "NPC",
        SUBTYPE: "TRAVELLER",
      },
      {
        TYPE: "ENEMY",
        SUBTYPE: "GOBLIN",
      },
      {
        TYPE: "ENEMY",
        SUBTYPE: "SPIDER",
      },
      {
        TYPE: "INNER_PLACE",
        SUBTYPE: "CAVERN",
      },
      {
        TYPE: "INNER_PLACE",
        SUBTYPE: "DUNGEON",
      },
    ],
  },
};

export const INNER_PLACE = {
  DUNGEON: {
    ID: "DUNEGON",
    NAMES: ["Mistery", "Shadow", "Death", "Fear"],
    IMAGES: [dungeon0, dungeon1],
    THINGS: [
      {
        TYPE: "ENEMY",
        SUBTYPE: "TROLL",
      },
      {
        TYPE: "ENEMY",
        SUBTYPE: "GOBLIN",
      },
    ],
  },
  TAVERN: {
    ID: "TAVERN",
    NAMES: [
      "The Curious Flame",
      "The Nostalgic Wood Elf",
      "The Excited Hand",
      "The Ivory Cliff",
      "The Simple Pepper",
      "The Boar Hat",
      "The Obedient",
      "The Old Crocodile",
      "The Bloody Barricade",
      "The Terrific Mice",
      "The Next Best Whisper",
    ],
    IMAGES: [tavernOutside0],
    THINGS: [
      {
        TYPE: "NPC",
        SUBTYPE: "VILLAGER",
      },
    ],
  },
  CAVERN: {
    ID: "CAVERN",
    NAMES: ["Mistery", "Shadow", "Death", "Fear"],
    IMAGES: [caveInside0],
    THINGS: [
      {
        TYPE: "ENEMY",
        SUBTYPE: "SPIDER",
      },
    ],
  },
};

export type TPLACE_TYPES = keyof typeof PLACES;
export const PLACE_TYPES = Object.keys(PLACES) as TPLACE_TYPES[];

export type TINNER_PLACE_TYPES = keyof typeof INNER_PLACE;
export const INNER_PLACE_TYPES = Object.keys(
  INNER_PLACE
) as TINNER_PLACE_TYPES[];
