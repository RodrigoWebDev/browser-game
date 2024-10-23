import { createSignal } from "solid-js";
import { IAction, Vector2 } from "../interfaces";
import { worldMapState } from "./worldMap";
import { modalState } from "./modal";

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
  const [worldMap, setWorldMap] = worldMapState;
  const [player] = playerState;
  const [, setModal] = modalState;

  const getThing = (_worldMap: any[][], cords: Vector2, id: number) =>
    _worldMap[cords.y][cords.x].info.things[id].thing;

  const attack = (cords: Vector2, id: number) => {
    debugger;
    const _worldMap = worldMap();
    const thing = getThing(worldMap(), cords, id);
    const thingHp = thing.hp;

    if (thingHp > 0) {
      // Decrement HP
      _worldMap[cords.y][cords.x].info.things[id].thing.hp -= 10;
    } else {
      // Remove thing from place
      _worldMap[cords.y][cords.x].info.things[id].thing = undefined;
    }

    setWorldMap([..._worldMap]);
  };

  const getPlayerActions = ({
    type,
    id,
  }: {
    type: string;
    id: number;
  }, sawThePlayer: boolean) => {
    const cords = player().worldPosition;
    let actions = [];
    const _attack = {
      name: "Attack",
      onClick: () => {
        attack(cords, id);
      },
    };
    const sneakAttack = {
      name: "Sneak attack",
      onClick: () => {
        //attack(cords, id);
      },
    };
    const flee = {
      name: "Flee",
      onClick: () => {
        //attack(cords, id);
      },
    };
    const ignore = {
      name: "Ignore",
      onClick: () => {
        //attack(cords, id);
      },
    };

    if (type === "Enemy") {
      debugger
      if (sawThePlayer) {
        actions.push(_attack, flee);
      }else{
        actions.push(sneakAttack, ignore);
      }
    }

    return actions;

    // return actions.map((action: string) => {
    //   const actionObj = {
    //     name: action,
    //     onClick: () => {},
    //   };

    //   if (action === "Attack") {
    //     actionObj.onClick = () => {
    //       attack(cords, id);
    //     };
    //   }

    //   return actionObj;
    // });
  };

  // const winCombat = () => {
  //   const _combat = combat()
  //   const isWinCombat = !_combat.enemies.some((item) => item.hp > 0);

  //   if (isWinCombat) {
  //     const itemsDrop = _combat
  //       .enemies.map((enemy) => {
  //         return enemy.refference.DROPS.map((drop) => {
  //           return {
  //             key: drop,
  //             quantity: 1,
  //           };
  //         });
  //       })
  //       .flat();

  //     setModal({
  //       isOpen: true,
  //       title: "You won the fight",
  //       children: (
  //         <div>
  //           <p>You have obtained the following items:</p>
  //           <div class="flex">
  //             {itemsDrop.map((item) => {
  //               const itemInfo = ITEM[item.key];
  //               return (
  //                 <div class="w-[10%] text-center">
  //                   <Dynamic component={itemInfo.img} />
  //                   <div>x{item.quantity}</div>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>
  //       ),
  //     });

  //     const itemsToInventory = itemsDrop.map((item) => {
  //       const itemRefference = ITEM[item.key] as IITEM;

  //       return {
  //         ...itemRefference,
  //         playerActions: [],
  //         quantity: 1,
  //       };
  //     });

  //     _inventoryController.updateInventory(itemsToInventory, "SUM");

  //     //updatePlaceEnemies(cords, info)

  //     setCombat((val) => ({
  //       ...val,
  //       enemies: [],
  //     }));

  //     setPlayer((val) => ({
  //       ...val,
  //       isInCombat: false,
  //     }));
  //   }
  // };

  return {
    getPlayerActions,
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
