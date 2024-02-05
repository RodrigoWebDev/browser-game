import { onMount } from "solid-js";
import { IItemShop } from "../../interfaces";
import Button from "../Button";
import Card from "../Card";
import { shopState } from "../../state/shop";
import { inventoryState } from "../../state/inventory";
import { modalState } from "../../state/modal";

//States
/* import inventoryState from "../../state/inventory";
import shopState from "../../state/shop";
import modalState from "../../state/modal"; */

interface IShop {
  playerMoney: number;
  playerCurrentWeight: number;
  playerInventoryMaxCapacity: number;
  closeModal: () => void;
  isBuying?: boolean;
}

const getTotalPrice = (items: IItemShop[]) => {
  const selectedItems = items.filter((item) => {
    return item.quantitySelected > 0;
  });

  const selectedItemsPriceOnly = selectedItems.map((item) => {
    return item.price * item.quantitySelected;
  });

  if (selectedItemsPriceOnly.length > 0) {
    return selectedItemsPriceOnly.reduce((prev: number, curr: number) => {
      return prev + curr;
    });
  } else {
    return 0;
  }
};

const Shop = (props: IShop) => {
  //const [items, setItems] = createSignal<IItemShop[]>([]);
  const [shop, setShop] = shopState;
  const [inventory, setInventory] = inventoryState;
  const [modal, setModal] = modalState;
  //const [money, setMoney] = createSignal(0);

  const getConfirmButtonText = () => {
    return props.isBuying ? "Buy" : "Sell";
  };

  const updateItemsQuantity = () => {
    shop().items.forEach((item) => {
      item.maxQuantity = item.maxQuantity - item.quantitySelected;
    });
  };

  const getTransactionItems = () => {
    return shop().items.filter((item) => {
      return item.quantitySelected > 0;
    });
  };

  const hasEnoughMoney = () => {
    return props.playerMoney > getTotalPrice(shop().items);
  };

  const getBuyedItemsTotalWeight = () => {
    const weights = getTransactionItems().map((item) => {
      return item.weight * item.quantitySelected;
    });

    if (weights.length) {
      return weights.reduce((prev: number, curr: number) => {
        return prev + curr;
      });
    } else {
      return 0;
    }
  };

  const isPlayerInMaxWeightCapacity = () => {
    return props.playerCurrentWeight >= props.playerInventoryMaxCapacity;
  };

  const willByPassMaxWeight = () => {
    return getBuyedItemsTotalWeight() > props.playerInventoryMaxCapacity;
  };

  const totalWeightAfterBuy = () => {
    return getBuyedItemsTotalWeight() + props.playerCurrentWeight;
  };

  const canShowBuyButton = () => {
    return (
      getTotalPrice(shop().items) > 0 &&
      hasEnoughMoney() &&
      !isPlayerInMaxWeightCapacity() &&
      !willByPassMaxWeight()
    );
  };

  const update = () => {
    setShop((val) => ({
      ...val,
      items: [...shop().items],
    }));
  };

  const resetItemsQuantitySelected = () => {
    setShop((val) => ({
      ...val,
      items: val.items.map((item) => {
        return {
          ...item,
          quantitySelected: 0,
        };
      }),
    }));
  };

  const updateInventory = (
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
      money:
        operation === "SUM"
          ? val.money - getTotalPrice(shop().items)
          : val.money + getTotalPrice(shop().items),
    }));
  };

  onMount(() => {
    resetItemsQuantitySelected();
  });

  return (
    <div class="flex flex-wrap justify-between mt-4">
      {shop().items.map((item) => {
        return (
          <div class="w-[49%] mb-2">
            <Card
              title={`${item.name}(${item.maxQuantity})`}
              img={item.img}
              footer={
                <div>
                  <div class="mb-2">Price: {item.price}</div>
                  <div class="flex items-center">
                    <Button
                      onClick={() => {
                        if (item.quantitySelected > 0) {
                          item.quantitySelected--;
                          update();
                        }
                      }}
                    >
                      -
                    </Button>
                    <span class="mx-2">{item.quantitySelected}</span>
                    <Button
                      onClick={() => {
                        if (item.quantitySelected < item.maxQuantity) {
                          item.quantitySelected++;
                          update();
                        }
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        );
      })}

      <div class="mt-4">
        <div class="mb-2">
          <strong>Your money</strong>: {inventory().money}
        </div>
        <div class="mb-2">
          <strong>Total price</strong>: {getTotalPrice(shop().items)}
        </div>
        <div class="mb-4">
          <strong>Your weight after buy</strong>: {totalWeightAfterBuy()}/
          {props.playerInventoryMaxCapacity.toFixed(1)} Kg
        </div>

        {!hasEnoughMoney() && (
          <div class="text-error">You don't have enough money</div>
        )}

        {isPlayerInMaxWeightCapacity() && (
          <div class="text-error">You are carrying too much weight</div>
        )}

        {willByPassMaxWeight() && (
          <div class="text-error">You can't carry any more weight</div>
        )}

        {canShowBuyButton() && (
          <Button
            onClick={() => {
              if (props.isBuying) {
                updateInventory(getTransactionItems(), "SUM");
                updateItemsQuantity();
              } else {
                updateInventory(getTransactionItems(), "SUBTRACTION");
              }

              setModal({
                isOpen: false,
              });
            }}
          >
            {getConfirmButtonText()}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Shop;
