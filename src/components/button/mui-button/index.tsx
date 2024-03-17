import { ThemeColorSchema } from '@assets/theme/vars/types';
import ButtonRoot from '@components/button/mui-button/styles/root';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import React, { ReactNode } from 'react';
import { Merge } from 'type-fest';

type ButtonProps = Merge<MuiButtonProps, {
  color?: 'white' | ThemeColorSchema;
  variant?: MuiButtonProps['variant'] | 'gradient';
  size?: MuiButtonProps['size'];
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
}>;

export type ButtonOwnerStateType = {
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  circular?: ButtonProps['circular'];
  iconOnly?: ButtonProps['iconOnly'];
};

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
