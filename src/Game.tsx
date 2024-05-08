import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import { createEffect, createSignal, onMount } from "solid-js";
import Card from "./components/Card";
import Player from "./components/Player";
import { ENTITIES } from "./constants";
import { ILevel } from "./interfaces";
import { modalState } from "./state/modal";
import { settingsController } from "./state/settings";

function Game() {
  const [levels, setLevels] = createSignal<ILevel[]>([]);
  const [currentLevel, setCurrentLevel] = createSignal(0);

  const [modal] = modalState;
  const _settingsController = settingsController();

  const getRandomizedEntityType = () => {
    const n = Math.floor(Math.random() * ENTITIES.length);

    return ENTITIES[n];
  };

  const getRandomEntityFromType = (entityObject: any) => {
    const entities = Object.entries(entityObject);
    const n = Math.floor(Math.random() * entities.length);

    return entities[n][1];
  };

  const generateLevels = () => {
    const howManyLevels = 10;
    let _levels: ILevel[] = [];

    for (let i = 0; i < howManyLevels; i++) {
      const howManeyThingsInThisLevel = Math.floor(Math.random() * 10);

      _levels.push({
        entities: [],
      });

      for (let j = 0; j < howManeyThingsInThisLevel; j++) {
        const entityType = getRandomizedEntityType();
        const entity = getRandomEntityFromType(entityType);

        _levels[i].entities.push(entity);
      }
    }

    setLevels(_levels);
    window.localStorage["levels"] = JSON.stringify(_levels);
  };

  onMount(() => {
    const levelsInStorage = window.localStorage["levels"]
      ? JSON.parse(window.localStorage["levels"])
      : [];

    _settingsController.loadSettings();

    if (levelsInStorage.length) {
      setLevels(levelsInStorage);
    } else {
      generateLevels();
    }
  });

  createEffect(() => {
    _settingsController.updateSettings();
  });

  return (
    <div class="flex justify-between h-screen max-w-[1360px] mx-auto">
      <aside class="w-[29%] p-4">
        <Player />
      </aside>

      <main class="w-[69%]">
        <div id="map">
          <div data-id="level" class="my-4">
            <div class="divider">Level {currentLevel()}</div>
            <Button>Explore</Button>
            <div class="flex items-center justify-center flex-wrap">
              {levels()?.[currentLevel()]?.entities.map((entity) => {
                return (
                  <Card
                    className="w-[32%]"
                    title={entity.NAME}
                    img={entity.IMAGE}
                    footer={<Button>Select</Button>}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Modal title={modal().title} isOpen={modal().isOpen}>
        {modal().children}
      </Modal>

      <Button
        className="fixed top-[1rem] right-[1rem] btn-sm"
        onClick={() => {
          _settingsController.openMenu();
        }}
      >
        Menu
      </Button>
    </div>
  );
}

export default Game;
