import Npc from "./classes/Npc";

export interface IPlayerActions {
  name: string;
  click: (index: number) => void;
}

export interface IEnemy {
  name: string;
  description: string;
  img: string;
  takeDamage: boolean;
  hp: number;
  maxHp: number;
  color: number;
  playerActions: IPlayerActions[];
}

export interface ILocation {
  name: string;
  type: string;
  bg: string;
  things: {
    found: boolean;
    thing: Npc;
  }[];
}

export interface IWorld {
  locations: ILocation[];
}
