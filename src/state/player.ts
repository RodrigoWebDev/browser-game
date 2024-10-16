import { createSignal } from "solid-js";
import { IAction, Vector2 } from "../interfaces";
import { worldMapState } from "./worldMap";

interface IPlayer {
  name: string;
  class: string;
  hp: number;
  maxHp: number;
  attackDamage: number;
  isInCombat: boolean;
  money: number;
  worldPosition: Vector2;
  previousWorldPosition?: Vector2;
}

export const playerState = createSignal<IPlayer>({
  name: "Player",
  class: "Guerreiro",
  hp: 100,
  maxHp: 100,
  attackDamage: 50,
  isInCombat: false,
  money: 10000,
  previousWorldPosition: undefined,
  worldPosition: {
    x: 5,
    y: 5,
  },
});

export const playerController = () => {
  const [worldMap] = worldMapState
  const [player] = playerState
  const getPlayerActionsInPlace = (
    id: number
  ) => {
    const _worldMap = worldMap()
    const cords = player().worldPosition
    const thing = _worldMap[cords.y][cords.x].info.things[id].thing

    return thing.placeActions.map((action: string) => {
      const actionObj = {
        name: action,
        onClick: () => {}
      }

      if (action === "Attack"){
        actionObj.onClick = () => {
          console.log("ATACOU")
        }
      }

      return actionObj
    })
  };

  return {
    getPlayerActionsInPlace,
  };
};

/* const playerController = () => {
  const [player, setPlayer] = playerState;

  const playerTakeDamage = (damage: number) => {
    setPlayer((val) => ({
      ...val,
      hp: val.hp - damage,
    }));

    setShowHit(true);
    setTimeout(() => {
      setShowHit(false);
    }, 300);
  };
  return {};
}; */
