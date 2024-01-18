import Npc from "./classes/Npc";

export interface IPlayerActions {
  name: string;
  click: (index: number) => void;
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
