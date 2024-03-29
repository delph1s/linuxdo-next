export const pxToRem = (number: number, baseNumber: number = 16): string => {
  return `${number / baseNumber}rem`;
};

export type PxToRemFunction = typeof pxToRem;
