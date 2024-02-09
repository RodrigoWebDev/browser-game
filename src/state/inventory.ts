import { createSignal } from "solid-js";
import { IInventoryItems } from "../interfaces";
import { IITEM, ITEM, TITEM_TYPES } from "../constants/items";
import { getTotalPrice } from "../helpers";
import { shopState } from "./shop";

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

export const updateInventory = (
  newItems: { key: TITEM_TYPES; quantity: number }[],
  operation: "SUM" | "SUBTRACTION"
) => {
  const [inventory, setInventory] = inventoryState;
  const [shop] = shopState;

  if (!newItems) return [];

  const _inventory = [...inventory().items];

  newItems.forEach((newItem) => {
    //TODO: ao invés de usar o findIdex, talvez seja melhor fazer com que o inventário seja um objeto de objetos e buscar o item pelo index. Talvez seja necessário refatorar também como o componente Shop exibe os itens
    const index = _inventory.findIndex((item) => {
      return item.key === newItem.key;
    });
    const itemInfo = ITEM[newItem.key] as IITEM;

    if (index < 0) {
      _inventory.push({
        ...itemInfo,
        quantity: newItem.quantity,
        playerActions: [
          {
            name: "Equip",
            click: () => {},
          },
          {
            name: "Consume",
            click: () => {},
          },
          {
            name: "Info",
            click: () => {},
          },
        ],
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

// somewhere else:
/* import counter from './counter';
const [count, setCount] = counter; */
