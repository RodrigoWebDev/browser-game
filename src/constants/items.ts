export const ITEM = {
  HEALING_POTION: {
    name: "Healing potion",
    img: "💊",
    price: 12,
    canEquip: false,
    consumableEffects: {
      heal: 50,
    },
    weight: 0.2,
  },
  RING: {
    name: "Ring",
    img: "💍",
    price: 58,
    canEquip: true,
    consumableEffects: null,
    weight: 0.1,
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
  weight: number;
}

export type TITEM_TYPES = keyof typeof ITEM;
export const ITEM_TYPES = Object.keys(ITEM) as TITEM_TYPES[];
