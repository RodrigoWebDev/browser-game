import { IENEMY } from "../../constants/enemies";

export class Enemy {
  name;
  description;
  img;
  damageEffetct = false;
  hueRotation;
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

  constructor(refference: IENEMY, hueRotation: number = 0) {
    this.name = refference.NAME;
    this.description = refference.DESCRIPTION;
    this.img = refference.IMAGE;
    this.hueRotation = hueRotation;
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
