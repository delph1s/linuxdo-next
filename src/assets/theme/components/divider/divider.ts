import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { dividerClasses } from '@mui/material/Divider';
import { Theme } from '@mui/material/styles';

export const divider = (
  theme: Theme,
): {
  MuiDivider: MuiThemeOptionsComponents['MuiDivider'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { dark, transparent } = theme.palette;
  const { pxToRem, rgba } = theme.functions;

  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: transparent.main,
          backgroundImage: `linear-gradient(to right, ${rgba(dark.main, 0)}, ${rgba(
            dark.main,
            0.4,
          )}, ${rgba(dark.main, 0)}) !important`,
          height: pxToRem(1),
          margin: `${pxToRem(16)} 0`,
          borderBottom: 'none',
          opacity: 0.25,
        },
        vertical: {
          backgroundColor: transparent.main,
          backgroundImage: `linear-gradient(to bottom, ${rgba(dark.main, 0)}, ${rgba(
            dark.main,
            0.4,
          )}, ${rgba(dark.main, 0)}) !important`,
          width: pxToRem(1),
          height: '100%',
          margin: `0 ${pxToRem(16)}`,
          borderRight: 'none',
        },
      },
    },
  };
};
