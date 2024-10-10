import { IENEMY } from "../constants/enemies";

export class Enemy {
  id;
  refference;
  damageEffetct = false;
  playerActions = [
    {
      name: "Atacar",
      click: (damage: number) => {
        this.attack(damage);
      },
    },
  ];
  hp = 100;
  maxHp = 100;

  constructor(id: number, refference: IENEMY) {
    this.id = id;
    this.refference = refference;
  }

  attack(damage: number) {
    this.hp -= damage;
    this.damageEffetct = true;
  }

  resetDamageEffect() {
    this.damageEffetct = false;
  }
}

export default Enemy;
