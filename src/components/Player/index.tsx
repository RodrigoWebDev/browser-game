import { JSXElement, createSignal, onMount } from "solid-js";
import Knight from "../svgIcons/knight";
import ToolTip from "../Tooltip";
import Inventory from "../Inventory";
import { IInventoryItems } from "../../interfaces";
import { ACTIONS, event } from "../../helpers";

/* interface IPlayer {
  children: JSXElement;
} */

interface IPlayer {
  name: string;
  class: string;
  hp: number;
  maxHp: number;
  attackDamage: number;
  currentLocationIndex: number;
  isInCombat: boolean;
  money: number;
}

const Player = () => {
  const [player, setPlayer] = createSignal<IPlayer>({
    name: "Tekomo Nakama",
    class: "Guerreiro",
    hp: 100,
    maxHp: 100,
    attackDamage: 50,
    currentLocationIndex: 0,
    isInCombat: true,
    money: 10000,
  });

  onMount(() => {
    event.subscribe(ACTIONS.SPEND_MONEY, (moneySpent: number) => {
      setPlayer((val) => ({
        ...val,
        money: val.money - moneySpent,
      }));
    });
  });

  return (
    <div>
      <Knight className="bg-[#15191e] rounded-box mb-4" />
      <div>
        <strong>Name</strong>: {player().name}
      </div>
      <div>
        <strong>Class</strong>: {player().class}
      </div>

      <div class="divider">Stats</div>

      <ToolTip text={`HP: ${player().hp}`} className="flex items-center">
        <div class="mr-2">HP:</div>
        <progress
          class="progress progress-error"
          value={player().hp}
          max={player().maxHp}
        ></progress>
      </ToolTip>

      <ToolTip text={`MP: 50`} className="flex items-center">
        <div class="mr-2">MP:</div>
        <progress class="progress progress-info" value="50" max="50"></progress>
      </ToolTip>

      <div class="divider">Inventory</div>

      <div>Money: {player().money}</div>

      <Inventory />
    </div>
  );
};

export default Player;
