import potionImg from "../assets/consumables/potion0.webp";
import ringImg from "../assets/items/ring.webp";

export const ITEM = {
  HEALING_POTION: {
    name: "Healing potion",
    img: potionImg,
    price: 12,
    canEquip: false,
    consumableEffects: {
      heal: 50,
    },
  },
  RING: {
    name: "Ring",
    img: ringImg,
    price: 58,
    canEquip: true,
    consumableEffects: null,
  },
};

export interface IITEM {
  name: string;
  img: string;
  price: number;
  canEquip: boolean;
  consumableEffects?: {
    heal?: number | null;
  } | null;
}

export type TITEM_TYPES = keyof typeof ITEM;
export const ITEM_TYPES = Object.keys(ITEM) as TITEM_TYPES[];
