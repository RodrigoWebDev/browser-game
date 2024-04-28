import { onMount } from "solid-js";
import { inventoryController, inventoryState } from "../../state/inventory";
import Button from "../Button";
import DropDown from "../Dropwdown";
import { Cash, Weight } from "../Icons";
import ToolTip from "../Tooltip";

const Inventory = () => {
  const [inventory /* setInventory */] = inventoryState;
  const _inventoryController = inventoryController();

  /* const updateInventoryItems = (
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
  }; */

  onMount(() => {});

  return (
    <div id="inventory">
      <div class="flex justify-between">
        <ToolTip text="Cash">
          <div class="flex items-center">
            <Cash size={32} className="mr-2" /> {inventory().money}
          </div>
        </ToolTip>

        <ToolTip text="Weight">
          <div class="flex items-center">
            <Weight size={32} className="mr-2" />{" "}
            <div>
              {_inventoryController
                .getPlayerTotalWiehgt(inventory().items)
                .toFixed(1)}
              /{inventory().maxCapacity.toFixed(1)} kg
            </div>
          </div>
        </ToolTip>
      </div>

      <div class="flex flex-wrap gap-[2%]">
        {inventory().items.map((item) => {
          return (
            <div class="w-[23%]">
              <ToolTip
                text={`${item.name}(x${item.quantity})`}
                className="block"
                direction="right"
              >
                <DropDown
                  trigger={item.img}
                  items={item.playerActions.map((playerAction) => {
                    return (
                      <li>
                        <Button
                          onClick={() => {
                            playerAction.click();
                          }}
                        >
                          {playerAction.name}
                        </Button>
                      </li>
                    );
                  })}
                />
              </ToolTip>
            </div>
          );
        })}
      </div>

      {!inventory().items.length && (
        <div class="text-center py-4">Empty inventory</div>
      )}
    </div>
  );
};

export default Inventory;
