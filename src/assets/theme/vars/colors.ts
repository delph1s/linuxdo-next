import { PaletteType, ThemeMode } from '@assets/theme/vars/types';
import { Theme } from '@mui/material/styles';

export const palette = (themeMode: ThemeMode): PaletteType => {
  const isLight = themeMode === 'light';

  return {
    // common: {
    //   black: '#000000',
    //   white: '#FFFFFF',
    // },
    white: {
      main: '#FFFFFF',
      focus: '#FFFFFF',
    },
    black: {
      light: '#000000',
      main: '#000000',
      focus: '#000000',
    },
    mode: themeMode,
    // contrastThreshold: number;
    // tonalOffset: PaletteTonalOffset;
    primary: {
      main: '#E91E63',
      focus: '#E91E63',
    },
    secondary: {
      main: '#7B809A',
      focus: '#8F93A9',
    },
    error: {
      main: '#F44335',
      focus: '#F65F53',
    },
    warning: {
      main: '#FB8C00',
      focus: '#FC9D26',
    },
    info: {
      main: '#1A73E8',
      focus: '#1662C4',
    },
    success: {
      main: '#4CAF50',
      focus: '#67BB6A',
    },
    light: isLight
      ? {
          main: '#F0F2F5',
          focus: '#F0F2F5',
        }
      : {
          main: '#F0F2F566',
          focus: '#F0F2F566',
        },
    dark: {
      main: '#344767',
      focus: '#2C3C58',
    },
    gradients: {
      primary: {
        main: '#EC407A',
        state: '#D81B60',
      },
      secondary: {
        main: '#747B8A',
        state: '#495361',
      },
      info: {
        main: '#49A3F1',
        state: '#1A73E8',
      },
      success: {
        main: '#66BB6A',
        state: '#43A047',
      },
      warning: {
        main: '#FFA726',
        state: '#FB8C00',
      },
      error: {
        main: '#EF5350',
        state: '#E53935',
      },
      light: {
        main: '#EBEFF4',
        state: '#CED4DA',
      },
      dark: isLight
        ? {
            main: '#42424A',
            state: '#191919',
          }
        : {
            main: '#323A54',
            state: '#1A2035',
          },
    },
    badgeColors: {
      primary: {
        background: '#F8B3CA',
        text: '#CC084B',
      },
      secondary: {
        background: '#D7D9E1',
        text: '#6C757D',
      },
      info: {
        background: '#AECEF7',
        text: '#095BC6',
      },
      success: {
        background: '#BCE2BE',
        text: '#339537',
      },
      warning: {
        background: '#FFD59F',
        text: '#C87000',
      },
      error: {
        background: '#FCD3D0',
        text: '#F61200',
      },
      light: {
        background: '#FFFFFF',
        text: '#C7D3DE',
      },
      dark: {
        background: '#8097BF',
        text: '#1E2E4A',
      },
    },
    coloredShadows: {
      primary: '#E91E62',
      secondary: '#110E0E',
      info: '#00BBD4',
      success: '#4CAF4F',
      warning: '#FF9900',
      error: '#F44336',
      light: '#ADB5BD',
      dark: '#404040',
    },
    grey: {
      0: '#FFFFFF',
      100: '#F8F9FA',
      200: '#F0F2F5',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
    },
    text: isLight
      ? {
          main: '#7B809A',
          focus: '#7B809A',
        }
      : {
          main: '#FFFFFFCC',
          focus: '#FFFFFFCC',
        },
    // divider: TypeDivider;
    // action: TypeAction;
    background: isLight
      ? {
          default: '#F0F2F5',
        }
      : {
          default: '#1A2035',
          sidenav: '#1F283E',
          card: '#202940',
        },
    // getContrastText: (background: string) => string;
    // augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;

    transparent: {
      main: 'transparent',
    },
    inputBorderColor: '#D2D6DA',
    tabs: {
      indicator: { boxShadow: '#DDDDDD' },
    },
  };
};
