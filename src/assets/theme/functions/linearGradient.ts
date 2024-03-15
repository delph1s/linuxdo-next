export const linearGradient = (color: string, colorState: string, angle: number = 195): string => {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
};

export type LinearGradientFunction = typeof linearGradient;
