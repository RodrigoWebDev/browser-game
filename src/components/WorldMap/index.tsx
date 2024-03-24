import { Dynamic } from "solid-js/web";
import { PLACES, TPLACE_TYPES } from "../../constants/places";
import { worldMapController } from "../../state/worldMap";
import { QuestionMark } from "../Icons";
/* import { worldController } from "../../state/world";
import Button from "../Button"; */

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

  return (
    <div id="WorldMap" class="w-[70%] p-4">
      {mapWithVisibleArea()?.map((row: any) => {
        return (
          <div class="flex justify-between mb-2">
            {row.map((col: any) => {
              if (col) {
                const myCol = MapLocations[col.type] as TPLACE_TYPES;
                const location = PLACES[myCol];
                return (
                  <div
                    tabIndex={0}
                    class={`w-[8%] bg-accent-content p-2 rounded ${
                      col.isCurrent && "animate-pulse"
                    }`}
                    onClick={() => {}}
                  >
                    <Dynamic component={location.IMAGES[0]} />
                  </div>
                );
              } else {
                return (
                  <div
                    class="w-[8%] bg-accent-content text-center p-2 rounded"
                    tabIndex={0}
                    onClick={() => {}}
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
