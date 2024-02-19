import { createSignal, onMount } from "solid-js";
import { playerState } from "./player";
import { WorldPlace } from "../classes/WorldPlace";

export const worldMapState = createSignal<any[][]>([]);

export const worldMapController = () => {
  const [worldMap, setWorldMap] = worldMapState;
  const [player, setPlayer] = playerState;

  const generatedWorldMap = () => {
    const worldSize = 11;
    const _worldMap: any = [];

    for (let i = 0; i < worldSize; i++) {
      _worldMap.push(Array.apply(null, Array(worldSize)).map(function () {}));
    }

    return setWorldMap(_worldMap);
  };

  const mapWithVisibleArea = () => {
    if (!worldMap().length) return;

    const pos = player().worldPosition;
    const prevPos = player().previousWorldPosition;
    const tilesToShow = [
      {
        x: pos.x,
        y: pos.y,
      }, //Center
      {
        x: pos.x + 1,
        y: pos.y,
      }, //Right
      {
        x: pos.x - 1,
        y: pos.y,
      }, //Left
      {
        x: pos.x,
        y: pos.y + 1,
      }, //Down
      {
        x: pos.x,
        y: pos.y - 1,
      }, //Up
      {
        x: pos.x + 1,
        y: pos.y - 1,
      }, //Up/Righ
      {
        x: pos.x - 1,
        y: pos.y - 1,
      }, //Up/Left
      {
        x: pos.x - 1,
        y: pos.y + 1,
      }, //Down/Left
      {
        x: pos.x + 1,
        y: pos.y + 1,
      }, //Down/Right
    ];

    //Update visible tiles
    tilesToShow.forEach((tile) => {
      worldMap()[tile.y][tile.x] = !worldMap()[tile.y][tile.x]
        ? new WorldPlace()
        : worldMap()[tile.y][tile.x];
    });

    if (prevPos) {
      worldMap()[prevPos.y][prevPos.x].isCurrent = false;
    }

    //Set current position
    worldMap()[pos.y][pos.x].isCurrent = true;

    return worldMap();
  };

  onMount(() => {
    generatedWorldMap();

    document.addEventListener("click", () => {
      console.log("clique");

      setPlayer((val) => ({
        ...val,
        previousWorldPosition: {
          x: val.worldPosition.x,
          y: val.worldPosition.y,
        },
      }));

      setPlayer((val) => ({
        ...val,
        worldPosition: {
          x: val.worldPosition.x + 1,
          y: val.worldPosition.y + 1,
        },
      }));
    });
  });

  return {
    mapWithVisibleArea,
  };
};
