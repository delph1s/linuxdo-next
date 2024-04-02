import { ThemeColorSchema } from '@assets/theme/vars/types';
import { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { ReactNode } from 'react';
import { Merge } from 'type-fest';

export type TypographyOwnerStateType = {
  color: 'inherit' | ThemeColorSchema | 'text' | 'white';
  fontWeight: 'light' | 'regular' | 'medium' | 'bold';
  textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  verticalAlign: 'unset' | 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom';
  textGradient: boolean;
  opacity: number;
};

export type TypographyProps = Merge<
  MuiTypographyProps,
  {
    color?: TypographyOwnerStateType['color'];
    fontWeight?: TypographyOwnerStateType['fontWeight'];
    textTransform?: TypographyOwnerStateType['textTransform'];
    verticalAlign?: TypographyOwnerStateType['verticalAlign'];
    textGradient?: TypographyOwnerStateType['textGradient'];
    opacity?: TypographyOwnerStateType['opacity'];
    children: ReactNode;
  }
>;
