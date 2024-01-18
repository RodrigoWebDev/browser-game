import village0 from "../assets/backgrounds/village/0.webp";

//Enemies
import trollImg from "../assets/enemies/troll.webp";
import goblinImg from "../assets/enemies/goblin.webp";

import femaleVillager0 from "../assets/npcs/villagers/female/0.webp";
import maleVillager0 from "../assets/npcs/villagers/male/0.webp";

import dungeon0 from "../assets/backgrounds/dungeon/0.webp";
import dungeon1 from "../assets/backgrounds/dungeon/1.webp";

import tavern0 from "../assets/places/tavern/0.jpeg";

export const PLACE_TYPES = ["village", "dungeon"];
export const MIN_THINGS_NUMBER = 3;
export const MAX_THINGS_NUMBER = 11;

export type TGender = "MALE" | "FEMALE";

export const GENDERS: TGender[] = ["MALE", "FEMALE"];

export const NPC_NAMES = {
  MALE: ["James", "Robert", "Johh"],
  FEMALE: ["Mary", "Patricia", "Jennifer"],
};

export const THINGS = {
  VILLAGER: {
    MALE: {
      IMAGES: [maleVillager0],
    },
    FEMALE: {
      IMAGES: [femaleVillager0],
    },
  },
  TAVERN: {
    IMAGES: [tavern0],
  },
};

export interface IThing {
  TYPE: string;
  SUBTYPE: string;
}
export interface IPlace {
  ID: string;
  NAMES: string[];
  IMAGES: string[];
  THINGS: IThing[];
}

export const PLACES = {
  VILLAGE: {
    ID: "VILLAGE",
    NAMES: ["Cherry", "Blackberry", "Dark"],
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

export interface IEnemy {
  name: string;
  image: string;
  description: string;
}

export const ENEMIES = {
  TROLL: {
    name: "Troll",
    image: trollImg,
    description:
      "A troll is a being in Nordic folklore, including Norse mythology. In Old Norse sources, beings described as trolls dwell in isolated areas of rocks, mountains, or caves, live together in small family units, and are rarely helpful to human beings.",
  },
  GOBLIN: {
    name: "Goblin",
    image: goblinImg,
    description:
      "A goblin is a small, grotesque, monstrous creature that appears in the folklore of multiple European cultures. First attested in stories from the Middle Ages, they are ascribed conflicting abilities, temperaments, and appearances depending on the story and country of origin, ranging from mischievous household spirits to malicious, bestial thieves",
  },
};
