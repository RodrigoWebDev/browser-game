import { IITEM } from "./constants/items";
import { JSXElement } from "solid-js";

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
      img: JSXElement;
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

export interface IAction {
  name: string;
  click: (...args: any) => void;
}

export interface ISVG {
  fill?: string;
  className?: string;
  size?: number;
}

export interface IThing {
  TYPE: string;
  SUBTYPE: string;
}
