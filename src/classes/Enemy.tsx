import { IENEMY } from "../constants/enemies";

export class Enemy {
  id;
  refference;
  damageEffetct = false;
  hp = 100;
  maxHp = 100;
  name;
  type;
  img;
  placeActions;
  fill;

  constructor(id: number, refference: IENEMY) {
    this.id = id;
    this.refference = refference;
    this.name = refference.NAME
    this.type = "ENEMY";
    this.img = refference.IMAGE;
    this.placeActions = ["Attack"];
    this.fill = "";
  }

  getHit(damage: number) {
    if (this.hp > 0){
      this.hp -= damage;
      this.damageEffetct = true;
    }else{
      this.dropItems()
    }
  }

  resetDamageEffect() {
    this.damageEffetct = false;
  }

  dropItems(){
    console.log("🚀 ~ Enemy ~ constructor ~ refference:", this.refference)
    return ["ITEM 0", "ITEM 1", "ITEM 2"]
  }
}

export default Enemy;
