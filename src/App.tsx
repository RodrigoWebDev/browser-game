import { createSignal, createEffect } from "solid-js";
import knight from "./assets/player/classes/knight/0.webp";
import potion from "./assets/consumables/potion0.webp";
import enemy from "./assets/enemies/0.webp";
import Card from "./components/card";
import SwordsSvg from "./components/svgIcons/swords";
import { randomFloatFromInterval } from "./helpers";
import DropDown from "./components/dropwdown";
import village from "./assets/backgrounds/village.webp";
import Button from "./components/Button";
import Modal from "./components/Modal";
import npc from "./assets/npcs/0.webp";
import Npc from "./classes/Npc";

interface IPlayerActions {
  name: string;
  click: (index: number) => void;
}

interface IEnemy {
  name: string;
  description: string;
  img: string;
  takeDamage: boolean;
  hp: number;
  maxHp: number;
  color: number;
  playerActions: IPlayerActions[];
}

function App() {
  const [showHit, setShowHit] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [enemies, setEnemies] = createSignal<IEnemy[]>([]);
  const [playerAttributes, setPlayerAttributes] = createSignal({
    hp: 100,
    maxHp: 100,
    attackDamage: 50,
  });
  const [modalContent, setModalContent] = createSignal({
    title: "",
    isOpen: false,
    children: <></>,
  });
  const [currentLocation, setCurrentLocation] = createSignal({
    name: "Vila oculta da folha",
    bg: village,
    /* possibleThingsToFind: [
      {
        id: 0,
        name: "Natielly",
        type: "merchant",
        img: npc,
        takeDamage: false,
      },
    ], */
    thingsFound: [
      new Npc(0, "Natielly", "merchant", true, npc, false, (npc: Npc) => {
        setModalContent((value) => ({
          ...value,
          isOpen: true,
          title: `Conversando com ${npc.name}`,
          children: (
            <div class="mt-4">
              <img class="max-w-[350px] mb-2" src={npc.img} />
              <p>{npc.message}</p>
            </div>
          ),
        }));
      }),
    ],
  });

  const enemyTemplate = {
    name: "Inimigo",
    description: "Este inimigo quer te matar",
    img: enemy,
    takeDamage: false,
    hp: 90,
    maxHp: 100,
    color: randomFloatFromInterval(0, 100),
    playerActions: [
      {
        name: "Atacar",
        click: (index: number) => {
          enemyTakeDamage(index, playerAttributes().attackDamage);
        },
      },
    ],
  };

  const playerTakeDamage = (damage: number) => {
    setPlayerAttributes((val) => ({
      ...val,
      hp: val.hp - damage,
    }));

    setShowHit(true);
    setTimeout(() => {
      setShowHit(false);
    }, 300);
  };

  const enemyTakeDamage = (index: number, damage: number) => {
    const newEnemies = [...enemies()];
    newEnemies[index] = {
      ...newEnemies[index],
      takeDamage: true,
      hp: newEnemies[index].hp - damage,
    };

    setEnemies(newEnemies);

    setTimeout(() => {
      const newEnemies = [...enemies()];
      newEnemies[index] = {
        ...newEnemies[index],
        takeDamage: false,
      };

      setEnemies(newEnemies);
    }, 150);
  };

  const explore = () => {
    setModalContent((val) => ({
      ...val,
      title: `Explorando ${currentLocation().name}`,
      isOpen: true,
    }));

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  createEffect(() => {
    setEnemies([]);
    for (let i = 0; i < 4; i++) {
      setEnemies((val) => [...val, enemyTemplate]);
    }
  });

  console.log(modalContent());

  return (
    <div class="flex max-w-[1360px] mx-auto">
      <aside class="w-[30%] p-4 mr-4">
        <img src={knight} class={`${showHit() ? "brightness-[4]" : ""}`} />
        <div>
          <strong>Nome</strong>: Tekomo Nakama
        </div>
        <div>
          <strong>Classe</strong>: Guerreiro
        </div>

        <hr />
        <h2>
          <strong>Status</strong>
        </h2>
        <div class="flex items-center" title="HP: 100">
          <div class="mr-2">HP:</div>
          <progress
            class="progress progress-error"
            value={playerAttributes().hp}
            max={playerAttributes().maxHp}
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

        <div
          id="exploration"
          style={{
            "background-image": `url(${currentLocation().bg})`,
          }}
          class="h-screen bg-contain"
        >
          <div class="h-full w-full bg-black/40 p-4">
            <h2 class="text-[20px]">
              Você esta em <strong>{currentLocation().name}</strong>
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
                {currentLocation().thingsFound.map((thing, index) => {
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
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal title={modalContent().title} isOpen={modalContent().isOpen}>
        {modalContent().children}
      </Modal>
    </div>
  );
}

export default App;
