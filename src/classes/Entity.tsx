import { IEntity } from "../constants";

export class Entity {
  id;
  name;
  hp;
  maxHp;
  description;
  drops;
  color;
  refference;
  damageEffetct = false;
  type;
  img;
  placeActions;

  constructor(id: number, refference: IEntity) {
    this.id = id;
    this.refference = refference;
    this.name = refference.name
    this.hp = refference.hp
    this.maxHp = refference.maxHp
    this.type = refference.type;
    this.img = refference.img;
    this.placeActions = ["Talk", "Attack"];
    this.color = "";
    this.description = refference.description
    this.drops = refference.drops
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
    return this.drops
  }
}

export default Entity;
