import { ThemeColors, ThemeColorSchema } from '@assets/theme/vars/types';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button/Button';
import { ReactNode } from 'react';
import { Merge } from 'type-fest';

export const ButtonColors = ['white', ...ThemeColors, 'default'] as const;
export type ButtonColorSchema = (typeof ButtonColors)[number];

export type ButtonProps = Merge<MuiButtonProps, {
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
