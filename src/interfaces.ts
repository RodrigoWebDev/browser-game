import { IENEMY } from "./constants/enemies";
import { IITEM, TITEM_TYPES } from "./constants/items";

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
  quantity: number;
}

export interface IUpdatePlayerArgs {
  money: number;
  purchasedItems: IItemShop[];
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

export interface ISettings {
  isNightMode: boolean;
}

export interface IEnemyInCombat extends IENEMY {
  playerActions: IAction[];
}
