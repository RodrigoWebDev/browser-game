import { createSignal } from "solid-js";
import { Vector2 } from "../interfaces";

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
