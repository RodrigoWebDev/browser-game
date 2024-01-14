interface IAction {
  name: string;
  click: () => void;
}

class Npc {
  id;
  name;
  type = "NPC";
  npcType;
  friendly;
  img;
  message = "";
  takeDamage = false;
  playerActions: IAction[] = [];
  talkCallBack;

  constructor(
    id: number,
    name: string,
    npcType: string,
    friendly: boolean,
    img: string,
    takeDamage: boolean,
    talkCallBack: (msg: Npc) => void
  ) {
    this.id = id;
    this.name = name;
    this.npcType = npcType;
    this.friendly = friendly;
    this.img = img;
    this.takeDamage = takeDamage;
    this.playerActions = [
      {
        name: "Conversar",
        click: () => {
          this.talk();
        },
      },
      {
        name: "Atacar",
        click: () => {},
      },
      {
        name: "Dar presente",
        click: () => {},
      },
      {
        name: "Comprar",
        click: () => {},
      },
      {
        name: "Vender",
        click: () => {},
      },
    ];
    this.talkCallBack = talkCallBack;
  }

  talk() {
    console.log("talking...");
    const myMessage = "I'm talking";
    this.message = myMessage;
    this.talkCallBack(this);
  }
}

export default Npc;
