import Card from "./components/Card";
import SwordsSvg from "./components/svgIcons/swords";
import DropDown from "./components/Dropwdown";
import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import useGame from "./useGame";
import ToolTip from "./components/Tooltip";
import Player from "./components/Player";
import ExploreSvg from "./components/svgIcons/explore";
import ArrowSvg from "./components/svgIcons/arrow";

const cardContainerStyle = "w-[25%] mr-2 mb-2";

function Game() {
  const {
    openMenu,
    player,
    escapeFromCombat,
    combatScreen,
    attackEnemy,
    modal,
    explore,
    world,
    getCurrentLocation,
    goToNextArea,
    goToPreviousArea,
    winCombat,
    removeThingFromLocation,
  } = useGame();

  return (
    <div class="flex justify-between h-screen max-w-[1360px] mx-auto">
      <aside class="w-[29%] p-4">
        <Player />
      </aside>
      {world().locations.length && (
        <main class="w-[69%]">
          <div class="h-full bg-contain">
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
                          img={enemy.refference.IMAGE}
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
                                    <SwordsSvg className="w-[16px] text-white" />
                                  }
                                  items={enemy.playerActions.map((item) => (
                                    <li
                                      onClick={() => {
                                        attackEnemy(item, enemy);
                                        winCombat();
                                        removeThingFromLocation(enemy.id);
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
              <div
                id="exploration"
                class="min-h-[600px] w-full bg-black/40 p-4"
              >
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

      <Modal title={modal().title} isOpen={modal().isOpen}>
        {modal().children}
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
