//Enemies
import trollImg from "../assets/enemies/troll.webp";
import goblinImg from "../assets/enemies/goblin.webp";

export type TEnemyTypes = "TROLL" | "GOBLIN";

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
