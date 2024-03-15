import { pxToRem } from '@assets/theme/functions/pxToRem';
import { palette } from '@assets/theme/vars/colors';
import { PaletteType, ThemeMode, TypographyType } from '@assets/theme/vars/types';

type BasePropertiesType = {
  fontFamily: string;
  fontWeightLighter: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  fontSizeXXS: string;
  fontSizeXS: string;
  fontSizeSM: string;
  fontSizeMD: string;
  fontSizeLG: string;
  fontSizeXL: string;
  fontSize2XL: string;
  fontSize3XL: string;
};

const baseFontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Helvetica Neue',
  'Helvetica',
  'Arial',
  'PingFang SC',
  'Hiragino Sans GB',
  'Microsoft YaHei',
  'sans-serif',
];

const baseMobileFontFamily = ['PingFang SC', 'HarmonyOS_Regular', 'Helvetica Neue', 'Microsoft YaHei', 'sans-serif'];

const baseProperties: BasePropertiesType = {
  fontFamily: baseFontFamily.join(','),
  fontWeightLighter: 250,
  fontWeightLight: 350,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  fontSizeXXS: pxToRem(10.4),
  fontSizeXS: pxToRem(12),
  fontSizeSM: pxToRem(14),
  fontSizeMD: pxToRem(16),
  fontSizeLG: pxToRem(18),
  fontSizeXL: pxToRem(20),
  fontSize2XL: pxToRem(24),
  fontSize3XL: pxToRem(30),
};

const genBaseHeadingProperties = (isLight: boolean, themeColors: PaletteType) => {
  const { white, dark } = themeColors;

  return {
    fontFamily: baseProperties.fontFamily,
    color: isLight ? dark.main : white.main,
    fontWeight: baseProperties.fontWeightBold,
  };
};

const genBaseDisplayProperties = (isLight: boolean, themeColors: PaletteType) => {
  const { white, dark } = themeColors;

  return {
    fontFamily: baseProperties.fontFamily,
    color: isLight ? dark.main : white.main,
    fontWeight: baseProperties.fontWeightLight,
    lineHeight: 1.2,
  };
};

export const typography = (themeMode: ThemeMode): TypographyType => {
  const isLight = themeMode === 'light';
  const themeColors = palette(themeMode);
  const baseHeadingProperties = genBaseHeadingProperties(isLight, themeColors);
  const baseDisplayProperties = genBaseDisplayProperties(isLight, themeColors);

  return {
    fontFamily: baseProperties.fontFamily,
    fontWeightLighter: baseProperties.fontWeightLighter,
    fontWeightLight: baseProperties.fontWeightLight,
    fontWeightRegular: baseProperties.fontWeightRegular,
    fontWeightMedium: baseProperties.fontWeightMedium,
    fontWeightBold: baseProperties.fontWeightBold,

    h1: {
      fontSize: pxToRem(48),
      lineHeight: 1.25,
      ...baseHeadingProperties,
    },
    h2: {
      fontSize: pxToRem(36),
      lineHeight: 1.3,
      ...baseHeadingProperties,
    },
    h3: {
      fontSize: pxToRem(30),
      lineHeight: 1.375,
      ...baseHeadingProperties,
    },
    h4: {
      fontSize: pxToRem(24),
      lineHeight: 1.375,
      ...baseHeadingProperties,
    },
    h5: {
      fontSize: pxToRem(20),
      lineHeight: 1.375,
      ...baseHeadingProperties,
    },
    h6: {
      fontSize: pxToRem(16),
      lineHeight: 1.625,
      ...baseHeadingProperties,
    },

    subtitle1: {
      fontFamily: baseProperties.fontFamily,
      fontSize: baseProperties.fontSizeXL,
      fontWeight: baseProperties.fontWeightLight,
      lineHeight: 1.625,
    },
    subtitle2: {
      fontFamily: baseProperties.fontFamily,
      fontSize: baseProperties.fontSizeMD,
      fontWeight: baseProperties.fontWeightLight,
      lineHeight: 1.6,
    },

    body1: {
      fontFamily: baseProperties.fontFamily,
      fontSize: baseProperties.fontSizeXL,
      fontWeight: baseProperties.fontWeightRegular,
      lineHeight: 1.625,
    },
    body2: {
      fontFamily: baseProperties.fontFamily,
      fontSize: baseProperties.fontSizeMD,
      fontWeight: baseProperties.fontWeightLight,
      lineHeight: 1.6,
    },

    button: {
      fontFamily: baseProperties.fontFamily,
      fontSize: baseProperties.fontSizeSM,
      fontWeight: baseProperties.fontWeightLight,
      lineHeight: 1.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: baseProperties.fontFamily,
      fontSize: baseProperties.fontSizeXS,
      fontWeight: baseProperties.fontWeightLight,
      lineHeight: 1.25,
    },
    overline: {
      fontFamily: baseProperties.fontFamily,
    },

    d1: {
      fontSize: pxToRem(80),
      ...baseDisplayProperties,
    },
    d2: {
      fontSize: pxToRem(72),
      ...baseDisplayProperties,
    },
    d3: {
      fontSize: pxToRem(64),
      ...baseDisplayProperties,
    },
    d4: {
      fontSize: pxToRem(56),
      ...baseDisplayProperties,
    },
    d5: {
      fontSize: pxToRem(48),
      ...baseDisplayProperties,
    },
    d6: {
      fontSize: pxToRem(40),
      ...baseDisplayProperties,
    },

    size: {
      xxs: baseProperties.fontSizeXXS,
      xs: baseProperties.fontSizeXS,
      sm: baseProperties.fontSizeSM,
      md: baseProperties.fontSizeMD,
      lg: baseProperties.fontSizeLG,
      xl: baseProperties.fontSizeXL,
      '2xl': baseProperties.fontSize2XL,
      '3xl': baseProperties.fontSize3XL,
    },

    lineHeight: {
      sm: 1.25,
      md: 1.5,
      lg: 2,
    },
  };
};
