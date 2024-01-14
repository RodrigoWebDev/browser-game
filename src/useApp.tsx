import { createEffect, createSignal, onMount } from "solid-js";
import {
  getRandomIntFromInterval,
  getRandomItemFromArray,
  randomFloatFromInterval,
} from "./helpers";
import Npc from "./classes/Npc";

// Assets
import enemy from "./assets/enemies/0.webp";
import exploration from "./assets/events/exploration.webp";
import { IEnemy, ILocation, IWorld } from "./interfaces";
import {
  DUNGEON,
  MALE_NAMES,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  PLACE_TYPES,
  VILLAGE,
  VILLAGERS,
} from "./constants";

const useApp = () => {
  const [world, setWorld] = createSignal<IWorld>({
    locations: [],
  });
  const [showHit, setShowHit] = createSignal(false);
  const [enemies, setEnemies] = createSignal<IEnemy[]>([]);
  const [player, setPlayerAttributes] = createSignal({
    name: "Tekomo Nakama",
    class: "Guerreiro",
    hp: 100,
    maxHp: 100,
    attackDamage: 50,
  });
  const [modalContent, setModalContent] = createSignal({
    title: "",
    isOpen: false,
    children: <></>,
  });

  /* const [currentLocation, setCurrentLocation] = createSignal<ILocation>({
    name: "Vila oculta da folha",
    type: "village",
    bg: VILLAGE.IMAGES[0],
    things: [
      {
        found: false,
        thing: new Npc(
          0,
          "Natielly",
          "merchant",
          true,
          VILLAGERS.IMAGES[0],
          false,
          (npc: Npc) => {
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
          }
        ),
      },
    ],
  }); */

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
          enemyTakeDamage(index, player().attackDamage);
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

  const closeModal = () => {
    setModalContent((val) => ({
      ...val,
      isOpen: false,
    }));
  };

  const hasThingToFind = () => {
    return world().locations[0].things.some((item) => {
      return item.found == false;
    });
  };

  const findSomething = () => {
    const _world = { ...world() };
    const notFoundIndex = _world.locations[0].things.findIndex(
      (item) => !item.found
    );

    if (notFoundIndex !== -1) {
      _world.locations[0].things[notFoundIndex].found = true;

      setWorld(_world);
    }
  };

  const explore = () => {
    if (hasThingToFind()) {
      setModalContent((val) => ({
        ...val,
        title: `Explorando ${world().locations[0].name}`,
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
        title: "Você ja encontrou tudo",
        children: <></>,
        isOpen: true,
      }));
    }
  };

  const createPlaceInformation = (place: any, type: string) => {
    const name = getRandomItemFromArray(place.NAMES);
    const bg = getRandomItemFromArray(place.IMAGES);
    let things = [];

    const interval = getRandomIntFromInterval(
      MIN_THINGS_NUMBER,
      MAX_THINGS_NUMBER
    );

    for (let i = 0; i < interval; i++) {
      const getRandomThing = getRandomItemFromArray(place.THINGS);
      const randomName = getRandomItemFromArray(MALE_NAMES);
      const randomImage = getRandomItemFromArray(getRandomThing.IMAGES);

      things.push({
        found: false,
        thing: new Npc(
          0,
          randomName,
          "merchant",
          true,
          randomImage,
          false,
          (npc: Npc) => {
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
          }
        ),
      });
    }

    return {
      name,
      type,
      bg,
      things,
    };
  };

  const getPlace = () => {
    const randomPlaceType = getRandomItemFromArray(PLACE_TYPES);

    switch (randomPlaceType) {
      case "dungeon":
        return createPlaceInformation(DUNGEON, "dungeon");
      default:
        return createPlaceInformation(VILLAGE, "village");
    }
  };

  const createPlaces = () => {
    const _world = { ...world() };

    for (let i = 0; i < 5; i++) {
      _world.locations.push(getPlace());
    }

    setWorld({ ..._world });
  };

  createEffect(() => {
    setEnemies([]);
    for (let i = 0; i < 4; i++) {
      setEnemies((val) => [...val, enemyTemplate]);
    }
  });

  onMount(() => {
    createPlaces();
  });

  return {
    showHit,
    player,
    playerTakeDamage,
    enemies,
    //currentLocation,
    modalContent,
    explore,
    world,
  };
};

export default useApp;
