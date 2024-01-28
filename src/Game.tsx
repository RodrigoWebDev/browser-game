import Card from "./components/card";
import SwordsSvg from "./components/svgIcons/swords";
import DropDown from "./components/dropwdown";
import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import useApp from "./useApp";
import Inventory from "./components/Inventory";
import ToolTip from "./components/Tooltip";
import Player from "./components/Player";
import ExploreSvg from "./components/svgIcons/explore";
import ArrowSvg from "./components/svgIcons/arrow";
import Knight from "./components/svgIcons/knight";

const cardContainerStyle = "w-[25%] mr-2 mb-2";

function Game() {
  const {
    openMenu,
    player,
    escapeFromCombat,
    combatScreen,
    attackEnemy,
    modalContent,
    explore,
    world,
    getCurrentLocation,
    goToNextArea,
    goToPreviousArea,
  } = useApp();

  return (
    <div class="flex justify-between h-screen max-w-[1360px] mx-auto">
      <aside class="w-[29%] p-4">
        <Player>
          {/* <img src={knight} class={`${showHit() ? "brightness-[4]" : ""}`} /> */}
          <Knight className="bg-[#15191e] rounded-box mb-4" />
          <div>
            <strong>Name</strong>: {player().name}
          </div>
          <div>
            <strong>Class</strong>: {player().class}
          </div>

          <div class="divider">Stats</div>

          <ToolTip text={`HP: ${player().hp}`} className="flex items-center">
            <div class="mr-2">HP:</div>
            <progress
              class="progress progress-error"
              value={player().hp}
              max={player().maxHp}
            ></progress>
          </ToolTip>

          <ToolTip text={`MP: 50`} className="flex items-center">
            <div class="mr-2">MP:</div>
            <progress
              class="progress progress-info"
              value="50"
              max="50"
            ></progress>
          </ToolTip>

          <div class="divider">Inventory</div>

          <div>Money: {player().money}</div>

          <Inventory
            items={player().inventoryItems}
            maxCapacity={player().inventoryMaxCapacity}
          />
        </Player>
      </aside>
      {world().locations.length && (
        <main class="w-[69%]">
          <div
            /* style={{
              "background-image": `url(${getCurrentLocation().bg})`,
            }} */
            class="h-full bg-contain"
          >
            {player().isInCombat ? (
              <div id="combat" class="p-4 bg-black/40">
                <div id="enemies" class="flex mb-4">
                  {combatScreen().enemies.map((enemy) => {
                    const enemyIsDead = enemy.hp <= 0;
                    return (
                      <div
                        class={`${cardContainerStyle} ${
                          enemyIsDead ? "pointer-events-none brightness-50" : ""
                        }`}
                      >
                        <Card
                          img={enemy.img}
                          imgHueRotation={enemy.hueRotation}
                          imgBrighter={enemy.damageEffetct}
                          title={enemy.name}
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
                                    <SwordsSvg className="w-[16px] text-white" />
                                  }
                                  items={enemy.playerActions.map((item) => (
                                    <li
                                      onClick={() => {
                                        attackEnemy(item, enemy);
                                      }}
                                    >
                                      <a data-id="action">{item.name}</a>
                                    </li>
                                  ))}
                                />

                                <Button className="btn-sm">
                                  <SwordsSvg className="w-[16px] text-white" />
                                </Button>
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
                        escapeFromCombat();
                      }}
                    >
                      Fugir do combate
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div id="exploration" class="h-full w-full bg-black/40 p-4">
                <h2 class="text-[20px]">
                  You are in <strong>{getCurrentLocation().name}</strong>
                </h2>
                <hr class="my-4" />
                <div>
                  <div class="flex flex-wrap">
                    {player().currentLocationIndex > 0 && (
                      <ToolTip text="Go back to previous area">
                        <Button
                          className="mr-2"
                          onClick={() => {
                            goToPreviousArea();
                          }}
                        >
                          <ArrowSvg className="flip-x" />
                        </Button>
                      </ToolTip>
                    )}

                    <ToolTip text="Explore the current location">
                      <Button
                        onClick={() => {
                          explore();
                        }}
                        className="mr-2"
                      >
                        <ExploreSvg />
                      </Button>
                    </ToolTip>

                    <ToolTip text="Go to next area">
                      <Button
                        onClick={() => {
                          goToNextArea();
                        }}
                      >
                        <ArrowSvg />
                      </Button>
                    </ToolTip>
                  </div>

                  <div id="things-found" class="mt-4 flex flex-wrap">
                    {getCurrentLocation().things.map((item) => {
                      const thing = item.thing;

                      if (item.found) {
                        return (
                          <div class={cardContainerStyle}>
                            <Card
                              title={thing.name}
                              subTitle={thing.type}
                              img={thing.img}
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
                                      items={thing.playerActions.map((item) => (
                                        <li
                                          onClick={() => {
                                            item.click();
                                          }}
                                        >
                                          <a data-id="action">{item.name}</a>
                                        </li>
                                      ))}
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

      <Modal title={modalContent().title} isOpen={modalContent().isOpen}>
        {modalContent().children}
      </Modal>

      <Button
        className="fixed top-[1rem] right-[1rem] btn-sm"
        onClick={() => {
          openMenu();
        }}
      >
        Menu
      </Button>
    </div>
  );
}

export default Game;
