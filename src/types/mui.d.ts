import { ButtonColorSchema } from '@assets/theme/components/button/types';
import {
  BoxShadowFunction,
  HexToRgbFunction,
  LinearGradientFunction,
  PxToRemFunction,
  RgbaFunction,
} from '@assets/theme/functions';
import { BordersType, BoxShadowsType, PaletteType, TypographyType } from '@assets/theme/vars/types';
import { Merge } from 'type-fest';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

// Button
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    inherit: false;
    [K: ButtonColorSchema]: true;
  }
  interface ButtonPropsSizeOverrides {}
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

type ThemeFunctions = {
  boxShadow: BoxShadowFunction;
  hexToRgb: HexToRgbFunction;
  linearGradient: LinearGradientFunction;
  pxToRem: PxToRemFunction;
  rgba: RgbaFunction;
};

declare module '@mui/material/styles' {
  interface Theme {
    // mixins: Mixins;
    palette: PaletteType;
    // shadows: Shadows;
    // transitions: Transitions;
    typography: TypographyType;
    // zIndex: ZIndex;
    // unstable_strictMode?: boolean;
    // components?: Components<BaseTheme>;
    // unstable_sx: (props: SxProps<Theme>) => CSSObject;
    // unstable_sxConfig: SxConfig;
    // 自有属性
    boxShadows: BoxShadowsType;
    borders: BordersType;
    functions: ThemeFunctions;
  }

  interface ThemeOptions {
    boxShadows: BoxShadowsType;
    borders: BordersType;
    functions: ThemeFunctions;
  }

  interface Palette extends PaletteType {}

  interface PaletteOptions extends PaletteType {}

  interface TypographyVariants extends TypographyType {}
}
