import { Dynamic } from "solid-js/web";
import { createSignal, onCleanup, onMount } from "solid-js";
import { ACTIONS, event, getPlayerTotalWiehgt } from "../../helpers";
import { IInventoryItems, IItemShop } from "../../interfaces";
import ToolTip from "../Tooltip";
import DropDown from "../dropwdown";

interface IPlayerInventory {
  maxCapacity: number;
  items: IInventoryItems[];
}

const Inventory = () => {
  const [playerInventory, setPlayerInventory] = createSignal<IPlayerInventory>({
    //money: 10000,
    maxCapacity: 4,
    items: [],
  });

  const formatToInventoryItems = (purchasedItems: IItemShop[]) => {
    if (!purchasedItems) return [];

    const inventory = [...playerInventory().items];

    purchasedItems.forEach((shopItem) => {
      //TODO: ao invés de usar o findIdex, talvez seja melhor fazer com que o inventário seja um objeto de objetos e buscar o item pelo index. Talvez seja necessário refatorar também como o componente Shop exibe os itens
      const index = inventory.findIndex((item) => {
        return item.key === shopItem.key;
      });

      if (index < 0) {
        inventory.push({
          ...shopItem,
          quantity: shopItem.quantitySelected,
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
        inventory[index] = {
          ...inventory[index],
          quantity: shopItem.quantitySelected + inventory[index].quantity,
        };
      }
    });

    setPlayerInventory((val) => ({
      ...val,
      items: inventory,
    }));
  };

  const formatItemsToSell = () => {
    return playerInventory().items.map((item) => {
      return {
        ...item,
        maxQuantity: item.quantity,
      };
    });
  };

  onMount(() => {
    event.subscribe(ACTIONS.UPDATE_PLAYER_INVENTORY, (items: any) => {
      formatToInventoryItems([...items]);
    });

    event.subscribe(ACTIONS.SELL_ITEMS, () => {
      if (playerInventory().items.length) {
        event.dispatch(ACTIONS.UPDATE_SHOP_ITEMS, formatItemsToSell());
      } else {
        event.dispatch(ACTIONS.SET_MODAL, {
          title: "You have no items to sell",
          isOpen: true,
          children: <></>,
        });
      }
    });
  });

  return (
    <div id="inventory">
      <div class="flex justify-between">
        <h2 class="mb-2">Inventory</h2>
        <div>
          {getPlayerTotalWiehgt(playerInventory().items).toFixed(1)}/
          {playerInventory().maxCapacity.toFixed(1)} kg
        </div>
      </div>

      <div class="flex flex-wrap gap-[2%]">
        {playerInventory().items.map((item) => {
          return (
            <div class="w-[23%]">
              <ToolTip
                text={`${item.name}(x${item.quantity})`}
                className="block"
              >
                <DropDown
                  trigger={
                    <Dynamic
                      component={item.img}
                      className="bg-[#15191e] rounded-box"
                    />
                  }
                  items={item.playerActions.map((playerAction) => {
                    return (
                      <li
                        onClick={() => {
                          playerAction.click();
                        }}
                      >
                        <a>{playerAction.name}</a>
                      </li>
                    );
                  })}
                />
              </ToolTip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
