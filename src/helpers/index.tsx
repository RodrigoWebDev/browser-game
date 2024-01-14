export const randomFloatFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomIndexFromArray = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

export const getRandomItemFromArray = (arr: any[]) => {
  return arr[getRandomIndexFromArray(arr)];
};
