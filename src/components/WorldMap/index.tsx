import { PLACES, PLACE_TYPES, TPLACE_TYPES } from "../../constants/places";
import { Dynamic } from "solid-js/web";
import { QuestionMark } from "../Icons";
import { getRandomIntFromInterval } from "../../helpers";

enum MapLocations {
  "FOREST" = 1,
  "VILLAGE",
  "DUNGEON",
  "TAVERN",
  "CAVERN",
}

/* const worldMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]; */

const generateWorldMap = () => {
  const initialPosition = {
    x: 5,
    y: 5,
  };
  const worldSize = 11;
  const worldMap: any = [];

  for (let i = 0; i < worldSize; i++) {
    worldMap.push(Array.apply(null, Array(worldSize)).map(function () {}));
  }

  worldMap[initialPosition.y][initialPosition.x] = getRandomIntFromInterval(
    1,
    5
  );
  worldMap[initialPosition.y][initialPosition.x + 1] = getRandomIntFromInterval(
    1,
    5
  );
  worldMap[initialPosition.y][initialPosition.x - 1] = getRandomIntFromInterval(
    1,
    5
  );
  worldMap[initialPosition.y - 1][initialPosition.x] = getRandomIntFromInterval(
    1,
    5
  );
  worldMap[initialPosition.y - 1][initialPosition.x + 1] =
    getRandomIntFromInterval(1, 5);
  worldMap[initialPosition.y - 1][initialPosition.x - 1] =
    getRandomIntFromInterval(1, 5);
  worldMap[initialPosition.y + 1][initialPosition.x] = getRandomIntFromInterval(
    1,
    5
  );
  worldMap[initialPosition.y + 1][initialPosition.x + 1] =
    getRandomIntFromInterval(1, 5);
  worldMap[initialPosition.y + 1][initialPosition.x - 1] =
    getRandomIntFromInterval(1, 5);

  return worldMap;
};

const WorldMap = () => {
  return (
    <div class="w-[70%] p-4">
      {generateWorldMap().map((row: any) => {
        return (
          <div class="flex justify-between mb-2">
            {row.map((col: any) => {
              if (col) {
                const myCol = MapLocations[col] as TPLACE_TYPES;
                const location = PLACES[myCol];
                return (
                  <div class="w-[8%] bg-accent-content p-2 rounded">
                    <Dynamic component={location.IMAGES[0]} />
                  </div>
                );
              } else {
                return (
                  <div class="w-[8%] bg-accent-content text-center p-2 rounded">
                    <QuestionMark />
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WorldMap;
