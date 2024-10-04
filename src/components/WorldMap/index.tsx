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
  const { mapWithVisibleArea, move } = worldMapController();

  return (
    <div id="WorldMap" class="w-[70%] p-4">
      {mapWithVisibleArea()?.map((row: any, rowIndex: number) => {
        return (
          <div class="flex justify-between mb-2">
            {row.map((col: any, colIndex: number) => {
              /* if (col) { */

              let myCol: TPLACE_TYPES;
              let worldLocation: any;

              if (col) {
                myCol = MapLocations[col.type] as TPLACE_TYPES;
                worldLocation = PLACES[myCol];
              }

              return (
                <div
                  tabIndex={0}
                  class={`w-[8%] bg-accent-content p-2 rounded ${
                    col.isCurrent && "animate-pulse"
                  }`}
                  onClick={() => {
                    move(
                      {
                        x: colIndex,
                        y: rowIndex,
                      },
                      worldLocation
                    );
                  }}
                >
                  {col.isVisible ? (
                    <Dynamic component={worldLocation.IMAGES[0]} />
                  ) : (
                    <QuestionMark />
                  )}
                </div>
              );
              /* } else {
                return (
                  <div
                    class="w-[8%] bg-accent-content text-center p-2 rounded"
                    tabIndex={0}
                    onClick={() => {
                      move({
                        x: colIndex,
                        y: rowIndex,
                      });
                    }}
                  >
                    <QuestionMark />
                  </div>
                );
              } */
            })}
          </div>
        );
      })}
    </div>
  );
};

export default WorldMap;
