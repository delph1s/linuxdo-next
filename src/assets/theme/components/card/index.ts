import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
// import { cardClasses } from '@mui/material/Card';
// import { cardContentClasses } from '@mui/material/CardContent';
// import { cardMediaClasses } from '@mui/material/CardMedia';
import { alpha, Theme } from '@mui/material/styles';

export const card = (
  theme: Theme,
): {
  MuiCard: MuiThemeOptionsComponents['MuiCard'];
  MuiCardContent: MuiThemeOptionsComponents['MuiCardContent'];
  MuiCardMedia: MuiThemeOptionsComponents['MuiCardMedia'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, black, background } = theme.palette;
  const { borderWidth, borderRadius } = theme.borders;
  const { md } = theme.boxShadows;
  const { rgba, pxToRem } = theme.functions;

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minWidth: 0,
          wordWrap: 'break-word',
          ...(isLight && {
            backgroundColor: white.main,
          }),
          ...(!isLight && {
            backgroundImage: "none",
            backgroundColor: background.card,
          }),
          backgroundClip: 'border-box',
          border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
          borderRadius: borderRadius.xl,
          boxShadow: md,
          overflow: 'visible',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          padding: `${pxToRem(8)} ${pxToRem(24)} ${pxToRem(24)}`,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
        },
        media: {
          width: 'auto',
        },
      },
    },
  };
};
