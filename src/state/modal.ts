import { createSignal, JSXElement } from "solid-js";

interface IModal {
  title?: string;
  isOpen: boolean;
  children?: JSXElement | null;
}

export const modalState = createSignal<IModal>({
  title: "",
  isOpen: false,
  children: null,
});

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
