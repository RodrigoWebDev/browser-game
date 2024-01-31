import { createSignal, onMount, onCleanup } from "solid-js";
import { Dynamic } from "solid-js/web";
import { ACTIONS, event } from "../../helpers";
import { IItemShop } from "../../interfaces";
import Button from "../Button";
import Card from "../Card";

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
  const [items, setItems] = createSignal<IItemShop[]>([]);

  const getConfirmButtonText = () => {
    return props.isBuying ? "Buy" : "Sell";
  };

  const updateItemsQuantity = () => {
    items().forEach((item) => {
      item.maxQuantity = item.maxQuantity - item.quantitySelected;
    });
  };

  const getTransactionItems = () => {
    return items().filter((item) => {
      return item.quantitySelected > 0;
    });
  };

  const hasEnoughMoney = () => {
    return props.playerMoney > getTotalPrice(items());
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
      getTotalPrice(items()) > 0 &&
      hasEnoughMoney() &&
      !isPlayerInMaxWeightCapacity() &&
      !willByPassMaxWeight()
    );
  };

  const update = () => {
    setItems([...items()]);
  };

  const resetItemsQuantitySelected = () => {
    setItems((items) => {
      return items.map((item) => {
        return {
          ...item,
          quantitySelected: 0,
        };
      });
    });
  };

  onMount(() => {
    event.subscribe(ACTIONS.UPDATE_SHOP_ITEMS, (_items: any) => {
      setItems(() => _items);
    });

    resetItemsQuantitySelected();

    /* items().forEach((item) => {
      item.quantitySelected = 0;
    }); */
  });

  onCleanup(() => {
    document.removeEventListener(
      ACTIONS.UPDATE_SHOP_ITEMS.toString(),
      () => {}
    );
  });

  return (
    <div class="flex flex-wrap justify-between mt-4">
      {items().map((item) => {
        return (
          <div class="w-[49%] mb-2">
            <Card
              title={`${item.name}(${item.maxQuantity})`}
              img={<Dynamic component={item.img} />}
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
          <strong>Your money</strong>: {props.playerMoney}
        </div>
        <div class="mb-2">
          <strong>Total price</strong>: {getTotalPrice(items())}
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
                event.dispatch(
                  ACTIONS.ADD_ITEMS_TO_PLAYER_INVENTORY,
                  getTransactionItems()
                );

                event.dispatch(ACTIONS.SPEND_MONEY, getTotalPrice(items()));

                updateItemsQuantity();
              } else {
                event.dispatch(
                  ACTIONS.REMOVE_ITEMS_TO_PLAYER_INVENTORY,
                  getTransactionItems()
                );

                event.dispatch(ACTIONS.RECEIVE_MONEY, getTotalPrice(items()));
              }

              event.dispatch(ACTIONS.SET_MODAL, {
                title: "",
                isOpen: false,
                children: <></>,
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
