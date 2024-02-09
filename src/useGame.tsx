import { createSignal, onMount, createEffect } from "solid-js";
import {
  getPlayerTotalWiehgt,
  getRandomIntFromInterval,
  getRandomItemFromArray,
} from "./helpers";
import Enemy from "./classes/Enemy";

import {
  IAction,
  IInventoryItems,
  ISettings,
  IThing,
  IWorld,
} from "./interfaces";
import {
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
} from "./constants";
import { ENEMY, IENEMY, TENEMY_TYPES } from "./constants/enemies";
import {
  INNER_PLACE,
  IPlace,
  PLACES,
  PLACE_TYPES,
  TINNER_PLACE_TYPES,
  TPLACE_TYPES,
} from "./constants/places";
import { NPC, NPC_GREETINGS, TNPC_TYPES } from "./constants/npc";
import NpcTalk from "./components/NpcTalk";
import Shop from "./components/Shop";
import { IITEM, ITEM, ITEM_TYPES } from "./constants/items";
import PersonWalk from "./components/svgIcons/personWalk";
import Menu from "./components/Menu";

//States
import { modalState } from "./state/modal";
import { inventoryState, updateInventory } from "./state/inventory";
import { shopState } from "./state/shop";
import { playerState } from "./state/player";
import EmojiDisplay from "./components/EmojiDsplay";

