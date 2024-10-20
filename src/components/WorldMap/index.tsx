import { Dynamic } from "solid-js/web";
import { PLACES, TPLACE_TYPES } from "../../constants/places";
import { worldMapController, worldMapState } from "../../state/worldMap";
import { QuestionMark } from "../Icons";
import { E_LOCATIONS } from "../../enums";
import ToolTip from "../Tooltip";
import { Game, IPlaceTwo } from "../../constants";
import { WorldPlace } from "../../classes/WorldPlace";
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
  const [worldMap] = worldMapState;

  return (
    <div id="WorldMap" class="w-[70%] p-4">
      {worldMap()?.map((row: any, rowIndex: number) => {
        return (
          <div class="flex justify-between mb-2">
            {row.map((col: WorldPlace, colIndex: number) => {
              /* if (col) { */
              const place = Game.Places[col.type] as unknown as IPlaceTwo;
              let worldLocation = place

              return (
                <ToolTip
                  //tabIndex={0}
                  text={col?.info?.name || `Unknown`}
                  className={`w-[8%] bg-accent-content p-2 rounded ${
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
                    <Dynamic component={worldLocation.images[0]} />
                  ) : (
                    <QuestionMark />
                  )}
                </ToolTip>
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
