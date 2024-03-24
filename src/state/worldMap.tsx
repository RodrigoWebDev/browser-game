import { JSXElement, createSignal, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import { WorldPlace } from "../classes/WorldPlace";
import NpcTalk from "../components/NpcTalk";
import Shop from "../components/Shop";
import {
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
} from "../constants";
import { CONTAINER, TCONTAINER_TYPES } from "../constants/containers";
import { ENEMY, IENEMY, TENEMY_TYPES } from "../constants/enemies";
import { ITEM, ITEM_TYPES, TITEM_TYPES } from "../constants/items";
import { NPC, NPC_GREETINGS, TNPC_TYPES } from "../constants/npc";
import { INNER_PLACE, IPlace, TINNER_PLACE_TYPES } from "../constants/places";
import {
  getNewArrayWithRandomItems,
  getRandomIntFromInterval,
  getRandomItemFromArray,
} from "../helpers";
import { IAction, IThing, Vector2 } from "../interfaces";
import { combatController } from "./combat";
import { inventoryController, inventoryState } from "./inventory";
import { modalState } from "./modal";
import { playerState } from "./player";
import { shopState } from "./shop";

export const worldMapState = createSignal<any[][]>([]);

export const worldMapController = () => {
  const [worldMap, setWorldMap] = worldMapState;
  const [player, setPlayer] = playerState;
  const [modal, setModal] = modalState;
  const [shop, setShop] = shopState;
  const [inventory, setInventory] = inventoryState;
  const _combatController = combatController();

  const _inventoryController = inventoryController();

  const generatedWorldMap = () => {
    const worldSize = 11;
    const _worldMap: any = [];

    for (let i = 0; i < worldSize; i++) {
      _worldMap.push(
        Array.apply(null, Array(worldSize)).map(function () {
          return new WorldPlace(false, false);
        })
      );
    }

    console.log({ _worldMap });

    return setWorldMap(_worldMap);
  };

  const mapWithVisibleArea = () => {
    if (!worldMap().length) return;

    const _worldMap = worldMap();
    const pos = player().worldPosition;
    const prevPos = player().previousWorldPosition;
    const tilesToShow = [
      {
        x: pos.x,
        y: pos.y,
      }, //Center
      {
        x: pos.x + 1,
        y: pos.y,
      }, //Right
      {
        x: pos.x - 1,
        y: pos.y,
      }, //Left
      {
        x: pos.x,
        y: pos.y + 1,
      }, //Down
      {
        x: pos.x,
        y: pos.y - 1,
      }, //Up
      {
        x: pos.x + 1,
        y: pos.y - 1,
      }, //Up/Righ
      {
        x: pos.x - 1,
        y: pos.y - 1,
      }, //Up/Left
      {
        x: pos.x - 1,
        y: pos.y + 1,
      }, //Down/Left
      {
        x: pos.x + 1,
        y: pos.y + 1,
      }, //Down/Right
    ];

    //Update visible tiles
    tilesToShow.forEach((tile) => {
      const tileY = _worldMap[tile.y];

      if (tileY) {
        const tileX = _worldMap[tile.x];

        if (tileX) {
          /* _worldMap[tile.y][tile.x] = !_worldMap[tile.y][tile.x]
            ? new WorldPlace(false, true)
            : _worldMap[tile.y][tile.x]; */

          _worldMap[tile.y][tile.x].isVisible = true;
        }

        console.log(
          " _worldMap[tile.y][tile.x]",
          _worldMap[tile.y][tile.x].isVisible
        );
      }
    });

    if (prevPos) {
      _worldMap[prevPos.y][prevPos.x].isCurrent = false;
    }

    //Set current position
    _worldMap[pos.y][pos.x].isCurrent = true;

    setWorldMap(_worldMap);

    console.log("DEBUG =======", _worldMap);

    return _worldMap;
  };

  const updateCurrentWorldPlace = (cords: Vector2) => {
    console.log({ cords });

    setPlayer((val) => ({
      ...val,
      previousWorldPosition: {
        x: val.worldPosition.x,
        y: val.worldPosition.y,
      },
    }));

    setPlayer((val) => ({
      ...val,
      worldPosition: {
        ...cords,
      },
    }));
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
    });
  };

  const getRandomTalk = () => {
    return getRandomItemFromArray(NPC_GREETINGS);
  };

  const createPlaceInfo = (place: IPlace) => {
    const name = `${getRandomItemFromArray(place.NAMES)} (${place.ID}) `;
    const bg = getRandomItemFromArray(place.IMAGES);
    let things = [];

    const interval = getRandomIntFromInterval(
      MIN_THINGS_NUMBER,
      MAX_THINGS_NUMBER
    );

    for (let i = 0; i < interval; i++) {
      const randomThing = getRandomItemFromArray(place.THINGS) as IThing;
      /* const randomThing = {
        TYPE: "NPC",
        SUBTYPE: "MERCHANT",
      }; */

      let randomName = "";
      let randomImage: JSXElement;
      let actions: IAction[] = [];
      let subType = randomThing.SUBTYPE.toLocaleLowerCase();
      const thingType = randomThing.TYPE;

      if (thingType === "NPC") {
        //Create NPC Info
        const _subType = randomThing.SUBTYPE as TNPC_TYPES;
        const gender = getRandomItemFromArray(GENDERS) as "MALE" | "FEMALE";
        const images = NPC[_subType][gender].IMAGES;
        randomImage = <Dynamic component={getRandomItemFromArray(images)} />;
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
          //Generate inventory items for merchant
          const inventoryItems = getNewArrayWithRandomItems(
            ITEM_TYPES
          ) as TITEM_TYPES[];

          actions.push({
            name: "Buy",
            click: () => {
              const items = inventoryItems.map((itemName) => ({
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
                    playerCurrentWeight={_inventoryController.getInventoryWeight()}
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
                    playerCurrentWeight={_inventoryController.getInventoryWeight()}
                  />
                ),
              });
            },
          });
        }
      } else if (thingType === "INNER_PLACE") {
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
      } else if (thingType === "ENEMY") {
        const thingSubType = randomThing.SUBTYPE as TENEMY_TYPES;
        const enemy = ENEMY[thingSubType] as IENEMY;
        const image = enemy.IMAGE;
        randomName = enemy.NAME;
        randomImage = <Dynamic component={image} />;

        actions = [
          {
            name: "Start combat",
            click: () => {
              setPlayer((val) => ({
                ...val,
                isInCombat: true,
              }));

              _combatController.setEnemiesToCombat(i, enemy);

              /* if (combat()) {
              } */
              //this.talk();
            },
          },
        ];
      } else {
        const thingSubType = randomThing.SUBTYPE as TCONTAINER_TYPES;
        const container = CONTAINER[thingSubType];
        const image = container.IMAGE;
        randomName = container.NAME;
        randomImage = <Dynamic component={image} />;

        actions = [];
      }

      things.push({
        id: i,
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

  const move = (cords: Vector2, place?: any) => {
    const _worldMap = worldMap();

    setModal(() => ({
      isOpen: true,
      title: "",
      children: <></>,
    }));

    setTimeout(() => {
      updateCurrentWorldPlace(cords);

      const generatedPlaceInfo = createPlaceInfo(place);

      _worldMap[cords.y][cords.x] = {
        ..._worldMap[cords.y][cords.x],
        info: generatedPlaceInfo,
      };

      console.log({ generatedPlaceInfo });

      setModal(() => ({
        isOpen: true,
        children: <></>,
      }));
    }, 1000);
  };

  onMount(() => {
    generatedWorldMap();

    document.addEventListener("click", () => {
      /* setPlayer((val) => ({
        ...val,
        previousWorldPosition: {
          x: val.worldPosition.x,
          y: val.worldPosition.y,
        },
      }));

      setPlayer((val) => ({
        ...val,
        worldPosition: {
          x: val.worldPosition.x + 1,
          y: val.worldPosition.y + 1,
        },
      })); */
    });
  });

  return {
    mapWithVisibleArea,
    move,
  };
};
