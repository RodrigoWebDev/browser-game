import Npc from "./classes/Npc";
import { PossibleThingsToFind } from "./enums";

export interface IPlayerActions {
  name: string;
  click: (index: number) => void;
}

export interface IEnemy {
  name: string;
  description: string;
  img: string;
  takeDamage: boolean;
  hp: number;
  maxHp: number;
  color: number;
  playerActions: IPlayerActions[];
}

export interface ILocation {
  name: string;
  bg: string;
  things: {
    found: boolean;
    thing: Npc;
  }[];
  /* possibleThingsToFind: PossibleThingsToFind[];
  thingsFound: Npc[]; */
}

/* new Npc(0, "Natielly", "merchant", true, npc, false, (npc: Npc) => {
      setModalContent((value) => ({
        ...value,
        isOpen: true,
        title: `Conversando com ${npc.name}`,
        children: (
          <div class="mt-4">
            <img class="max-w-[350px] mb-2" src={npc.img} />
            <p>{npc.message}</p>
          </div>
        ),
      }));
    }), */
