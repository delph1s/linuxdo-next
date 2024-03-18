import { ThemeColorSchema } from '@assets/theme/vars/types';
import React, { ReactNode } from 'react';

import ButtonRoot from './styles/root';
import type { ButtonProps } from './types';

function Button({
  color = 'white',
  variant = 'contained',
  size = 'medium',
  circular = false,
  iconOnly = false,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <ButtonRoot
      {...restProps}
      color="primary"
      variant={variant === 'gradient' ? 'contained' : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </ButtonRoot>
  );
}

export default Button;
