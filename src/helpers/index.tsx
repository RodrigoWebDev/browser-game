import { IItemShop } from "../interfaces";

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

export const getTotalPrice = (items: IItemShop[]) => {
  const selectedItems = items.filter((item) => {
    return item.quantitySelected > 0;
  });

  const selectedItemsPriceOnly = selectedItems.map((item) => {
    return item.price * item.quantitySelected;
  });

  if (selectedItemsPriceOnly.length > 0) {
    return selectedItemsPriceOnly.reduce((prev: number, curr: number) => {
      return prev + curr;
    });
  } else {
    return 0;
  }
};

export const getNewArrayWithRandomItems = (arr: any[]) => {
  const howMany = Math.trunc(arr.length / 2);
  let generatedIndexes: number[] = [];
  let newArray: any[] = [];

  const getUniqueIndex = () => {
    let generateIndex = getRandomIndexFromArray(arr);

    while (generatedIndexes.some((item) => item === generateIndex)) {
      generateIndex = getRandomIndexFromArray(arr);
    }

    return generateIndex;
  };

  for (let i = 0; i < howMany; i++) {
    let generateIndex = getUniqueIndex();
    generatedIndexes.push(generateIndex);
    newArray.push(arr[generateIndex]);
  }

  return newArray;
};
