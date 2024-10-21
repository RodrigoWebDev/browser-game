import { createSignal, JSXElement } from "solid-js";

interface IModal {
  title?: string;
  isOpen: boolean;
  children?: JSXElement | string | null;
  hideCloseButton?: boolean
}

export const modalState = createSignal<IModal>({
  title: "",
  isOpen: false,
  children: "",
  hideCloseButton: false,
});

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
