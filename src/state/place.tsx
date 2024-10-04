import { JSXElement, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { PersonWalk } from "../components/Icons/index.tsx";
import NpcTalk from "../components/NpcTalk/index.tsx";
import Shop from "../components/Shop/index.tsx";
import {
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
} from "../constants/index.ts";
import { CONTAINER, TCONTAINER_TYPES } from "../constants/containers.ts";
import { ENEMY, IENEMY, TENEMY_TYPES } from "../constants/enemies.ts";
import { ITEM, ITEM_TYPES, TITEM_TYPES } from "../constants/items.ts";
import { NPC, NPC_GREETINGS, TNPC_TYPES } from "../constants/npc.ts";
import {
  INNER_PLACE,
  IPlace,
  PLACES,
  PLACE_TYPES,
  TINNER_PLACE_TYPES,
  TPLACE_TYPES,
} from "../constants/places.ts";
import {
  getNewArrayWithRandomItems,
  getRandomIntFromInterval,
  getRandomItemFromArray,
} from "../helpers/index.tsx";
import { IAction, IThing, IPlaceInfo } from "../interfaces.ts";
import { combatController } from "./combat.tsx";
import { inventoryController, inventoryState } from "./inventory.ts";
import { modalState } from "./modal.ts";
import { playerState } from "./player.ts";
import { shopState } from "./shop.ts";
import { E_SCREENS } from "../enums/index.ts";

export const placeState = createSignal<IPlaceInfo>({
  name: "",
  type: "",
  bg: "",
  things: [],
});

export const mockPlayerPos = 0;

export const placeController = () => {
  const [place, setPlace] = placeState;
  const [player, setPlayer] = playerState;
  const [, setModal] = modalState;
  const [inventory] = inventoryState;
  const [, setShop] = shopState;
  const combat = combatController();
  const _inventoryController = inventoryController();
  const [screen, setScreen] = createSignal(E_SCREENS.WORLD_MAP);

  const removeThingFromLocation = (id: number) => {
    const _place = { ...place() };

    //delete _place.things[mockPlayerPos].things[id];

    setPlace({ ..._place });
  };

  const hasThingToFind = () => {
    return place().things.some((item) => {
      return item.found == false;
    });
  };

  const findSomething = () => {
    const _place = { ...place() };
    const notFoundIndex = _place.things.findIndex((item) => !item.found);

    if (notFoundIndex !== -1) {
      _place.things[notFoundIndex].found = true;

      setPlace(_place);
    }
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
    });
  };

  const explore = () => {
    if (hasThingToFind()) {
      setModal(() => ({
        title: `Exploring ${place().name}`,
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

  // const getThingInformation = (place: IPlace, i: number) => {
  //   //const name = `${getRandomItemFromArray(place.NAMES)} (${place.ID}) `;
  //   //const bg = getRandomItemFromArray(place.IMAGES);
  //   let things = [];

  //   const interval = getRandomIntFromInterval(
  //     MIN_THINGS_NUMBER,
  //     MAX_THINGS_NUMBER
  //   );

  //   /* for (let i = 0; i < interval; i++) { */
  //   const randomThing = getRandomItemFromArray(place.THINGS) as IThing;
  //   /* const randomThing = {
  //       TYPE: "NPC",
  //       SUBTYPE: "MERCHANT",
  //     }; */

  //   let randomName = "";
  //   let randomImage: JSXElement;
  //   let actions: IAction[] = [];
  //   let subType = randomThing.SUBTYPE.toLocaleLowerCase();
  //   const thingType = randomThing.TYPE;

  //   if (thingType === "NPC") {
  //     //Create NPC Info
  //     const _subType = randomThing.SUBTYPE as TNPC_TYPES;
  //     const gender = getRandomItemFromArray(GENDERS) as "MALE" | "FEMALE";
  //     const images = NPC[_subType][gender].IMAGES;
  //     randomImage = <Dynamic component={getRandomItemFromArray(images)} />;
  //     randomName = getRandomItemFromArray(NPC_NAMES[gender]);
  //     actions.push({
  //       name: "Talk",
  //       click: () => {
  //         setModal({
  //           title: randomName,
  //           isOpen: true,
  //           children: <NpcTalk img={randomImage} text={getRandomTalk()} />,
  //         });
  //       },
  //     });

  //     if (_subType == "MERCHANT") {
  //       //Generate inventory items for merchant
  //       const inventoryItems = getNewArrayWithRandomItems(
  //         ITEM_TYPES
  //       ) as TITEM_TYPES[];

  //       actions.push({
  //         name: "Buy",
  //         click: () => {
  //           const items = inventoryItems.map((itemName) => ({
  //             ...ITEM[itemName],
  //             maxQuantity: 5,
  //             quantitySelected: 0,
  //             key: itemName,
  //           }));

  //           setShop((val) => ({
  //             ...val,
  //             items,
  //           }));

  //           setModal({
  //             title: `${randomName}'s Shop`,
  //             isOpen: true,
  //             children: (
  //               <Shop
  //                 playerMoney={player().money}
  //                 closeModal={() => {
  //                   closeModal();
  //                 }}
  //                 playerInventoryMaxCapacity={inventory().maxCapacity}
  //                 playerCurrentWeight={_inventoryController.getInventoryWeight()}
  //                 isBuying
  //               />
  //             ),
  //           });
  //         },
  //       });

  //       actions.push({
  //         name: "Sell",
  //         click: () => {
  //           const items = inventory().items.map((item) => ({
  //             ...ITEM[item.key],
  //             maxQuantity: item.quantity,
  //             quantitySelected: 0,
  //             key: item.key,
  //           }));

  //           setShop((val) => ({
  //             ...val,
  //             items,
  //           }));

  //           setModal({
  //             title: `Selling to ${randomName}`,
  //             isOpen: true,
  //             children: (
  //               <Shop
  //                 playerMoney={player().money}
  //                 closeModal={() => {
  //                   closeModal();
  //                 }}
  //                 playerInventoryMaxCapacity={inventory().maxCapacity}
  //                 playerCurrentWeight={_inventoryController.getInventoryWeight()}
  //               />
  //             ),
  //           });
  //         },
  //       });
  //     }
  //   } else if (thingType === "INNER_PLACE") {
  //     //Create INNER_PLACE Info
  //     const _subType = randomThing.SUBTYPE as TINNER_PLACE_TYPES;
  //     const thing = INNER_PLACE[_subType];
  //     const image = getRandomItemFromArray(thing.IMAGES);
  //     randomImage = image;
  //     randomName = getRandomItemFromArray(thing.NAMES);

  //     actions = [
  //       {
  //         name: "Enter",
  //         click: () => {
  //           //this.talk();
  //         },
  //       },
  //     ];
  //   } else if (thingType === "ENEMY") {
  //     const thingSubType = randomThing.SUBTYPE as TENEMY_TYPES;
  //     const enemy = ENEMY[thingSubType] as IENEMY;
  //     const image = enemy.IMAGE;
  //     randomName = enemy.NAME;
  //     randomImage = <Dynamic component={image} />;

  //     actions = [
  //       {
  //         name: "Start combat",
  //         click: () => {
  //           setPlayer((val) => ({
  //             ...val,
  //             isInCombat: true,
  //           }));

  //           combat.setEnemiesToCombat(i, enemy);

  //           /* if (combat()) {
  //             } */
  //           //this.talk();
  //         },
  //       },
  //     ];
  //   } else {
  //     const thingSubType = randomThing.SUBTYPE as TCONTAINER_TYPES;
  //     const container = CONTAINER[thingSubType];
  //     const image = container.IMAGE;
  //     randomName = container.NAME;
  //     randomImage = <Dynamic component={image} />;

  //     actions = [];
  //   }

  //   return {
  //     id: i,
  //     found: false,
  //     thing: {
  //       name: randomName,
  //       type: subType,
  //       img: randomImage,
  //       playerActions: actions,
  //     },
  //   };
  // };

  // const getThing = (i: number) => {
  //   const randomPlaceType = getRandomItemFromArray(PLACE_TYPES) as TPLACE_TYPES;
  //   //const randomPlaceType = "FOREST";

  //   return getThingInformation(PLACES[randomPlaceType], i);
  // };

  // const createThings = () => {
  //   const _place = { ...place() };

  //   for (let i = 0; i < 5; i++) {
  //     _place.things.push(getThing(i));
  //   }

  //   console.log("🚀 ~ createThings ~ _place:", _place)

  //   setPlace({ ..._place });
  // };

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
        currentLocationIndex: mockPlayerPos + 1,
      }));
    }, 1000);
  };

  const goToPreviousArea = () => {
    setPlayer((val) => ({
      ...val,
      currentLocationIndex: mockPlayerPos - 1,
    }));
  };

  return {
    removeThingFromLocation,
    goToPreviousArea,
    explore,
    goToNextArea,
    screen,
    setScreen,
  };
};
