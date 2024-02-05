import { createSignal } from "solid-js";
import { IInventoryItems } from "../interfaces";

interface IPlayerInventory {
  money: number;
  maxCapacity: number;
  items: IInventoryItems[];
}

export const inventoryState = createSignal<IPlayerInventory>({
  money: 10000,
  maxCapacity: 4,
  items: [],
});

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
