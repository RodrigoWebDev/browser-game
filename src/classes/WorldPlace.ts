import { getRandomIntFromInterval } from "../helpers";

export class WorldPlace {
  index;
  isCurrent = false;

  constructor(isCurrent: boolean = false) {
    this.index = getRandomIntFromInterval(1, 5);
    this.isCurrent = isCurrent;
  }
}
