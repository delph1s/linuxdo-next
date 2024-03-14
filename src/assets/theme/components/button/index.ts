import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { buttonClasses, ButtonProps } from '@mui/material/Button';
import { alpha, Theme } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';

export const button = (
  theme: Theme,
): {
  MuiButtonBase: MuiThemeOptionsComponents['MuiButtonBase'];
  MuiButton: MuiThemeOptionsComponents['MuiButton'];
  MuiIconButton: MuiThemeOptionsComponents['MuiIconButton'];
  MuiListItemButton: MuiThemeOptionsComponents['MuiListItemButton'];
} => {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {},
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {},
      },
    },
  };
};
