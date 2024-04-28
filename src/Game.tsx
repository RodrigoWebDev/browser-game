import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import { createEffect, onMount } from "solid-js";
import Card from "./components/Card";
import Player from "./components/Player";
import { modalState } from "./state/modal";
import { settingsController } from "./state/settings";
import { worldController } from "./state/world";

/* const cardContainerStyle = "w-[25%] mr-2 mb-2"; */

function Game() {
  /* const [player] = playerState; */
  const [modal /* setModal */] = modalState;
  /* const [world] = worldState;
  const [combat] = combatState;
  const _combatController = combatController(); */
  const _worldController = worldController();
  const _settingsController = settingsController();

  onMount(() => {
    _settingsController.loadSettings();
    _worldController.createPlaces();
  });

  createEffect(() => {
    _settingsController.updateSettings();
  });

  return (
    <div class="flex justify-between h-screen max-w-[1360px] mx-auto">
      <aside class="w-[29%] p-4">
        <Player />
      </aside>

      {/* <WorldMap /> */}

      <main>
        <div id="combatScreen" class="flex items-center justify-center">
          <Card title="" />
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
