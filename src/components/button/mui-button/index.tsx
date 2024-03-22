import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import React, { forwardRef } from 'react';

import ButtonRoot from './styles/root';
import type { ButtonProps } from './types';

const Button = forwardRef(
  (
    {
      color = 'info',
      variant = 'gradient',
      size = 'medium',
      circular = false,
      iconOnly = false,
      children,
      ...restProps
    }: ButtonProps,
    ref: ButtonProps['ref'],
  ) => {

    return (
      <ButtonRoot
        {...restProps}
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        ownerState={{ size, circular, iconOnly }}
      >
        {children}
      </ButtonRoot>
    );
  },
);

export default Button;
