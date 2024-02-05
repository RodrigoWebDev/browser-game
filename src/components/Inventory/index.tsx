import { Dynamic } from "solid-js/web";
import { onMount } from "solid-js";
import { getPlayerTotalWiehgt } from "../../helpers";
import { IItemShop } from "../../interfaces";
import ToolTip from "../Tooltip";
import DropDown from "../dropwdown";
import { inventoryState } from "../../state/inventory";

const Inventory = () => {
  const [inventory, setInventory] = inventoryState;

  const updateInventoryItems = (
    purchasedItems: IItemShop[],
    operation: "SUM" | "SUBTRACTION"
  ) => {
    if (!purchasedItems) return [];

    const _inventory = [...inventory().items];

    purchasedItems.forEach((shopItem) => {
      //TODO: ao invés de usar o findIdex, talvez seja melhor fazer com que o inventário seja um objeto de objetos e buscar o item pelo index. Talvez seja necessário refatorar também como o componente Shop exibe os itens
      const index = _inventory.findIndex((item) => {
        return item.key === shopItem.key;
      });

      if (index < 0) {
        _inventory.push({
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
        _inventory[index] = {
          ..._inventory[index],
          quantity:
            operation === "SUM"
              ? shopItem.quantitySelected + _inventory[index].quantity
              : _inventory[index].quantity - shopItem.quantitySelected,
        };
      }
    });

    const no0QuantityItems = _inventory.filter((item) => {
      return item.quantity > 0;
    });

    setInventory((val) => ({
      ...val,
      items: no0QuantityItems,
    }));
  };

  const formatItemsToSell = () => {
    return inventory().items.map((item) => {
      return {
        ...item,
        maxQuantity: item.quantity,
      };
    });
  };

  onMount(() => {});

  return (
    <div id="inventory">
      <div>Money: {inventory().money}</div>

      <div class="flex justify-between">
        <h2 class="mb-2">Inventory</h2>
        <div>
          {getPlayerTotalWiehgt(inventory().items).toFixed(1)}/
          {inventory().maxCapacity.toFixed(1)} kg
        </div>
      </div>

      <div class="flex flex-wrap gap-[2%]">
        {inventory().items.map((item) => {
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
