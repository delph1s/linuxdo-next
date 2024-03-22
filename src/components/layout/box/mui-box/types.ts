import { BordersType, BoxShadowsType, PaletteType, ThemeColorSchema } from '@assets/theme/vars/types';
import { BoxProps as MuiBoxProps } from '@mui/material/Box';
import { Merge } from 'type-fest';

export type PaletteGradientsKeys = keyof PaletteType['gradients'];
export type BordersBorderRadiusKeys = keyof BordersType['borderRadius'];
export type BoxShadowsKeys = keyof Omit<BoxShadowsType, 'colored' | 'navbarBoxShadow' | 'sliderBoxShadow' | 'tabsBoxShadow'>;
export type BoxShadowsColoredKeys = keyof BoxShadowsType['colored'];

export type BoxOwnerStateType = {
  variant: 'contained' | 'gradient';
  bgColor: 'transparent' | ThemeColorSchema;
  color: ThemeColorSchema;
  opacity: number;
  borderRadius: 'none' | BordersBorderRadiusKeys;
  shadow: 'none' | BoxShadowsKeys;
  coloredShadow: 'none' | BoxShadowsColoredKeys;
};

export type BoxProps = Merge<
  MuiBoxProps,
  {
    variant?: BoxOwnerStateType['variant'];
    bgColor?: BoxOwnerStateType['bgColor'];
    color?: BoxOwnerStateType['color'];
    opacity?: BoxOwnerStateType['opacity'];
    borderRadius?: BoxOwnerStateType['borderRadius'];
    shadow?: BoxOwnerStateType['shadow'];
    coloredShadow?: BoxOwnerStateType['coloredShadow'];
  }
>;
