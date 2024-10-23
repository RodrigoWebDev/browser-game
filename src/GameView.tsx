import Button from "./components/Button";
import Modal from "./components/Modal";

import { createEffect, onMount } from "solid-js";
import Player from "./components/Player";
import WorldMap from "./components/WorldMap";
import { modalState } from "./state/modal";
import { settingsController } from "./state/settings";
import { playerController } from "./state/player";
import Card from "./components/Card";
import { Dynamic } from "solid-js/web";
import ToolTip from "./components/Tooltip";
import DropDown from "./components/Dropwdown";
import SwordsSvg from "./components/SvgIcons/swords";
import Explore from "./components/SvgIcons/explore";
import { E_SCREENS } from "./enums";
import { screenController, screenState } from "./state/screen";
import Map from "./components/SvgIcons/Map";
import { worldMapController } from "./state/worldMap";

const cardContainerStyle = "w-[25%] mr-2 mb-2";

function GameView() {
  const [modal] = modalState;
  const [screen] = screenState;
  const _settingsController = settingsController();
  const _screenController = screenController();
  const _worldMapController = worldMapController();
  const _playerController = playerController();

  onMount(() => {
    _settingsController.loadSettings();
  });

  createEffect(() => {
    _settingsController.updateSettings();
  });

  const place = () => {
    const _place = _worldMapController.place();
    return _place;
  };

  return (
    <div class="flex justify-between h-screen max-w-[1360px] mx-auto">
      <aside class="w-[29%] p-4">
        <Player />
      </aside>

      {screen() === E_SCREENS.PLACE && place().info.things.length && (
        <main class="w-[69%]">
          <div class="h-full bg-contain">
            <div id="exploration" class="min-h-[600px] w-full bg-black/40 p-4">
              <h2 class="text-[20px]">
                You are in <strong>{place().info.name}</strong>
              </h2>
              <hr class="my-4" />
              <div>
                <div class="flex flex-wrap">
                  <ToolTip text="Explore the current location">
                    <Button
                      onClick={() => {
                        _worldMapController.explore();
                      }}
                      className="mr-2"
                    >
                      <Explore />
                    </Button>
                  </ToolTip>

                  <ToolTip text="Show map">
                    <Button
                      onClick={() => {
                        _screenController.setScreen(E_SCREENS.WORLD_MAP);
                      }}
                    >
                      <Map />
                    </Button>
                  </ToolTip>
                </div>

                <div id="things-found" class="mt-4 flex flex-wrap">
                  {place().info.things.map((item: any) => {
                    const thing = item.thing;

                    if (!!thing) {
                      return (
                        <div class={cardContainerStyle}>
                          <Card
                            title={thing.name}
                            subTitle={thing.type}
                            img={
                              <Dynamic
                                component={thing.img}
                                fill={thing.fill}
                              />
                            }
                            imgBrighter={false}
                            footer={
                              <div>
                                <progress
                                  class="progress progress-error"
                                  value={thing.hp}
                                  max={100}
                                ></progress>
                                <div data-id="actions" class="flex">
                                  <DropDown
                                    trigger={
                                      <Button>
                                        <SwordsSvg className="w-[16px] text-white" />
                                      </Button>
                                    }
                                    items={/* _playerController
                                      .getPlayerActionsInPlace(item.id)
                                      .map((item: any) => (
                                        <li>
                                          <Button
                                            onClick={() => {
                                              item.onClick();
                                            }}
                                          >
                                            {item.name}
                                          </Button>
                                        </li>
                                      )) */[]}
                                  />
                                </div>
                              </div>
                            }
                          />
                        </div>
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {screen() === E_SCREENS.WORLD_MAP && <WorldMap />}

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

export default GameView;
