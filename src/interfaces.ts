import { IITEM } from "./constants/items";

export interface IPlayerActions {
  name: string;
  click: (...args: any) => void;
}

export interface ILocation {
  name: string;
  type: string;
  bg: string;
  things: {
    found: boolean;
    thing: {
      name: string;
      type: string;
      img: string;
      playerActions: IPlayerActions[];
    };
  }[];
}

export interface IWorld {
  locations: ILocation[];
}

export interface IItemShop extends IITEM {
  maxQuantity: number;
  quantitySelected: number;
}

export interface IInventoryItems extends IITEM {
  playerActions: IPlayerActions[];
}

export interface IUpdatePlayerArgs {
  money: number;
  inventoryItems: IITEM[];
}
