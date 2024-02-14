import { Chest } from "../components/Icons";

export interface ICONTAINER {
  NAME: string;
  IMAGE: string;
  ITEMS_INSIDE: TCONTAINER_TYPES[];
}

export const CONTAINER = {
  CHEST: {
    NAME: "Chest",
    IMAGE: Chest,
    ITEMS_INSIDE: ["SAFETY_PIN"],
  },
};

export type TCONTAINER_TYPES = keyof typeof CONTAINER;
export const CONTAINER_TYPES = Object.keys(CONTAINER) as TCONTAINER_TYPES[];
