import { getRandomIntFromInterval } from "../helpers";

export class WorldPlace {
  type;
  isCurrent = false;

  constructor(isCurrent: boolean = false) {
    this.type = getRandomIntFromInterval(1, 5);
    this.isCurrent = isCurrent;
  }
}
