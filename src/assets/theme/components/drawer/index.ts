import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
// import { drawerClasses, DrawerProps } from '@mui/material/Drawer';
import { alpha, Theme } from '@mui/material/styles';

export const drawer = (
  theme: Theme,
): {
  MuiDrawer: MuiThemeOptionsComponents['MuiDrawer'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, background } = theme.palette;
  const { borderRadius } = theme.borders;
  const { pxToRem } = theme.functions;

  return {
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: pxToRem(250),
          whiteSpace: 'nowrap',
          border: 'none',
        },

        paper: {
          width: pxToRem(250),
          backgroundColor: isLight ? white.main : background.sidenav,
          height: `calc(100vh - ${pxToRem(32)})`,
          margin: pxToRem(16),
          borderRadius: borderRadius.xl,
          border: 'none',
        },

        paperAnchorDockedLeft: {
          borderRight: 'none',
        },
      },
    },
  };
};
