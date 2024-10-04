import { Dynamic } from "solid-js/web";
import { PLACES, TPLACE_TYPES } from "../../constants/places";
import { worldMapController, worldMapState } from "../../state/worldMap";
import { QuestionMark } from "../Icons";
import { E_LOCATIONS } from "../../enums";
/* import { placeController } from "../../state/world";
import Button from "../Button"; */

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
  const { move } = worldMapController();
  const [worldMap] = worldMapState

  return (
    <div id="WorldMap" class="w-[70%] p-4">
      {worldMap()?.map((row: any, rowIndex: number) => {
        return (
          <div class="flex justify-between mb-2">
            {row.map((col: any, colIndex: number) => {
              /* if (col) { */

              let myCol: TPLACE_TYPES;
              let worldLocation: any;

              if (col) {
                myCol = E_LOCATIONS[col.type] as TPLACE_TYPES;
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
