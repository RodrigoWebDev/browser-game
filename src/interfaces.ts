import { /* JSXElement, */ ValidComponent } from "solid-js";
import { IENEMY } from "./constants/enemies";

export interface IPlayerActions {
  name: string;
  click: (...args: any) => void;
}

export interface Entity {
  NAME: string;
  IMAGE: string;
  DESCRIPTION: string;
  COLOR?: string;
  CAN_EQUIP?: boolean;
  CONSUMABLE_EFFECTS?: Record<any, any>;
  WEIGHT?: number;
  PRICE?: number;
  HP?: number;
  MAX_HP?: number;
  DROPS?: Record<string, any>[];
}

export interface ILocation {
  name: string;
  type: string;
  bg: ValidComponent;
  things: {
    id: number;
    found: boolean;
    thing: {
      name: string;
      type: string;
      img: any;
      playerActions: IPlayerActions[];
    };
  }[];
}

export interface IWorld {
  locations: ILocation[];
}

export interface IItemShop extends Entity {
  maxQuantity: number;
  quantitySelected: number;
}

export interface IInventoryItems extends Entity {
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

export interface ILevel {
  entities: any[];
}
