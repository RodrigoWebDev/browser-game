import { createSignal, onMount } from "solid-js";
import { getRandomIntFromInterval, getRandomItemFromArray } from "./helpers";
import Npc from "./classes/Npc";
import Enemy from "./classes/Enemy";

// Assets
import exploration from "./assets/events/exploration.webp";
import { IWorld } from "./interfaces";
import {
  GENDERS,
  IPlace,
  MAX_THINGS_NUMBER,
  MIN_THINGS_NUMBER,
  NPC_NAMES,
  PLACES,
  PLACE_TYPES,
  THINGS,
  IThing,
  ENEMIES,
} from "./constants";
import { IAction } from "./classes/interfaces";

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
    isInCombat: true,
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
      const thingSubType = randomThing.SUBTYPE as "VILLAGER";

      let randomName;
      let randomImage;

      if (randomThing.TYPE === "NPC") {
        //Create NPC Info
        /* const randomNPCName =  */
        const gender = getRandomItemFromArray(GENDERS) as "MALE" | "FEMALE";
        randomImage = getRandomItemFromArray(
          THINGS[thingSubType][gender].IMAGES
        );
        randomName = getRandomItemFromArray(NPC_NAMES[gender]);

        console.log({ gender, randomName, randomImage });
        /* const name = getRandomItemFromArray(NPC_NAMES[gender]);
        const image = getRandomItemFromArray(THINGS[randomThingName].IMAGES); */
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
    const randomPlaceType = getRandomItemFromArray(PLACE_TYPES);

    switch (randomPlaceType) {
      case "dungeon":
        return createPlaceInformation(PLACES.DUNGEON);
      default:
        return createPlaceInformation(PLACES.VILLAGE);
    }
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
