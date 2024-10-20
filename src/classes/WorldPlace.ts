import { Game } from "../constants";
import { getRandomIntFromInterval, getRandomItemFromArray } from "../helpers";
import { IPlaceInfo } from "../interfaces";

export class WorldPlace {
  type: "Cavern";
  isCurrent = false;
  isVisible = false;
  info;

  constructor(
    isCurrent: boolean = false,
    isVisible: boolean = false,
    info?: IPlaceInfo
  ) {
    const places = Object.entries(Game.Places)
    const randomPlace = getRandomItemFromArray(places)
    const type = randomPlace[0]
    //this.type = getRandomIntFromInterval(1, 4);
    this.type = type;
    this.isCurrent = isCurrent;
    this.isVisible = isVisible;
    this.info = info;
  }
}
