import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import { createEffect, createSignal, onMount } from "solid-js";
import Player from "./components/Player";
import WorldMap from "./components/WorldMap";
import { modalState } from "./state/modal";
import { settingsController } from "./state/settings";
import { mockPlayerPos, placeController, placeState } from "./state/place";
import { playerState } from "./state/player";
import { combatController, combatState } from "./state/combat";
import Card from "./components/Card";
import { Dynamic } from "solid-js/web";
import ToolTip from "./components/Tooltip";
import DropDown from "./components/Dropwdown";
import SwordsSvg from "./components/svgIcons/swords";
import ArrowSvg from "./components/svgIcons/arrow";
import Explore from "./components/svgIcons/explore";
import { E_SCREENS } from "./enums";
import { worldMapState } from "./state/worldMap";

const cardContainerStyle = "w-[25%] mr-2 mb-2";

function Game() {
  const [player] = playerState;
  const [modal /* setModal */] = modalState;
  const [place] = placeState;
  const [worldMap] = worldMapState;
  const [combat] = combatState;
  const _combatController = combatController();
  const _placeController = placeController();
  const _settingsController = settingsController();


  onMount(() => {
    _settingsController.loadSettings();
    _placeController.createPlaces();

    /* const playerWorldPosition = player().worldPosition
    const playerWorldTileInfo = worldMap()[playerWorldPosition.y][playerWorldPosition.x].info
    console.log("🚀 ~ Game ~ playerWorldTileInfo:", playerWorldTileInfo) */
  });

  createEffect(() => {
    _settingsController.updateSettings();
  });

  return (
    <div class="flex justify-between h-screen max-w-[1360px] mx-auto">
      <aside class="w-[29%] p-4">
        <Player />
      </aside>

      {place().screen === E_SCREENS.PLACE && place().things.length && (
        <main class="w-[69%]">
          <div class="h-full bg-contain">
            {player().isInCombat ? (
              <div id="combat" class="p-4 bg-black/40">
                <div id="enemies" class="flex mb-4">
                  {combat().enemies.map((enemy) => {
                    const enemyIsDead = enemy.hp <= 0;
                    return (
                      <div
                        class={`${cardContainerStyle} ${
                          enemyIsDead ? "pointer-events-none brightness-50" : ""
                        }`}
                      >
                        <Card
                          img={<Dynamic component={enemy.refference.IMAGE} />}
                          imgHueRotation={0}
                          imgBrighter={false}
                          title={enemy.refference.NAME}
                          subTitle="ENEMY"
                          footer={
                            <>
                              <ToolTip
                                text={`HP: ${enemy.hp}`}
                                className="flex items-center"
                              >
                                <div class="mr-2">HP:</div>
                                <progress
                                  class="progress progress-error"
                                  value={enemy.hp}
                                  max={enemy.maxHp}
                                ></progress>
                              </ToolTip>
                              <div data-id="actions" class="flex">
                                <DropDown
                                  trigger={
                                    <Button>
                                      <SwordsSvg className="w-[16px] text-white" />
                                    </Button>
                                  }
                                  items={enemy.playerActions.map((item) => (
                                    <li>
                                      <Button
                                        onClick={() => {
                                          _combatController.attackEnemy(
                                            item,
                                            enemy
                                          );
                                          _combatController.winCombat();
                                          _placeController.removeThingFromLocation(
                                            enemy.id
                                          );
                                        }}
                                      >
                                        {item.name}
                                      </Button>
                                    </li>
                                  ))}
                                />
                              </div>
                            </>
                          }
                        />
                      </div>
                    );
                  })}
                </div>
                <div id="player-actions" class="flex">
                  <div>
                    <Button
                      onClick={() => {
                        _combatController.escapeFromCombat();
                      }}
                    >
                      Fugir do combate
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="exploration"
                class="min-h-[600px] w-full bg-black/40 p-4"
              >
                <h2 class="text-[20px]">
                  You are in{" "}
                  <strong>{_placeController.getCurrentLocation().name}</strong>
                </h2>
                <hr class="my-4" />
                <div>
                  <div class="flex flex-wrap">
                    {mockPlayerPos > 0 && (
                      <ToolTip text="Go back to previous area">
                        <Button
                          className="mr-2"
                          onClick={() => {
                            _placeController.goToPreviousArea();
                          }}
                        >
                          <ArrowSvg className="flip-x" />
                        </Button>
                      </ToolTip>
                    )}

                    <ToolTip text="Explore the current location">
                      <Button
                        onClick={() => {
                          _placeController.explore();
                        }}
                        className="mr-2"
                      >
                        <Explore />
                      </Button>
                    </ToolTip>

                    <ToolTip text="Go to next area">
                      <Button
                        onClick={() => {
                          _placeController.goToNextArea();
                        }}
                      >
                        <ArrowSvg />
                      </Button>
                    </ToolTip>
                  </div>

                  <div id="things-found" class="mt-4 flex flex-wrap">
                    {_placeController
                      .getCurrentLocation()
                      .things.map((item) => {
                        const thing = item.thing;

                        if (item.found) {
                          return (
                            <div class={cardContainerStyle}>
                              <Card
                                title={thing.name}
                                subTitle={thing.type}
                                img={<Dynamic component={thing.img} />}
                                imgBrighter={false}
                                footer={
                                  <>
                                    <div data-id="actions" class="flex">
                                      <DropDown
                                        trigger={
                                          <Button>
                                            <SwordsSvg className="w-[16px] text-white" />
                                          </Button>
                                        }
                                        items={thing.playerActions.map(
                                          (item) => (
                                            <li>
                                              <Button
                                                onClick={() => {
                                                  item.click();
                                                }}
                                              >
                                                {item.name}
                                              </Button>
                                            </li>
                                          )
                                        )}
                                      />
                                    </div>
                                  </>
                                }
                              />
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {place().screen === E_SCREENS.WORLD_MAP && <WorldMap />}

      <Modal title={modal().title} isOpen={modal().isOpen}>
        {modal().children}
      </Modal>

      <Button
        className="fixed top-[1rem] right-[1rem] btn-sm"
        onClick={() => {
          _settingsController.openMenu();
        }}
      >
        Menu
      </Button>
    </div>
  );
}

export default Game;
