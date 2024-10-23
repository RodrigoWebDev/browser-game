import { JSX, JSXElement, createSignal, onMount } from "solid-js";
import { WorldPlace } from "../classes/WorldPlace";
import NpcTalk from "../components/NpcTalk";
import Shop from "../components/Shop";
import {
  Game,
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_GREETINGS,
  NPC_NAMES,
  COLOR_PALETTE,
} from "../constants";
import {
  IPlaceTwo,
  IThingTwo,
  TContainerTypes,
  TEnemyTypes,
  TInnerPlaceTypes,
  TNpcTypes,
  TPlaceTypes,
} from "../constants/model";
import { getRandomIntFromInterval, getRandomItemFromArray } from "../helpers";
import { IAction, ISVG, IThing, Vector2 } from "../interfaces";
import { inventoryController, inventoryState } from "./inventory";
import { modalState } from "./modal";
import { playerController, playerState } from "./player";
import { shopState } from "./shop";
import { E_SCREENS } from "../enums";
import { screenController } from "./screen";
import { PersonWalk } from "../components/Icons";
import Card from "../components/Card";
import { Dynamic } from "solid-js/web";
import DropDown from "../components/Dropwdown";
import Button from "../components/Button";
import SwordsSvg from "../components/SvgIcons/swords";

export const worldMapState = createSignal<any[][]>([]);

