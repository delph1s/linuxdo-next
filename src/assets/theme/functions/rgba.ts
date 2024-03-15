import { hexToRgb } from '@assets/theme/functions/hexToRgb';

export const rgba = (color: string, opacity: number): string => {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export type RgbaFunction = typeof rgba;
