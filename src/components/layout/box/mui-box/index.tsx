import BoxRoot from '@components/layout/box/mui-box/styles/root';
import { BoxProps } from '@components/layout/box/mui-box/types';
import React, { forwardRef } from 'react';

const Box = forwardRef(
  (
    {
      variant = 'contained',
      bgColor = 'transparent',
      color = 'dark',
      opacity = 1,
      borderRadius = 'none',
      shadow = 'none',
      coloredShadow = 'none',
      ...restProps
    }: BoxProps,
    ref: BoxProps['ref'],
  ) => {
    return (
      <BoxRoot
        {...restProps}
        ref={ref}
        ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
      />
    );
  },
);

export default Box;
