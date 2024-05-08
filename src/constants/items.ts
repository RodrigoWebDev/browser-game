import { Entity } from "../interfaces";

export const ITEM: Record<any, Entity> = {
  HEALING_POTION: {
    NAME: "Healing potion",
    DESCRIPTION: "",
    IMAGE: "💊",
    PRICE: 12,
    CONSUMABLE_EFFECTS: {
      heal: 50,
    },
    WEIGHT: 0.1,
  },
  RING: {
    NAME: "Ring",
    DESCRIPTION: "",
    IMAGE: "💍",
    PRICE: 58,
    CAN_EQUIP: true,
    WEIGHT: 0.1,
  },
  BONE: {
    NAME: "Bone",
    DESCRIPTION: "",
    IMAGE: "☠️",
    PRICE: 1,
    WEIGHT: 0.2,
  },
  CLAWN: {
    NAME: "Clawn",
    DESCRIPTION: "",
    IMAGE: "💅",
    PRICE: 1,
    WEIGHT: 0.1,
  },
  POISON: {
    NAME: "Poison",
    DESCRIPTION: "",
    IMAGE: "🌡",
    COLOR: "green",
    PRICE: 3,
    WEIGHT: 0.1,
  },
  ROPE: {
    NAME: "Rope",
    DESCRIPTION: "",
    IMAGE: "🪢",
    PRICE: 1,
    WEIGHT: 0.1,
  },
  FANG: {
    NAME: "Fang",
    DESCRIPTION: "",
    IMAGE: "🦷",
    PRICE: 1,
    WEIGHT: 0.1,
  },
};

export type TITEM_TYPES = keyof typeof ITEM;
export const ITEM_TYPES = Object.keys(ITEM) as TITEM_TYPES[];
