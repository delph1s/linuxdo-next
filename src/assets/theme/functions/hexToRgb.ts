import chroma from 'chroma-js';

export const hexToRgb = (color: string): string => {
  return chroma(color).rgb().join(', ');
};
