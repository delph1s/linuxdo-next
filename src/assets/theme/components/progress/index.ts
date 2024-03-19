import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
// import { circularProgressClasses } from '@mui/material/CircularProgress';
// import { linearProgressClasses } from '@mui/material/LinearProgress';
import { alpha, Theme } from '@mui/material/styles';

export const progress = (
  theme: Theme,
): {
  MuiCircularProgress: MuiThemeOptionsComponents['MuiCircularProgress'];
  MuiLinearProgress: MuiThemeOptionsComponents['MuiLinearProgress'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { light } = theme.palette;
  const { borderRadius } = theme.borders;
  const { pxToRem } = theme.functions;

  return {
    MuiCircularProgress: {
      // styleOverrides: {
      //   root: {},
      // },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: pxToRem(6),
          borderRadius: borderRadius.md,
          overflow: "visible",
          position: "relative",
        },
        colorPrimary: {
          backgroundColor: light.main,
        },
        colorSecondary: {
          backgroundColor: light.main,
        },
        bar: {
          height: pxToRem(6),
          borderRadius: borderRadius.sm,
          position: "absolute",
          transform: `translate(0, 0) !important`,
          transition: "width 0.6s ease !important",
        },
      },
    },
  };
};