const useApp = () => {
  const [, setShop] = shopState;
  const [inventory, setInventory] = inventoryState;

  const [settings, setSettings] = createSignal<ISettings>({
    isNightMode: false,
  });
  const [world, setWorld] = createSignal<IWorld>({
    locations: [],
  });
  const [, setShowHit] = createSignal(false);
  const [player, setPlayer] = playerState;

  const [combatScreen, setCombatScreen] = createSignal<{
    enemies: Enemy[];
  }>({
    enemies: [],
  });

  const [modal, setModal] = modalState;

  const getCurrentLocation = () => {
    return world().locations[player().currentLocationIndex];
  };

  const playerTakeDamage = (damage: number) => {
    setPlayer((val) => ({
      ...val,
      hp: val.hp - damage,
    }));

    setShowHit(true);
    setTimeout(() => {
      setShowHit(false);
    }, 300);
  };

  const attackEnemy = (item: IAction, enemy: Enemy) => {
    item.click(player().attackDamage);
    updateCombatScreen();

    enemy.resetDamageEffect();

    setTimeout(() => {
      updateCombatScreen();
    }, 150);
  };

  const winCombat = () => {
    const isWinCombat = !combatScreen().enemies.some((item) => item.hp > 0);

    if (isWinCombat) {
      const itemsDrop = combatScreen()
        .enemies.map((enemy) => {
          return enemy.refference.DROPS.map((drop) => {
            return {
              key: drop,
              quantity: 1,
            };
          });
        })
        .flat();

      setModal({
        isOpen: true,
        title: "You won the fight",
        children: (
          <div>
            <p>You have obtained the following items:</p>
            <div class="flex">
              {itemsDrop.map((item) => {
                const itemInfo = ITEM[item.key];
                return (
                  <div class="w-[10%] text-center">
                    <EmojiDisplay
                      code={itemInfo.img}
                      tooltipText={itemInfo.name}
                    />
                    <div>x{item.quantity}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ),
      });

      const itemsToInventory = itemsDrop.map((item) => {
        const itemRefference = ITEM[item.key] as IITEM;

        return {
          ...itemRefference,
          playerActions: [],
          quantity: 1,
        };
      });

      updateInventory(itemsToInventory, "SUM");

      setCombatScreen((val) => ({
        ...val,
        enemies: [],
      }));

      setPlayer((val) => ({
        ...val,
        isInCombat: false,
      }));
    }
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
    });
  };

  const hasThingToFind = () => {
    return getCurrentLocation().things.some((item) => {
      return item.found == false;
    });
  };

  const findSomething = () => {
    const _world = { ...world() };
    const currentLocationIndex = player().currentLocationIndex;
    const notFoundIndex = _world.locations[
      currentLocationIndex
    ].things.findIndex((item) => !item.found);

    if (notFoundIndex !== -1) {
      _world.locations[currentLocationIndex].things[notFoundIndex].found = true;

      setWorld(_world);
    }
  };

  const explore = () => {
    if (hasThingToFind()) {
      setModal(() => ({
        title: `Exploring ${getCurrentLocation().name}`,
        children: <PersonWalk />,
        isOpen: true,
      }));

      setTimeout(() => {
        closeModal();
        findSomething();
      }, 1000);
    } else {
      setModal(() => ({
        title: "Você ja explorou tudo",
        children: <></>,
        isOpen: true,
      }));
    }
  };

  const getRandomTalk = () => {
    return getRandomItemFromArray(NPC_GREETINGS);
  };

  const _getPlayerTotalWeight = () => {
    return getPlayerTotalWiehgt(inventory().items);
  };

  const getPlaceInformation = (place: IPlace) => {
    const name = `${getRandomItemFromArray(place.NAMES)} (${place.ID}) `;
    const bg = getRandomItemFromArray(place.IMAGES);
    let things = [];

    const interval = getRandomIntFromInterval(
      MIN_THINGS_NUMBER,
      MAX_THINGS_NUMBER
    );

    for (let i = 0; i < interval; i++) {
      //const randomThing = getRandomItemFromArray(place.THINGS) as IThing;
      const randomThing = {
        TYPE: "NPC",
        SUBTYPE: "MERCHANT",
      };

      let randomName = "";
      let randomImage = "";
      let actions: IAction[] = [];
      let subType = randomThing.SUBTYPE.toLocaleLowerCase();
      const thingType = randomThing.TYPE;

      if (thingType === "NPC") {
        //Create NPC Info
        const _subType = randomThing.SUBTYPE as TNPC_TYPES;
        const gender = getRandomItemFromArray(GENDERS) as "MALE" | "FEMALE";
        const images = NPC[_subType][gender].IMAGES;
        randomImage = getRandomItemFromArray(images);
        randomName = getRandomItemFromArray(NPC_NAMES[gender]);
        actions.push({
          name: "Talk",
          click: () => {
            setModal({
              title: randomName,
              isOpen: true,
              children: <NpcTalk img={randomImage} text={getRandomTalk()} />,
            });
          },
        });

        if (_subType == "MERCHANT") {
          actions.push({
            name: "Buy",
            click: () => {
              const items = ITEM_TYPES.map((itemName) => ({
                ...ITEM[itemName],
                maxQuantity: 5,
                quantitySelected: 0,
                key: itemName,
              }));

              setShop((val) => ({
                ...val,
                items,
              }));

              setModal({
                title: `${randomName}'s Shop`,
                isOpen: true,
                children: (
                  <Shop
                    playerMoney={player().money}
                    closeModal={() => {
                      closeModal();
                    }}
                    playerInventoryMaxCapacity={inventory().maxCapacity}
                    playerCurrentWeight={_getPlayerTotalWeight()}
                    isBuying
                  />
                ),
              });
            },
          });

          actions.push({
            name: "Sell",
            click: () => {
              const items = inventory().items.map((item) => ({
                ...ITEM[item.key],
                maxQuantity: item.quantity,
                quantitySelected: 0,
                key: item.key,
              }));

              setShop((val) => ({
                ...val,
                items,
              }));

              setModal({
                title: `Selling to ${randomName}`,
                isOpen: true,
                children: (
                  <Shop
                    playerMoney={player().money}
                    closeModal={() => {
                      closeModal();
                    }}
                    playerInventoryMaxCapacity={inventory().maxCapacity}
                    playerCurrentWeight={_getPlayerTotalWeight()}
                  />
                ),
              });
            },
          });
        }
      }

      if (thingType === "INNER_PLACE") {
        //Create INNER_PLACE Info
        const _subType = randomThing.SUBTYPE as TINNER_PLACE_TYPES;
        const thing = INNER_PLACE[_subType];
        const image = getRandomItemFromArray(thing.IMAGES);
        randomImage = image;
        randomName = getRandomItemFromArray(thing.NAMES);

        actions = [
          {
            name: "Enter",
            click: () => {
              //this.talk();
            },
          },
        ];
      }

      if (thingType === "ENEMY") {
        const thingSubType = randomThing.SUBTYPE as TENEMY_TYPES;
        const enemy = ENEMY[thingSubType] as IENEMY;
        const image = enemy.IMAGE;
        randomName = enemy.NAME;
        randomImage = image;

        actions = [
          {
            name: "Start combat",
            click: () => {
              setPlayer((val) => ({
                ...val,
                isInCombat: true,
              }));

              setCombatScreen((val) => {
                return {
                  ...val,
                  enemies: [
                    new Enemy(enemy, 0),
                    /* {
                      ...enemy,
                      playerActions: [
                        {
                          name: "Atacar",
                          click: () => {},
                        },
                      ],
                    } */
                  ],
                };
              });

              if (combatScreen()) {
              }
              //this.talk();
            },
          },
        ];
      }

      things.push({
        found: false,
        thing: {
          name: randomName,
          type: subType,
          img: randomImage,
          playerActions: actions,
        },
      });
    }

    return {
      name,
      type: place.ID,
      bg,
      things,
    };
  };

  const getPlace = () => {
    //const randomPlaceType = getRandomItemFromArray(PLACE_TYPES) as TPLACE_TYPES;
    const randomPlaceType = "FOREST";

    return getPlaceInformation(PLACES[randomPlaceType]);
  };

  const createPlaces = () => {
    const _world = { ...world() };

    for (let i = 0; i < 5; i++) {
      _world.locations.push(getPlace());
    }

    setWorld({ ..._world });
  };

  const goToNextArea = () => {
    setModal({
      title: `Going to the next area`,
      children: <PersonWalk />,
      isOpen: true,
    });

    setTimeout(() => {
      closeModal();
      setPlayer((val) => ({
        ...val,
        currentLocationIndex: val.currentLocationIndex + 1,
      }));
    }, 1000);
  };

  const goToPreviousArea = () => {
    setPlayer((val) => ({
      ...val,
      currentLocationIndex: val.currentLocationIndex - 1,
    }));
  };

  const escapeFromCombat = () => {
    setPlayer((val) => ({
      ...val,
      isInCombat: false,
    }));
  };

  const updateCombatScreen = () => {
    setCombatScreen((val) => ({
      ...val,
    }));
  };

  const openMenu = () => {
    setModal({
      title: "Menu",
      isOpen: true,
      children: <Menu settings={settings()} setSettings={setSettings} />,
    });
  };

  const loadSettings = () => {
    const settingsFromLocalStorage = window.localStorage.getItem("settings");

    if (settingsFromLocalStorage) {
      const jsonSettings = JSON.parse(settingsFromLocalStorage) as ISettings;
      setSettings(jsonSettings);
    }
  };

  const updateSettings = () => {
    window.localStorage.setItem("settings", JSON.stringify(settings()));
    const theme = settings().isNightMode ? "dark" : "light";

    document.querySelector("html")?.setAttribute("data-theme", theme);
  };

  onMount(() => {
    loadSettings();
    createPlaces();
  });

  createEffect(() => {
    updateSettings();
  });

  return {
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
  };
};

export default useApp;
