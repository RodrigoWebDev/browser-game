import village0 from "../assets/backgrounds/village/0.webp";
import dungeon0 from "../assets/backgrounds/dungeon/0.webp";
import enemy0 from "../assets/enemies/0.webp";
import villager0 from "../assets/npcs/0.webp";

export const MALE_NAMES = ["James", "Robert", "Johh"];
export const FEMALE_NAMES = ["Mary", "Patricia", "Jennifer"];
export const PLACE_TYPES = ["village", "dungeon"];
export const MIN_THINGS_NUMBER = 3;
export const MAX_THINGS_NUMBER = 11;

export const VILLAGERS = {
  IMAGES: [villager0],
};

export const DUNGEON = {
  NAMES: ["Mistery", "Shadow", "Death", "Fear"],
  IMAGES: [dungeon0],
  //THINGS: ["Enemy", "Chest", "Room"],
  THINGS: [
    {
      NAME: "ENEMY",
      IMAGES: [enemy0],
    },
  ],
};

export const VILLAGE = {
  NAMES: ["Cherry", "Blackberry", "Dark"],
  IMAGES: [village0],
  THINGS: [
    {
      NAME: "VILLAGER",
      IMAGES: [villager0],
    },
  ],
  //THINGS: ["Npc", "Tavern", "INN"],
};
