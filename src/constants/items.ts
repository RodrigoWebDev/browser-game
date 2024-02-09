export const ITEM = {
  HEALING_POTION: {
    name: "Healing potion",
    img: "💊",
    price: 12,
    consumableEffects: {
      heal: 50,
    },
    weight: 0.2,
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
    img: "🦴",
    price: 1,
    weight: 0.2,
    key: "BONE",
  },
  FANG: {
    name: "Fang",
    img: "🦷",
    price: 1,
    weight: 0.1,
    key: "FANG",
  },
};

export interface IITEM {
  name: string;
  img: string;
  price: number;
  canEquip?: boolean;
  consumableEffects?: {
    heal?: number | null;
  } | null;
  weight: number;
  key: TITEM_TYPES;
}

export type TITEM_TYPES = keyof typeof ITEM;
export const ITEM_TYPES = Object.keys(ITEM) as TITEM_TYPES[];
