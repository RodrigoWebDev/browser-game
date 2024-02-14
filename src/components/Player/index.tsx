import ToolTip from "../Tooltip";
import Inventory from "../Inventory";
import { playerState } from "../../state/player";
import { BackPack, Knight, LiquidTube } from "../Icons";

const Player = () => {
  const [player] = playerState;

  return (
    <div>
      <Knight />
      <div>
        <strong>Name</strong>: {player().name}
      </div>
      <div>
        <strong>Class</strong>: {player().class}
      </div>

      <div class="divider">Stats</div>

      <div class="flex items-center text-[14px]">
        <div class="mr-2 flex items-center">
          <span>HP</span> ({player().hp}/{player().maxHp}):
        </div>
        <progress
          class="progress progress-error"
          value={player().hp}
          max={player().maxHp}
        ></progress>
      </div>

      <div class="flex items-center text-[14px]">
        <div class="mr-2 flex items-center">
          <span>MP</span> (50/50)
        </div>
        <progress class="progress progress-info" value="50" max="50"></progress>
      </div>

      <div class="divider">
        <div class="flex items-center">
          <BackPack size={28} className="mr-2" />
          <span>Inventory</span>
        </div>
      </div>

      <Inventory />
    </div>
  );
};

export default Player;
