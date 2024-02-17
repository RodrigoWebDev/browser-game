import { JSXElement, ValidComponent } from "solid-js";
import { Cave, Dungeon, Forest, Tavern, Village } from "../components/Icons";
import { IThing } from "../interfaces";

export interface IPlace {
  ID: string;
  NAMES: string[];
  IMAGES: ValidComponent[];
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
    IMAGES: [Village],
    THINGS: [
      {
        TYPE: "NPC",
        SUBTYPE: "VILLAGER",
      },
      {
        TYPE: "NPC",
        SUBTYPE: "MERCHANT",
      },
      {
        TYPE: "INNER_PLACE",
        SUBTYPE: "TAVERN",
      },
    ],
  },
  FOREST: {
    ID: "FOREST",
    NAMES: [
      "Whispering Woods",
      "Eternal Grove",
      "Sylvan Shadows",
      "Enchanted Canopy",
      "Mystic Thicket",
      "Verdant Vale",
      "Moonlit Arboretum",
      "Silent Woodland",
      "Eldritch Forest",
      "Ancient Foliage",
      "Twilight Glade",
      "Emerald Sanctuary",
      "Mossy Glade",
      "Haunted Copse",
      "Serene Sylvan",
      "Celestial Canopy",
      "Shrouded Grove",
      "Whisperwind Woods",
      "Feywood",
      "Starlight Grove",
      "Shadowed Thicket",
      "Ethereal Timberland",
      "Hallowed Wood",
      "Gloomwood",
      "Willowshade Forest",
      "Luminous Grove",
      "Glen of Whispers",
      "Ebonwood",
      "Elysian Canopy",
      "Glistening Glade",
      "Lost Woods",
      "Frostbark Forest",
      "Silvershade Woods",
      "Moonshadow Copse",
      "Crystal Clearing",
      "Witchwood",
      "Obsidian Grove",
      "Autumnal Canopy",
      "Sunfire Wood",
      "Dragonwood",
      "Whispering Pines",
      "Duskwood",
      "Wildwood",
      "Abyssal Thicket",
      "Frostfall Forest",
      "Willowisp Woodland",
      "Lunarwood",
      "Briarheart Grove",
    ],
    IMAGES: [Forest],
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
      {
        TYPE: "CONTAINER",
        SUBTYPE: "CHEST",
      },
    ],
  },
  DUNGEON: {
    ID: "DUNEGON",
    NAMES: ["Mistery", "Shadow", "Death", "Fear"],
    IMAGES: [Dungeon],
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
    IMAGES: [Tavern],
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
    IMAGES: [Cave],
    THINGS: [
      {
        TYPE: "ENEMY",
        SUBTYPE: "SPIDER",
      },
    ],
  },
};

export const INNER_PLACE = {
  DUNGEON: {
    ID: "DUNEGON",
    NAMES: ["Mistery", "Shadow", "Death", "Fear"],
    IMAGES: [Dungeon],
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
    IMAGES: [Tavern],
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
    IMAGES: [Cave],
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
