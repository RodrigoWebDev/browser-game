import ToolTip from "../Tooltip";
import Inventory from "../Inventory";
import EmojiDisplay from "../EmojiDsplay";
import { playerState } from "../../state/player";

const Player = () => {
  const [player] = playerState;

  return (
    <div>
      {/* <Knight className="bg-[#15191e] rounded-box mb-4" /> */}
      {/* <div
        class="text-center"
        style={{ "font-size": `${imageSize() / 1.5}px` }}
      >
        
      </div> */}
      <EmojiDisplay code="😐" />
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

      <Inventory />
    </div>
  );
};

export default Player;
