import { IInventoryItems } from "../interfaces";

export const randomFloatFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomIndexFromArray = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const getRandomItemFromArray = (arr: any[]) => {
  return arr[getRandomIndexFromArray(arr)];
};

export const getPlayerTotalWiehgt = (inventoryItems: IInventoryItems[]) => {
  const itemWeights = inventoryItems.map((item) => {
    return item.weight;
  });

  if (itemWeights.length) {
    return itemWeights.reduce((prev: number, curr: number) => {
      return prev + curr;
    });
  } else {
    return 0;
  }
};

export enum ACTIONS {
  SET_MODAL,
  UPDATE_PLAYER_INVENTORY,
  UPDATE_SHOP_ITEMS,
  SELL_ITEMS,
  SPEND_MONEY,
}

export const event = {
  dispatch: (event: number, data?: any) => {
    const newCustomEvent = new CustomEvent(event.toString(), {
      detail: data,
    });
    document.dispatchEvent(newCustomEvent);
    /* console.log("DISPATCH");
    console.log(data); */
  },
  subscribe: (event: number, action: (e: any) => void) => {
    document.addEventListener(event.toString(), (e: any) => {
      /* console.log("SUBSCRIBE");
      console.log(e.detail); */
      action(e.detail);
    });
  },
};
