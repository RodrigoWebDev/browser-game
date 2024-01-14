import Card from "./components/card";
import SwordsSvg from "./components/svgIcons/swords";
import DropDown from "./components/dropwdown";
import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import knight from "./assets/player/classes/knight/0.webp";
import potion from "./assets/consumables/potion0.webp";
import useApp from "./useApp";

function App() {
  const {
    showHit,
    player,
    playerTakeDamage,
    enemies,
    //currentLocation,
    modalContent,
    explore,
    world,
  } = useApp();

  console.log(world());

  return (
    <div class="flex max-w-[1360px] mx-auto">
      <aside class="w-[30%] p-4 mr-4">
        <img src={knight} class={`${showHit() ? "brightness-[4]" : ""}`} />
        <div>
          <strong>Nome</strong>: {player().name}
        </div>
        <div>
          <strong>Classe</strong>: {player().class}
        </div>

        <hr />
        <h2>
          <strong>Status</strong>
        </h2>
        <div class="flex items-center" title="HP: 100">
          <div class="mr-2">HP:</div>
          <progress
            class="progress progress-error"
            value={player().hp}
            max={player().maxHp}
          ></progress>
        </div>

        <div class="flex items-center" title="MP: 50">
          <div class="mr-2">MP:</div>
          <progress
            class="progress progress-info"
            value="50"
            max="50"
          ></progress>
        </div>

        <hr />

        <h2>Inventário</h2>

        <div class="flex flex-wrap">
          <Button
            className="w-[30px] h-[30px] p-[8px] flex items-center justify-center"
            onClick={() => {
              playerTakeDamage(10);
            }}
          >
            <img src={potion} alt="Healing Potion" class="w-[30px] h-[30px]" />
          </Button>
        </div>
      </aside>
      <main class="w-[70%] p-4">
        <div style={{ display: "none" }} id="combat">
          <div id="enemies" class="flex mb-4">
            {enemies().map((enemy, index) => {
              const enemyIsDead = enemy.hp <= 0;
              return (
                <div
                  class={`w-[25%] mr-2 ${
                    enemyIsDead ? "pointer-events-none brightness-50" : ""
                  }`}
                >
                  <Card
                    img={enemy.img}
                    imgHueRotation={enemy.color}
                    imgBrighter={enemy.takeDamage}
                    title={enemy.name}
                    description={enemy.description}
                    footer={
                      <>
                        <div
                          class="flex items-center"
                          title={`HP: ${enemy.hp}`}
                        >
                          <div class="mr-2">HP:</div>
                          <progress
                            class="progress progress-error"
                            value={enemy.hp}
                            max={enemy.maxHp}
                          ></progress>
                        </div>
                        <div data-id="actions" class="flex">
                          <DropDown
                            buttonChildren={
                              <SwordsSvg className="w-[16px] text-white" />
                            }
                            items={enemy.playerActions}
                            index={index}
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
              <Button>Fugir do combate</Button>
            </div>
          </div>
        </div>

        {world().locations.length && (
          <div
            id="exploration"
            style={{
              "background-image": `url(${world().locations[0].bg})`,
            }}
            class="h-screen bg-contain"
          >
            <div class="h-full w-full bg-black/40 p-4">
              <h2 class="text-[20px]">
                Você esta em <strong>{world().locations[0].name}</strong>
              </h2>
              <hr class="my-4" />
              <div class="flex flex-wrap">
                <Button
                  onClick={() => {
                    explore();
                  }}
                >
                  Explorar local
                </Button>

                <div id="things-found" class="mt-4">
                  {world().locations[0].things.map((item, index) => {
                    const thing = item.thing;

                    if (item.found) {
                      return (
                        <div class="w-[25%]">
                          <Card
                            title={thing.name}
                            description=""
                            img={thing.img}
                            imgBrighter={thing.takeDamage}
                            footer={
                              <>
                                <div data-id="actions" class="flex">
                                  <DropDown
                                    buttonChildren={
                                      <SwordsSvg className="w-[16px] text-white" />
                                    }
                                    items={thing.playerActions}
                                    index={index}
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
          </div>
        )}
      </main>

      <Modal title={modalContent().title} isOpen={modalContent().isOpen}>
        {modalContent().children}
      </Modal>
    </div>
  );
}

export default App;
