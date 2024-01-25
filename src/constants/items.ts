import potionImg from "../assets/consumables/potion0.webp";
import ringImg from "../assets/items/ring.webp";

export const ITEM = {
  HEALING_POTION: {
    NAME: "Healing potion",
    IMG: potionImg,
    PRICE: 12,
  },
  RING: {
    NAME: "Ring",
    IMG: ringImg,
    PRICE: 58,
  },
};

export type TITEM_TYPES = keyof typeof ITEM;
export const ITEM_TYPES = Object.keys(ITEM) as TITEM_TYPES[];
