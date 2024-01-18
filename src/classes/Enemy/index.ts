import { IEnemy } from "../../constants";
import { IAction } from "../interfaces";

export class Enemy {
  id;
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

  constructor(id: number, refference: IEnemy, hueRotation: number = 0) {
    this.id = id;
    this.name = refference.name;
    this.description = refference.description;
    this.img = refference.image;
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
