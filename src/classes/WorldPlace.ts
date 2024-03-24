import { getRandomIntFromInterval } from "../helpers";

export class WorldPlace {
  type;
  isCurrent = false;
  isVisible = false;

  constructor(isCurrent: boolean = false, isVisible: boolean = false) {
    this.type = getRandomIntFromInterval(1, 5);
    this.isCurrent = isCurrent;
    this.isVisible = isVisible;
  }
}
