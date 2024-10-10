import { /* JSXElement, */ ValidComponent } from "solid-js";
import { IENEMY } from "./constants/enemies";
import { IITEM } from "./constants/items.ts";

export interface IPlayerActions {
  name: string;
  click: (...args: any) => void;
}

export interface IThings {
    id: number;
    found: boolean;
    thing: {
      name: string;
      type: string;
      img: any;
      playerActions: IAction[];
      fill: string
    };
}

export interface IPlaceInfo {
  name: string;
  type: string;
  bg: ValidComponent;
  things: IThings[]
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

export interface Vector2 {
  x: number;
  y: number;
}
