import Button from "./components/Button";
import Modal from "./components/Modal";

// Assets
import { createEffect, createSignal, onMount } from "solid-js";
import Card from "./components/Card";
import Player from "./components/Player";
import { modalState } from "./state/modal";
import { settingsController } from "./state/settings";

/* const cardContainerStyle = "w-[25%] mr-2 mb-2"; */

function Game() {
  const [level, setLevel] = createSignal(0);
  /* const [player] = playerState; */
  const [modal /* setModal */] = modalState;
  /* const [world] = worldState;
  const [combat] = combatState;
  const _combatController = combatController(); */
  /* const _worldController = worldController(); */
  const _settingsController = settingsController();

  onMount(() => {
    _settingsController.loadSettings();
    /* _worldController.createPlaces(); */
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

      <main class="w-[69%]">
        <div id="map">
          <div data-id="level" class="my-4">
            <div class="divider">Level 1</div>
            <div class="flex items-center justify-center">
              <Card
                className="w-[32%]"
                title="Alien"
                img="👽"
                footer={<Button>Select</Button>}
              />
              <Card
                className="w-[32%]"
                title="Alien"
                img="👽"
                footer={<Button>Select</Button>}
              />
              <Card
                className="w-[32%]"
                title="Alien"
                img="👽"
                footer={<Button>Select</Button>}
              />
            </div>
          </div>

          <div data-id="level" class="my-8">
            <div class="divider">Level 2</div>
            <div class="flex items-center justify-center">
              <Card className="w-[32%]" title="Alien" img="😈" />
              <Card className="w-[32%]" title="Alien" img="😈" />
              <Card className="w-[32%]" title="Alien" img="😈" />
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
