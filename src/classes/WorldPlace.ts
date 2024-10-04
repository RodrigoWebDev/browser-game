import { JSXElement } from "solid-js";
import { getRandomIntFromInterval } from "../helpers";
import { IAction } from "../interfaces";

interface IInnerPlace {
  name: string;
  type: string;
  bg: any;
  things: {
    id: number;
    found: boolean;
    thing: {
      name: string;
      type: string;
      img: JSXElement;
      playerActions: IAction[];
    };
  }[];
}

export class WorldPlace {
  type;
  isCurrent = false;
  isVisible = false;
  info;

  constructor(
    isCurrent: boolean = false,
    isVisible: boolean = false,
    info?: IInnerPlace
  ) {
    this.type = getRandomIntFromInterval(1, 5);
    this.isCurrent = isCurrent;
    this.isVisible = isVisible;
    this.info = info;
  }
}
