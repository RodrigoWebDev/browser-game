export interface IITEM {
  name: string;
  img: string;
  price: number;
  canEquip?: boolean;
  color?: string;
  consumableEffects?: {
    heal?: number | null;
  } | null;
  weight: number;
  key: TITEM_TYPES;
}

export const ITEM: Record<any, IITEM> = {
  HEALING_POTION: {
    name: "Healing potion",
    img: "💊",
    price: 12,
    consumableEffects: {
      heal: 50,
    },
    weight: 0.1,
    key: "HEALING_POTION",
  },
  RING: {
    name: "Ring",
    img: "💍",
    price: 58,
    canEquip: true,
    consumableEffects: null,
    weight: 0.1,
    key: "RING",
  },
  BONE: {
    name: "Bone",
    img: "☠️",
    price: 1,
    weight: 0.2,
    key: "BONE",
  },
  CLAWN: {
    name: "Clawn",
    img: "💅",
    price: 1,
    weight: 0.1,
    key: "CLAWN",
  },
  POISON: {
    name: "Poison",
    img: "🌡",
    color: "green",
    price: 3,
    weight: 0.1,
    key: "POISON",
  },
  ROPE: {
    name: "Rope",
    img: "🪢",
    price: 1,
    weight: 0.1,
    key: "ROPE",
  },
  FANG: {
    name: "Fang",
    img: "🦷",
    price: 1,
    weight: 0.1,
    key: "ROPE",
  },
};

export type TITEM_TYPES = keyof typeof ITEM;
export const ITEM_TYPES = Object.keys(ITEM) as TITEM_TYPES[];
