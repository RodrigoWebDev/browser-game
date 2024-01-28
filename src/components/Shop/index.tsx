import { onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import { IItemShop, IUpdatePlayerArgs } from "../../interfaces";
import Button from "../Button";
import Card from "../card";

interface IShop {
  items: IItemShop[];
  playerMoney: number;
  playerCurrentWeight: number;
  playerInventoryMaxCapacity: number;
  closeModal: () => void;
  update: () => void;
  updatePlayer: (args: IUpdatePlayerArgs) => void;
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
  onMount(() => {
    props.items.forEach((item) => {
      item.quantitySelected = 0;
    });
  });

  const updateItemsQuantity = () => {
    props.items.forEach((item) => {
      item.maxQuantity = item.maxQuantity - item.quantitySelected;
      //item.quantitySelected = 0;
    });
  };

  const getPurchasedItems = () => {
    return props.items.filter((item) => {
      return item.quantitySelected > 0;
    });
  };

  const hasEnoughMoney = () => {
    return props.playerMoney > getTotalPrice(props.items);
  };

  const getBuyedItemsTotalWeight = () => {
    const weights = getPurchasedItems().map((item) => {
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
      getTotalPrice(props.items) > 0 &&
      hasEnoughMoney() &&
      !isPlayerInMaxWeightCapacity() &&
      !willByPassMaxWeight()
    );
  };

  return (
    <div class="flex flex-wrap justify-between mt-4">
      {props.items.map((item) => {
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
                          props.update();
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
                          props.update();
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
          <strong>Total price</strong>: {getTotalPrice(props.items)}
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
              console.log("props.items");
              console.log(props.items);
              props.updatePlayer({
                money: props.playerMoney - getTotalPrice(props.items),
                purchasedItems: getPurchasedItems(),
              });
              updateItemsQuantity();
              props.closeModal();
            }}
          >
            Buy
          </Button>
        )}
      </div>
    </div>
  );
};

export default Shop;
