import Button from "../Button";
import Card from "../card";

interface IItem {
  name: string;
  img: string;
  price: number;
  maxQuantity: number;
  quantitySelected: number;
}

interface IShop {
  items: IItem[];
  playerMoney: number;
  closeModal: () => void;
  update: () => void;
  updatePlayerMoney: (newValue: number) => void;
}

const getTotalPrice = (items: IItem[]) => {
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
  const updateItemsQuantity = () => {
    props.items.forEach((item) => {
      item.maxQuantity = item.maxQuantity - item.quantitySelected;
      item.quantitySelected = 0;
    });
  };

  return (
    <div class="flex flex-wrap justify-between mt-4">
      {/* <div>{props.img && <img src={props.img} />}</div> */}
      {props.items.map((item) => {
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
              /* onClick={() => {
                item.selected = !item.selected;
                item.onClick(props.items);
              }} */
            />
          </div>
        );
      })}
      <div>
        <div class="mb-2">Your money: {props.playerMoney}</div>
        <div class="mb-4">Total price: {getTotalPrice(props.items)}</div>

        {props.playerMoney > getTotalPrice(props.items) ? (
          <Button
            onClick={() => {
              if (props.playerMoney > getTotalPrice(props.items)) {
                console.log(props.playerMoney - getTotalPrice(props.items));
                console.log(props.playerMoney);
                console.log(getTotalPrice(props.items));
                props.updatePlayerMoney(
                  props.playerMoney - getTotalPrice(props.items)
                );
                updateItemsQuantity();
                props.closeModal();
              }
            }}
          >
            Buy
          </Button>
        ) : (
          <div class="text-error">You don't have enough money</div>
        )}
      </div>
    </div>
  );
};

export default Shop;
