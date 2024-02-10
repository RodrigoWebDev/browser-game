export interface ICONTAINER {
  NAME: string;
  IMAGE: string;
  ITEMS_INSIDE: TCONTAINER_TYPES[];
}

export const CONTAINER = {
  WASTE_BASKET: {
    NAME: "Waste Basket",
    IMAGE: "🗑️",
    ITEMS_INSIDE: ["SAFETY_PIN"],
  },
};

export type TCONTAINER_TYPES = keyof typeof CONTAINER;
export const CONTAINER_TYPES = Object.keys(CONTAINER) as TCONTAINER_TYPES[];
