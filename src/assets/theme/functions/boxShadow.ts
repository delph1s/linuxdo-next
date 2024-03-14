import { pxToRem } from '@assets/theme/functions/pxToRem';
import { rgba } from '@assets/theme/functions/rgba';

export const boxShadow = (
  offset: number[],
  radius: number[],
  color: string,
  opacity: number,
  inset: string = '',
): string => {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(color, opacity)}`;
};