export const worldMapController = () => {
  const [worldMap, setWorldMap] = worldMapState;
  const [player, setPlayer] = playerState;
  const [, setModal] = modalState;
  const [, setShop] = shopState;
  const [inventory] = inventoryState;

  const _inventoryController = inventoryController();
  const _screenController = screenController();
  const _playerController = playerController();

  const place = () => {
    const worldPosition = player().worldPosition;
    const location = worldMap()[worldPosition.y][worldPosition.x];
    return location;
  };

  const setPlace = (info: any) => {
    const { x, y } = player().worldPosition;
    const _worldMap = worldMap();
    _worldMap[y][x] = info;
    setWorldMap([..._worldMap]);
  };

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

    setWorldMap(_worldMap);
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
    });
  };

  const getRandomTalk = () => {
    return getRandomItemFromArray(NPC_GREETINGS);
  };

  const createPlaceInfo = (cords: Vector2, id: number) => {
    const _worldMap = worldMap();
    const placeType = _worldMap[cords.y][cords.x].info.type as TPlaceTypes;
    const place = Game.Places[placeType] as unknown as IPlaceTwo;
    const randomThing = getRandomItemFromArray(place.things) as IThingTwo;
    let subType = randomThing.subtype;

    /* const randomThing = {
        TYPE: "NPC",
        SUBTYPE: "MERCHANT",
      }; */

    let randomName = "";
    let randomImage: (props: ISVG) => JSX.Element = () => <></>;
    let actions: IAction[] = [];
    let randomColor = getRandomItemFromArray(COLOR_PALETTE);
    const thingType = randomThing.type;

    if (thingType === "Npc") {
      //Create NPC Info
      const _subType = randomThing.subtype as TNpcTypes;
      const gender = getRandomItemFromArray(GENDERS) as "Male" | "Female";
      const images = Game.Npc[_subType][gender].Images;
      randomImage = getRandomItemFromArray(images);
      randomName = getRandomItemFromArray(NPC_NAMES[gender]);
      actions = [...actions, "Talk"];

      // if (_subType == "MERCHANT") {
      //   //Generate inventory items for merchant
      //   const inventoryItems = getNewArrayWithRandomItems(
      //     ITEM_TYPES
      //   ) as TITEM_TYPES[];

      //   placeActions = [...placeActions, "Buy", "Sell"];
      // }
    } else if (thingType === "InnerPlace") {
      //Create INNER_PLACE Info
      const _subType = randomThing.subtype as TInnerPlaceTypes;
      const thing = Game.InnerPlace[_subType];
      randomImage = thing.img;
      //randomName = getRandomItemFromArray(thing.NAMES);

      actions = [...actions, "Talk"];
    } else if (thingType === "Enemy") {
      const thingSubType = randomThing.subtype as TEnemyTypes;
      //const enemy = ENEMY[thingSubType] as IENEMY;
      const enemy = Game[thingType][thingSubType];
      const image = enemy.img as any;
      randomImage = image;
      randomName = enemy.name;
      subType = randomThing.type;

      actions = [...actions, "Attack"];

      // actions = [
      //   {
      //     name: "Start combat",
      //     click: () => {
      //       setPlayer((val) => ({
      //         ...val,
      //         isInCombat: true,
      //       }));

      //       const _enemy = {
      //         ...enemy,
      //         color: randomColor,
      //         cords,
      //       };

      //       _combatController.setEnemiesToCombat(i, _enemy);

      //       /* if (combat()) {
      //       } */
      //       //this.talk();
      //     },
      //   },
      // ];
    } else {
      const thingSubType = randomThing.subtype as TContainerTypes;
      const container = Game.Containers[thingSubType];
      // const image = container.IMAGE as any;
      // randomName = container.NAME;
      randomImage = container.img as any;

      actions = [];
    }

    // _worldMap[cords.y][cords.x].info.things[id].thing = {
    //   name: randomName,
    //   type: subType,
    //   img: randomImage,
    //   placeActions,
    //   fill: randomColor,
    //   hp: 10
    // };

    //_worldMap[cords.y][cords.x].info.things[id].thing = new Entity(id, randomThing)
    _worldMap[cords.y][cords.x].info.things[id].thing = {
      id,
      name: randomName,
      type: subType,
      img: randomImage,
      fill: randomColor,
      hp: 10,
      sawThePlayer: false,
      actions,
    };

    _worldMap[cords.y][cords.x].info.things[id].found = true;

    setWorldMap([..._worldMap]);
  };

  const createEmptyPlaceInfo = (place: IPlaceTwo, cords: Vector2) => {
    const name = `${getRandomItemFromArray(place.names)} (${place.type}) `;
    const bg = getRandomItemFromArray(place.images);
    let things = [];

    const interval = getRandomIntFromInterval(
      MIN_THINGS_NUMBER,
      MAX_THINGS_NUMBER
    );

    for (let i = 0; i < interval; i++) {
      things.push({
        id: i,
        thing: undefined,
        // {
        //   name: randomName,
        //   type: subType,
        //   img: randomImage,
        //   playerActions: actions,
        //   fill: randomColor,
        // },
      });
    }

    return {
      name,
      type: place.type,
      bg,
      things,
    };
  };

  const setCurrentPosition = (
    _worldMap: any[][],
    cords: Vector2,
    _place?: any
  ) => {
    const generatedPlaceInfo = createEmptyPlaceInfo(_place, cords);

    setPlayer({
      ...player(),
      previousWorldPosition: player().worldPosition,
      worldPosition: cords,
    });

    const prevPos = player().previousWorldPosition!;

    if (prevPos) {
      _worldMap[prevPos.y][prevPos.x].isCurrent = false;
    }

    if (!_worldMap[cords.y][cords.x].info) {
      _worldMap[cords.y][cords.x] = {
        ..._worldMap[cords.y][cords.x],
        info: generatedPlaceInfo,
        isCurrent: true,
      };
    }
  };

  const move = (cords: Vector2, _place?: any) => {
    const _worldMap = worldMap();
    const getLocation = () => _worldMap[cords.y][cords.x];

    showAdjacentTiles(_worldMap, cords);
    setCurrentPosition(_worldMap, cords, _place);
    setWorldMap(_worldMap);

    setModal(() => ({
      isOpen: true,
      title: "",
      children: <p>Moving to {getLocation().info.name}</p>,
    }));

    setTimeout(() => {
      setModal({ isOpen: false });

      setPlace({
        ...getLocation(),
      });

      _screenController.setScreen(E_SCREENS.PLACE);
    }, 1000);
  };

  const createInitialPlace = (cords: Vector2) => {
    const worldPlace = new WorldPlace(false, false);

    //let placeType = E_LOCATIONS[worldPlace.type] as TPLACE_TYPES;
    const worldLocation = Game.Places[worldPlace.type] as unknown as IPlaceTwo;

    worldPlace.info = createEmptyPlaceInfo(worldLocation, cords);
    worldPlace.isVisible = true;
    worldPlace.isCurrent = true;

    //setPlace(worldPlace.info);

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
            return createInitialPlace({ x, y });
          }

          return createPlace(x, y);
        })
      );
    }

    setWorldMap(_worldMap);
  };

  const hasThingToFind = () => {
    return place().info.things.some((item: any) => {
      return !item.thing;
    });
  };

  const findSomething = () => {
    const _place = { ...place() };
    const notFoundIndex = _place.info.things.findIndex(
      (item: any) => !item.thing
    );

    if (notFoundIndex !== -1) {
      _place.info.things[notFoundIndex].found = true;
      createPlaceInfo(player().worldPosition, notFoundIndex);

      const thing = _place.info.things[notFoundIndex].thing;
      console.log("🚀 ~ findSomething ~ thing:", thing);

      if (_place.info.things[notFoundIndex].thing.type === "Enemy") {
        const sawPlayer = !!getRandomIntFromInterval(0, 1);
        _place.info.things[notFoundIndex].thing.sawPlayer = sawPlayer;

        setModal((prev) => ({
          ...prev,
          isOpen: true,
          title: `You found an enemy ${
            sawPlayer
              ? "and he saw you, fight started!"
              : "but he hasn't seen you yet."
          }`,
          hideCloseButton: sawPlayer,
          children: (
            <div class="my-8">
              <div class="flex gap-2">
                <div class="w-[30%]">
                  <Dynamic component={thing.img} fill={thing.fill} />
                </div>
                <div class="grow">
                  <h2 class="mb-2">Name: {thing.name}</h2>

                  <div class="flex items-center">
                    <span class="mr-2">HP:</span>
                    <progress
                      class="progress progress-error"
                      value={100}
                      max={100}
                    ></progress>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                  {_playerController.getPlayerActions(thing, sawPlayer).map((item) => {
                    return (
                      <Button
                        className="mr-2"
                        onClick={() => {
                          item.onClick();
                        }}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
              </div>
            </div>
          ),
        }));
      }

      setPlace(_place);
    }
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

  onMount(() => {
    if (!worldMap().length) {
      generatedWorldMap();
    }
  });

  return {
    move,
    place,
    setPlace,
    createPlaceInfo,
    explore,
  };
};
