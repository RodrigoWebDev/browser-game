import { createSignal, onMount } from "solid-js";
import { getRandomIntFromInterval, getRandomItemFromArray } from "./helpers";
import Enemy from "./classes/Enemy";

// Assets
import exploration from "./assets/events/exploration.webp";
import potionImg from "./assets/consumables/potion0.webp";

import { IWorld } from "./interfaces";
import {
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
} from "./constants";
import { IAction } from "./classes/interfaces";
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

interface IShop {
  name: string;
  img: string;
  price: number;
  maxQuantity: number;
  quantitySelected: number;
}

const useApp = () => {
  const [world, setWorld] = createSignal<IWorld>({
    locations: [],
  });
  const [showHit, setShowHit] = createSignal(false);
  const [player, setPlayer] = createSignal({
    name: "Tekomo Nakama",
    class: "Guerreiro",
    hp: 100,
    maxHp: 100,
    attackDamage: 50,
    currentLocationIndex: 0,
    isInCombat: false,
    money: 250,
  });
  const [shop, setShop] = createSignal<IShop[]>([]);
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
        title: `Explorando ${getCurrentLocation().name}`,
        children: <img class="max-w-[350px] mt-2" src={exploration} />,
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
            setModalContent({
              title: randomName,
              isOpen: true,
              children: <NpcTalk img={randomImage} text={getRandomTalk()} />,
            });
          },
        });

        if (_subType == "MERCHANT") {
          //const shopItems = ITEM_TYPES as TITEM_TYPES[];

          const shopItems = ITEM_TYPES.map((itemName) => ({
            name: ITEM[itemName].NAME,
            price: ITEM[itemName].PRICE,
            img: ITEM[itemName].IMG,
            maxQuantity: 5,
            quantitySelected: 0,
          }));

          setShop([...shopItems]);

          actions.push({
            name: "Buy",
            click: () => {
              setModalContent({
                title: `${randomName}'s Shop`,
                isOpen: true,
                children: (
                  <Shop
                    items={shop()}
                    playerMoney={player().money}
                    closeModal={() => {
                      closeModal();
                    }}
                    update={() => {
                      setShop([...shopItems]);
                    }}
                    updatePlayerMoney={(newValue: number) => {
                      console.log({ newValue });
                      setPlayer((val) => ({
                        ...val,
                        money: newValue,
                      }));
                    }}
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
        randomImage = getRandomItemFromArray(thing.IMAGES);
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
        randomImage = ENEMY[thingSubType].IMAGE;
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

    console.log({ _world });

    setWorld({ ..._world });
  };

  const goToNextArea = () => {
    setPlayer((val) => ({
      ...val,
      currentLocationIndex: val.currentLocationIndex + 1,
    }));
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

  onMount(() => {
    createPlaces();
  });

  return {
    showHit,
    player,
    escapeFromCombat,
    playerTakeDamage,
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
