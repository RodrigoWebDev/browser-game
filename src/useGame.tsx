import { createSignal, onMount, JSXElement, createEffect } from "solid-js";
import { Dynamic } from "solid-js/web";
import {
  ACTIONS,
  event,
  getPlayerTotalWiehgt,
  getRandomIntFromInterval,
  getRandomItemFromArray,
} from "./helpers";
import Enemy from "./classes/Enemy";

import {
  IAction,
  IInventoryItems,
  IItemShop,
  ISettings,
  IWorld,
} from "./interfaces";
import {
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
} from "./constants";
import { ENEMY, TENEMY_TYPES } from "./constants/enemies";
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
import { ITEM, ITEM_TYPES } from "./constants/items";
import PersonWalk from "./components/svgIcons/personWalk";
import Menu from "./components/Menu";

interface IPlayer {
  name: string;
  class: string;
  hp: number;
  maxHp: number;
  attackDamage: number;
  currentLocationIndex: number;
  isInCombat: boolean;
  money: number;
  inventoryMaxCapacity: number;
  inventoryItems: IInventoryItems[];
}

const useApp = () => {
  const [settings, setSettings] = createSignal<ISettings>({
    isNightMode: false,
  });
  const [world, setWorld] = createSignal<IWorld>({
    locations: [],
  });
  const [showHit, setShowHit] = createSignal(false);
  const [player, setPlayer] = createSignal<IPlayer>({
    name: "Tekomo Nakama",
    class: "Guerreiro",
    hp: 100,
    maxHp: 100,
    attackDamage: 50,
    currentLocationIndex: 0,
    isInCombat: true,
    money: 10000,
    inventoryMaxCapacity: 4,
    inventoryItems: [],
  });
  /* const [shop, setShop] = createSignal<IItemShop[]>([]); */
  const [combatScreen, setCombatScreen] = createSignal({
    enemies: [new Enemy(0, ENEMY["TROLL"]), new Enemy(1, ENEMY["GOBLIN"])],
  });
  const [modalContent, setModalContent] = createSignal({
    title: "",
    isOpen: false,
    children: <></>,
  });

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

  const closeModal = () => {
    setModalContent((val) => ({
      ...val,
      isOpen: false,
    }));
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
      setModalContent((val) => ({
        ...val,
        title: `Exploring ${getCurrentLocation().name}`,
        children: <PersonWalk />,
        isOpen: true,
      }));

      setTimeout(() => {
        closeModal();
        findSomething();
      }, 1000);
    } else {
      setModalContent((val) => ({
        ...val,
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
    return getPlayerTotalWiehgt(player().inventoryItems);
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
      let randomImage: JSXElement = <></>;
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
            setModalContent({
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
              setModalContent({
                title: `${randomName}'s Shop`,
                isOpen: true,
                children: (
                  <Shop
                    /* items={shop()} */
                    playerMoney={player().money}
                    closeModal={() => {
                      closeModal();
                    }}
                    /* update={() => {
                      setShop([...shopItems]);
                    }} */
                    playerInventoryMaxCapacity={player().inventoryMaxCapacity}
                    playerCurrentWeight={_getPlayerTotalWeight()}
                    isBuying
                  />
                ),
              });

              const items = ITEM_TYPES.map((itemName) => ({
                ...ITEM[itemName],
                maxQuantity: 5,
                quantitySelected: 0,
                key: itemName,
              }));

              event.dispatch(ACTIONS.UPDATE_SHOP_ITEMS, items);
            },
          });

          actions.push({
            name: "Sell",
            click: () => {
              setModalContent({
                title: `Selling to ${randomName}`,
                isOpen: true,
                children: (
                  <Shop
                    playerMoney={player().money}
                    closeModal={() => {
                      closeModal();
                    }}
                    playerInventoryMaxCapacity={player().inventoryMaxCapacity}
                    playerCurrentWeight={_getPlayerTotalWeight()}
                  />
                ),
              });

              /* const items = ITEM_TYPES.map((itemName) => ({
                ...ITEM[itemName],
                maxQuantity: 5,
                quantitySelected: 0,
                key: itemName,
              })); */

              event.dispatch(ACTIONS.SELL_ITEMS);
            },
          });
        }
      }

      if (thingType === "INNER_PLACE") {
        //Create INNER_PLACE Info
        const _subType = randomThing.SUBTYPE as TINNER_PLACE_TYPES;
        const thing = INNER_PLACE[_subType];
        const image = getRandomItemFromArray(thing.IMAGES);
        randomImage = <Dynamic component={image} />;
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
        const thing = ENEMY[thingSubType];
        const image = ENEMY[thingSubType].IMAGE;
        randomImage = <Dynamic component={image} />;
        randomName = thing.NAME;

        actions = [
          {
            name: "Attack",
            click: () => {
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
    const randomPlaceType = getRandomItemFromArray(PLACE_TYPES) as TPLACE_TYPES;

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
    setModalContent({
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
    setModalContent({
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
    event.subscribe(ACTIONS.SET_MODAL, (modalData) => {
      setModalContent({ ...modalData });
    });

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
    modalContent,
    explore,
    world,
    getCurrentLocation,
    goToNextArea,
    goToPreviousArea,
  };
};

export default useApp;
