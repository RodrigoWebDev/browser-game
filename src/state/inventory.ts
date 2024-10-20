import { createSignal } from "solid-js";
import { IInventoryItems } from "../interfaces";
import { getTotalPrice } from "../helpers";
import { shopState } from "./shop";
import { IItem2, TItemTypes } from "../constants/model.ts";
import { Game } from "../constants/index.ts";

interface IPlayerInventory {
  money: number;
  maxCapacity: number;
  items: IItem2[];
}

export const inventoryState = createSignal<IPlayerInventory>({
  money: 10000,
  maxCapacity: 4,
  items: [],
});

export const getPlayerTotalWiehgt = (inventoryItems: IItem2[]) => {
  const itemWeights = inventoryItems.map((item) => {
    return item.weight;
  });

  if (itemWeights.length) {
    return itemWeights.reduce((prev: number, curr: number) => {
      return prev + curr;
    });
  } else {
    return 0;
  }
};

export const inventoryController = () => {
  const [inventory, setInventory] = inventoryState;
  const [shop] = shopState;

  const getInventoryWeight = () => {
    return getPlayerTotalWiehgt(inventory().items);
  };

  const updateInventory = (
    newItems: { key: TItemTypes; quantity: number }[],
    operation: "SUM" | "SUBTRACTION"
  ) => {
    if (!newItems) return [];

    const _inventory = [...inventory().items];

    newItems.forEach((newItem) => {
      //TODO: ao invés de usar o findIdex, talvez seja melhor fazer com que o inventário seja um objeto de objetos e buscar o item pelo index. Talvez seja necessário refatorar também como o componente Shop exibe os itens
      const index = _inventory.findIndex((item) => {
        return item.key === newItem.key;
      });
      const itemInfo = Game.Item[newItem.key] as IItem2;

      if (index < 0) {
        _inventory.push({
          ...itemInfo,
          quantity: newItem.quantity,
        });
      } else {
        _inventory[index] = {
          ..._inventory[index],
          quantity:
            operation === "SUM"
              ? newItem.quantity + _inventory[index].quantity
              : _inventory[index].quantity - newItem.quantity,
        };
      }
    });

    const no0QuantityItems = _inventory.filter((item) => {
      return item.quantity > 0;
    });

    setInventory((val) => ({
      ...val,
      items: no0QuantityItems,
      money:
        operation === "SUM"
          ? val.money - getTotalPrice(shop().items)
          : val.money + getTotalPrice(shop().items),
    }));
  };

  return {
    getInventoryWeight,
    updateInventory,
    getPlayerTotalWiehgt,
  };
};

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
