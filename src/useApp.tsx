import { createSignal, onMount } from "solid-js";
import { getRandomIntFromInterval, getRandomItemFromArray } from "./helpers";
import Npc from "./classes/Npc";
import Enemy from "./classes/Enemy";

// Assets
import exploration from "./assets/events/exploration.webp";
import { IWorld } from "./interfaces";
import {
  GENDERS,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
} from "./constants";
import { IAction } from "./classes/interfaces";
import { ENEMIES, TEnemyTypes } from "./constants/enemies";
import { IThing, THINGS } from "./constants/things";
import { IPlace, PLACES, PLACE_TYPES, TPLACE_TYPES } from "./constants/places";

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
  });
  const [combatScreen, setCombatScreen] = createSignal({
    enemies: [new Enemy(0, ENEMIES["TROLL"]), new Enemy(1, ENEMIES["GOBLIN"])],
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
        title: "Você ja encontrou tudo",
        children: <></>,
        isOpen: true,
      }));
    }
  };

  const createPlaceInformation = (place: IPlace) => {
    const name = `${getRandomItemFromArray(place.NAMES)} ${place.ID}`;
    const bg = getRandomItemFromArray(place.IMAGES);
    let things = [];

    const interval = getRandomIntFromInterval(
      MIN_THINGS_NUMBER,
      MAX_THINGS_NUMBER
    );

    for (let i = 0; i < interval; i++) {
      const randomThing = getRandomItemFromArray(place.THINGS) as IThing;

      let randomName = "";
      let randomImage = "";

      if (randomThing.TYPE === "NPC") {
        const thingSubType = randomThing.SUBTYPE as "VILLAGER";
        //Create NPC Info
        const gender = getRandomItemFromArray(GENDERS) as "MALE" | "FEMALE";
        randomImage = getRandomItemFromArray(
          THINGS[thingSubType][gender].IMAGES
        );
        randomName = getRandomItemFromArray(NPC_NAMES[gender]);
      }

      if (randomThing.TYPE === "STRUCTURE") {
        const thingSubType = randomThing.SUBTYPE as "TAVERN";

        randomImage = getRandomItemFromArray(THINGS[thingSubType].IMAGES);
        randomName = `${getRandomItemFromArray(place.NAMES)} tavern`;
      }

      if (randomThing.TYPE === "ENEMY") {
        const thingSubType = randomThing.SUBTYPE as "ENEMY";
        const randomEmeny = getRandomItemFromArray(
          THINGS[thingSubType].TYPES
        ) as TEnemyTypes;
        const enemyInformation = ENEMIES[randomEmeny];

        randomImage = enemyInformation.image;
        randomName = enemyInformation.name;
      }

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
      type: place.ID,
      bg,
      things,
    };
  };

  const getPlace = () => {
    const randomPlaceType = getRandomItemFromArray(PLACE_TYPES) as TPLACE_TYPES;

    return createPlaceInformation(PLACES[randomPlaceType]);

    /* switch (randomPlaceType) {
      case "dungeon":
        return createPlaceInformation(PLACES.DUNGEON);
      default:
        return createPlaceInformation(PLACES.VILLAGE);
    } */
  };

  const createPlaces = () => {
    const _world = { ...world() };

    for (let i = 0; i < 5; i++) {
      _world.locations.push(getPlace());
    }

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
