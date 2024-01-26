import { IInventoryItems } from "../../interfaces";
import ToolTip from "../Tooltip";

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
          {props.items.length}/{props.maxCapacity}
        </div>
      </div>

      <div class="flex flex-wrap gap-[2%]">
        {props.items.map((item) => {
          return (
            <div class="w-[23%]">
              <ToolTip text={item.name}>
                <div class="dropdown">
                  <div tabindex="0" role="button">
                    <div class="avatar">
                      <div class="rounded-xl">
                        <img src={item.img} />
                      </div>
                    </div>
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {item.playerActions.map((playerAction) => {
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
                  </ul>
                </div>
              </ToolTip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
