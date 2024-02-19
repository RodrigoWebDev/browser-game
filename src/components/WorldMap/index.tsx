import { PLACES, PLACE_TYPES, TPLACE_TYPES } from "../../constants/places";
import { Dynamic } from "solid-js/web";
import { QuestionMark } from "../Icons";
import { worldMapController, worldMapState } from "../../state/worldMap";
import { worldController } from "../../state/world";
import Button from "../Button";

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

const WorldMap = () => {
  const { mapWithVisibleArea } = worldMapController();

  console.log("=== mapWithVisibleArea() ===");
  console.log(mapWithVisibleArea());

  return (
    <div class="w-[70%] p-4">
      {mapWithVisibleArea()?.map((row: any) => {
        return (
          <div class="flex justify-between mb-2">
            {row.map((col: any) => {
              console.log({ row, col });
              if (col) {
                const myCol = MapLocations[col.index] as TPLACE_TYPES;
                const location = PLACES[myCol];
                return (
                  <div
                    tabIndex={0}
                    class={`w-[8%] bg-accent-content p-2 rounded ${
                      col.isCurrent && "animate-pulse"
                    }`}
                  >
                    <Dynamic component={location.IMAGES[0]} />
                  </div>
                );
              } else {
                return (
                  <div
                    class="w-[8%] bg-accent-content text-center p-2 rounded"
                    tabIndex={0}
                  >
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
