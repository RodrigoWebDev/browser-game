import { createSignal } from "solid-js";
import { E_SCREENS } from "../enums/index.ts";

export const screenState = createSignal<E_SCREENS>(E_SCREENS.WORLD_MAP);

export const screenController = () => {
  const [screen, setScreen] = screenState;

  return {
    screen,
    setScreen,
  };
};

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
