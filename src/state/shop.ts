import { createSignal } from "solid-js";
import { IItemShop } from "../interfaces";

interface IShop {
  items: IItemShop[];
}

export const shopState = createSignal<IShop>({
  items: [],
});

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
