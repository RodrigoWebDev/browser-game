import { createSignal } from "solid-js";

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

export const playerState = createSignal<IPlayer>({
  name: "Tekomo Nakama",
  class: "Guerreiro",
  hp: 100,
  maxHp: 100,
  attackDamage: 50,
  currentLocationIndex: 0,
  isInCombat: false,
  money: 10000,
});

const playerController = () => {
  const [player, setPlayer] = playerState;

  const playerTakeDamage = (damage: number) => {
    setPlayer((val) => ({
      ...val,
      hp: val.hp - damage,
    }));

    /* setShowHit(true);
    setTimeout(() => {
      setShowHit(false);
    }, 300); */
  };
  return {};
};
