import { JSXElement } from "solid-js";

//Enemies
import trollSvg from "../components/svgIcons/troll/";
import goblinSvg from "../components/svgIcons/goblin";
import spiderSvg from "../components/svgIcons/spider";

export interface IENEMY {
  NAME: string;
  IMAGE: (props: any) => JSXElement;
  DESCRIPTION: string;
}

export const ENEMY = {
  TROLL: {
    NAME: "Troll",
    IMAGE: trollSvg,
    DESCRIPTION:
      "A troll is a being in Nordic folklore, including Norse mythology. In Old Norse sources, beings described as trolls dwell in isolated areas of rocks, mountains, or caves, live together in small family units, and are rarely helpful to human beings.",
  },
  GOBLIN: {
    NAME: "Goblin",
    IMAGE: goblinSvg,
    DESCRIPTION:
      "A goblin is a small, grotesque, monstrous creature that appears in the folklore of multiple European cultures. First attested in stories from the Middle Ages, they are ascribed conflicting abilities, temperaments, and appearances depending on the story and country of origin, ranging from mischievous household spirits to malicious, bestial thieves",
  },
  SPIDER: {
    NAME: "Spider",
    IMAGE: spiderSvg,
    DESCRIPTION: "A spider",
  },
};

export type TENEMY_TYPES = keyof typeof ENEMY;
export const ENEMIY_TYPES = Object.keys(ENEMY) as TENEMY_TYPES[];
