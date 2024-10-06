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
import {
  INNER_PLACE,
  IPlace,
  PLACES,
  TINNER_PLACE_TYPES,
  TPLACE_TYPES,
} from "../constants/places";
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
import { placeState } from "./place";
import { E_LOCATIONS, E_SCREENS } from "../enums";
import { screenController } from "./screen";

export const worldMapState = createSignal<any[][]>([]);

export const worldMapController = () => {
  const [worldMap, setWorldMap] = worldMapState;
  const [player, setPlayer] = playerState;
  const [, setModal] = modalState;
  const [, setShop] = shopState;
  const [, setPlace] = placeState;
  const [inventory] = inventoryState;

  const _combatController = combatController();
  const _inventoryController = inventoryController();
  const _screenController = screenController();
  const [worldMapTiles, setWorldMapTiles] = createSignal([]);

  const isAdjacentTile = (x: number, y: number) => {
    const pos = player().worldPosition;
    const adjacentTiles = [
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

    return adjacentTiles.some((tile) => {
      return tile.x === x && tile.y === y;
    });
  };

  const showAdjacentTiles = (_worldMap: any[][], cords: Vector2) => {
    //if (!worldMap().length) return;

    const tilesToShow = [
      {
        x: cords.x,
        y: cords.y,
      }, //Center
      {
        x: cords.x + 1,
        y: cords.y,
      }, //Right
      {
        x: cords.x - 1,
        y: cords.y,
      }, //Left
      {
        x: cords.x,
        y: cords.y + 1,
      }, //Down
      {
        x: cords.x,
        y: cords.y - 1,
      }, //Up
      {
        x: cords.x + 1,
        y: cords.y - 1,
      }, //Up/Righ
      {
        x: cords.x - 1,
        y: cords.y - 1,
      }, //Up/Left
      {
        x: cords.x - 1,
        y: cords.y + 1,
      }, //Down/Left
      {
        x: cords.x + 1,
        y: cords.y + 1,
      }, //Down/Right
    ];

    //Update visible tiles
    tilesToShow.forEach((tile) => {
      const tileY = _worldMap[tile.y];

      if (tileY) {
        const tileX = _worldMap[tile.x];

        if (tileX) {
          _worldMap[tile.y][tile.x].isVisible = true;
        }
      }
    });
    console.log("🚀 ~ mapWithVisibleArea ~ _worldMap:", _worldMap)

    setWorldMap(_worldMap);

    return _worldMap;
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

  const setCurrentPosition = (_worldMap: any[][], cords: Vector2, _place?: any) => {
    const generatedPlaceInfo = createPlaceInfo(_place);

    setPlayer({
      ...player(),
      previousWorldPosition: player().worldPosition,
      worldPosition: cords
    });

    const prevPos = player().previousWorldPosition!;

    if(prevPos){
      _worldMap[prevPos.y][prevPos.x].isCurrent = false;
    }

    if (!_worldMap[cords.y][cords.x].info) {
      _worldMap[cords.y][cords.x] = {
        ..._worldMap[cords.y][cords.x],
        info: generatedPlaceInfo,
        isCurrent: true,
      }
    }
  }

  const move = (cords: Vector2, _place?: any) => {
    const _worldMap = worldMap();
    const getLocation = () => _worldMap[cords.y][cords.x];

    showAdjacentTiles(_worldMap, cords)
    setCurrentPosition(_worldMap, cords, _place)
    setWorldMap(_worldMap);

    setModal(() => ({
      isOpen: true,
      title: "",
      children: <p>Moving to {getLocation().info.name}</p>,
    }));

    setTimeout(() => {
      setModal({ isOpen: false });

      setPlace({
        ...getLocation().info,
      });

      _screenController.setScreen(E_SCREENS.PLACE);
    }, 1000);
  };

  const createInitialPlace = () => {
    const worldPlace = new WorldPlace(false, false);

    let placeType = E_LOCATIONS[worldPlace.type] as TPLACE_TYPES;
    let worldLocation = PLACES[placeType];

    worldPlace.info = createPlaceInfo(worldLocation);
    worldPlace.isVisible = true;
    worldPlace.isCurrent = true;
    console.log("🚀 ~ createInitialPlace ~ worldPlace:", worldPlace);

    setPlace(worldPlace.info);

    return worldPlace;
  };

  const createPlace = (x: number, y: number) => {
    const place = new WorldPlace(false, false);

    if (isAdjacentTile(x, y)) {
      place.isVisible = true;
    }

    return place;
  };

  const generatedWorldMap = () => {
    const worldSize = 11;
    const _worldMap: any = [];

    const playerPositionInWorld = player().worldPosition;

    for (let x = 0; x < worldSize; x++) {
      _worldMap.push(
        Array.apply(null, Array(worldSize)).map(function (_, y) {
          const isPlayerInitialPosition =
            playerPositionInWorld.x === x && playerPositionInWorld.y === y;

          if (isPlayerInitialPosition) {
            return createInitialPlace();
          }

          return createPlace(x, y);
        })
      );
    }

    setWorldMap(_worldMap);
  };

  onMount(() => {
    if (!worldMap().length) {
      generatedWorldMap();
    }
  });

  return {
    move,
  };
};
