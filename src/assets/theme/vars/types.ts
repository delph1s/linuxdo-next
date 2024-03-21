import {
  // PaletteAugmentColorOptions,
  // PaletteColor,
  // PaletteTonalOffset,
  TypeAction,
  // TypeBackground,
  TypeDivider,
} from '@mui/material/styles/createPalette';

export type ThemeMode = 'light' | 'dark';

export type BordersType = {
  borderColor: string;
  borderWidth: {
    0: number;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    section: string;
  };
};

export type BoxShadowsType = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  inset: string;
  colored: {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    light: string;
    dark: string;
  };
  navbarBoxShadow: string;
  sliderBoxShadow: {
    thumb: string;
  };
  tabsBoxShadow: {
    indicator: string;
  };
};

export type BreakpointsType = {
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};

type ColorStep = {
  0: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

type ColorType = {
  main: string;
  focus: string;
  contrastText?: string;
};

type ColorGradientsType = {
  main: string;
  state: string;
};

type ColorBadgesType = {
  background: string;
  text: string;
};

export type PaletteType = {
  common: {
    white: string;
    black: string;
  };
  white: ColorType;
  black: {
    light: string;
  } & ColorType;
  mode: ThemeMode;
  // contrastThreshold: number;
  // tonalOffset: PaletteTonalOffset;
  primary: ColorType;
  secondary: ColorType;
  error: ColorType;
  warning: ColorType;
  info: ColorType;
  success: ColorType;
  light: ColorType;
  dark: ColorType;
  gradients: {
    primary: ColorGradientsType;
    secondary: ColorGradientsType;
    info: ColorGradientsType;
    success: ColorGradientsType;
    warning: ColorGradientsType;
    error: ColorGradientsType;
    light: ColorGradientsType;
    dark: ColorGradientsType;
  };
  badgeColors: {
    primary: ColorBadgesType;
    secondary: ColorBadgesType;
    info: ColorBadgesType;
    success: ColorBadgesType;
    warning: ColorBadgesType;
    error: ColorBadgesType;
    light: ColorBadgesType;
    dark: ColorBadgesType;
  };
  coloredShadows: {
    primary: string;
    secondary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    light: string;
    dark: string;
  };
  grey: ColorStep;
  text: ColorType & {
    primary?: string;
    secondary?: string;
    disabled?: string;
  };
  divider?: TypeDivider,
  action?: Partial<TypeAction>;
  background: {
    default: string;
    sidenav?: string;
    card?: string;
  };
  // getContrastText: (background: string) => string;
  // augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;

  transparent: Omit<ColorType, 'focus'>;
  inputBorderColor: string;
  tabs: {
    indicator: {
      boxShadow: string;
    };
  };
};

export const CoreColors = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;
export const ThemeColors = ['primary', 'secondary', 'info', 'success', 'warning', 'error', 'light', 'dark'] as const;
export const PromptColors = ['info', 'success', 'warning', 'error'] as const;
export type CoreColorSchema = (typeof CoreColors)[number];
export type ThemeColorSchema = (typeof ThemeColors)[number];
export type PromptColorSchema = (typeof PromptColors)[number];

type TypographyDisplayType = {
  fontFamily: string;
  color: string;
  fontWeight: number;
  lineHeight: number;
  fontSize: string;
};

export type TypographyType = {
  fontFamily: string;
  fontWeightLighter: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: number;
  };
  h2: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: number;
  };
  h3: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: number;
  };
  h4: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: number;
  };
  h5: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: number;
  };
  h6: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    color: string;
    lineHeight: number;
  };
  subtitle1: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  subtitle2: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body1: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body2: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  button: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    textTransform: any;
  };
  caption: {
    fontFamily: string;
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  overline: {
    fontFamily: string;
  };
  d1: TypographyDisplayType;
  d2: TypographyDisplayType;
  d3: TypographyDisplayType;
  d4: TypographyDisplayType;
  d5: TypographyDisplayType;
  d6: TypographyDisplayType;
  size: {
    xxs: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  lineHeight: {
    sm: number;
    md: number;
    lg: number;
  };
};
