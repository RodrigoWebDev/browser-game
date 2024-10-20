import { ValidComponent } from "solid-js";
import { Game } from ".";

export type TGender = "Male" | "Female";
export type TPlaceTypes = "Cavern";
interface IEntity {
  id: number;
  hp: number;
  maxHp: number;
  description: string;
  drops: string[];
  img: ValidComponent;
  type: string;
}

export interface IItem2 extends IEntity {
  name?: string;
  weight: number;
  color?: string;
  price?: number;
  canEquip?: boolean;
  consumableEffects?: {
    heal?: number | null;
  } | null;
  key: string
  quantity: number
}

export interface IThingTwo {
  type: string;
  subtype: string;
}

export interface IPlaceTwo {
  type: string;
  names: string[];
  images: string[];
  things: IThingTwo[];
}

export type TEnemyTypes = keyof typeof Game.Enemy;
export type TContainerTypes = keyof typeof Game.Containers;
export type TNpcTypes = keyof typeof Game.Npc;
export type TInnerPlaceTypes = keyof typeof Game.InnerPlace;
export type TItemTypes = keyof typeof Game.Item;