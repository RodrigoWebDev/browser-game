import { getRandomIntFromInterval } from "../helpers";
import { IPlaceInfo } from "../interfaces";

export class WorldPlace {
  type;
  isCurrent = false;
  isVisible = false;
  info;

  constructor(
    isCurrent: boolean = false,
    isVisible: boolean = false,
    info?: IPlaceInfo
  ) {
    this.type = getRandomIntFromInterval(1, 5);
    this.isCurrent = isCurrent;
    this.isVisible = isVisible;
    this.info = info;
  }
}
