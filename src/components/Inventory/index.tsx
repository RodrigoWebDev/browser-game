import { Dynamic } from "solid-js/web";
import { getPlayerTotalWiehgt } from "../../helpers";
import { IInventoryItems } from "../../interfaces";
import ToolTip from "../Tooltip";
import DropDown from "../dropwdown";
import Card from "../card";

interface IInventory {
  items: IInventoryItems[];
  maxCapacity: number;
}

const Inventory = (props: IInventory) => {
  return (
    <div id="inventory">
      <div class="flex justify-between">
        <h2 class="mb-2">Inventory</h2>
        <div>
          {getPlayerTotalWiehgt(props.items).toFixed(1)}/
          {props.maxCapacity.toFixed(1)} kg
        </div>
      </div>

      <div class="flex flex-wrap gap-[2%]">
        {props.items.map((item) => {
          return (
            <>
              {/* <Card
                title={`${item.name}`}
                className="text-[12px]"
                cardBodyClassName="p-2"
                img={<Dynamic component={item.img} />}
                footer={
                  <div>
                    <div class="mb-2">Price: {item.price}</div>
                  </div>
                }
              /> */}
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
