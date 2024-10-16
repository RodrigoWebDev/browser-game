import { createSignal } from "solid-js";
import Enemy from "../classes/Enemy.tsx";
import { IAction, Vector2 } from "../interfaces";
import { playerState } from "./player";
import { modalState } from "./modal";
import { IITEM, ITEM } from "../constants/items.ts";
import { IENEMY } from "../constants/enemies";
import { inventoryController } from "./inventory";
import { Dynamic } from "solid-js/web";
import { worldMapState } from "./worldMap.tsx";

interface ICombat {
  enemies: Enemy[];
}

export const combatState = createSignal<ICombat>({
  enemies: [],
});

export const combatController = () => {
  const [combat, setCombat] = combatState;
  const [player, setPlayer] = playerState;
  const [, setModal] = modalState;
  const [worldMap, setWorldMap] = worldMapState;
  const _inventoryController = inventoryController();

  const updateCombat = () => {
    setCombat((val) => ({
      ...val,
    }));
  };

  const attackEnemy = (item: IAction, enemy: Enemy) => {
    item.click(player().attackDamage);
    updateCombat();

    enemy.resetDamageEffect();

    setTimeout(() => {
      updateCombat();
    }, 150);
  };

  // const updatePlaceEnemies = ({x, y}: Vector2, id: number, info: any) => {
  //   const _worldMap = worldMap()
  //   _worldMap[y][x].things[id] = info
  // }

  const winCombat = () => {
    const _combat = combat()
    const isWinCombat = !_combat.enemies.some((item) => item.hp > 0);

    if (isWinCombat) {
      const itemsDrop = _combat
        .enemies.map((enemy) => {
          return enemy.refference.DROPS.map((drop) => {
            return {
              key: drop,
              quantity: 1,
            };
          });
        })
        .flat();

      setModal({
        isOpen: true,
        title: "You won the fight",
        children: (
          <div>
            <p>You have obtained the following items:</p>
            <div class="flex">
              {itemsDrop.map((item) => {
                const itemInfo = ITEM[item.key];
                return (
                  <div class="w-[10%] text-center">
                    <Dynamic component={itemInfo.img} />
                    <div>x{item.quantity}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ),
      });

      const itemsToInventory = itemsDrop.map((item) => {
        const itemRefference = ITEM[item.key] as IITEM;

        return {
          ...itemRefference,
          playerActions: [],
          quantity: 1,
        };
      });

      _inventoryController.updateInventory(itemsToInventory, "SUM");

      //updatePlaceEnemies(cords, info)

      setCombat((val) => ({
        ...val,
        enemies: [],
      }));

      setPlayer((val) => ({
        ...val,
        isInCombat: false,
      }));
    }
  };

  const setEnemiesToCombat = (index: number, enemy: IENEMY) => {
    setCombat((val) => {
      return {
        ...val,
        enemies: [new Enemy(index, enemy)],
      };
    });
  };

  const escapeFromCombat = () => {
    setPlayer((val) => ({
      ...val,
      isInCombat: false,
    }));
  };

  return {
    setEnemiesToCombat,
    attackEnemy,
    winCombat,
    escapeFromCombat,
  };
};
