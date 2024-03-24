import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
// import { appBarClasses } from '@mui/material/AppBar';
import { Theme } from '@mui/material/styles';

export const appBar = (
  theme: Theme,
): {
  MuiAppBar: MuiThemeOptionsComponents['MuiAppBar'];
} => {
  // const isLight = theme.palette.mode === 'light';
  // const { white, black, background } = theme.palette;
  // const { borderWidth, borderRadius } = theme.borders;
  // const { md } = theme.boxShadows;
  // const { rgba, pxToRem } = theme.functions;

  return {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  };
};
