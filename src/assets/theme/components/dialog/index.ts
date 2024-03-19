import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
// import { dialogClasses } from '@mui/material/Dialog';
// import { dialogActionsClasses } from '@mui/material/DialogActions';
// import { dialogContentClasses } from '@mui/material/DialogContent';
// import { dialogContentTextClasses } from '@mui/material/DialogContentText';
// import { dialogTitleClasses } from '@mui/material/DialogTitle';
import { alpha, Theme } from '@mui/material/styles';

export const dialog = (
  theme: Theme,
): {
  MuiDialog: MuiThemeOptionsComponents['MuiDialog'];
  MuiDialogActions: MuiThemeOptionsComponents['MuiDialogActions'];
  MuiDialogContent: MuiThemeOptionsComponents['MuiDialogContent'];
  MuiDialogContentText: MuiThemeOptionsComponents['MuiDialogContentText'];
  MuiDialogTitle: MuiThemeOptionsComponents['MuiDialogTitle'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, black, text, background } = theme.palette;
  const { borderColor, borderWidth, borderRadius } = theme.borders;
  const { md, xxl } = theme.boxShadows;
  const { rgba, pxToRem } = theme.functions;
  const { size } = theme.typography;

  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.lg,
          boxShadow: xxl,
        },
        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: pxToRem(16),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: pxToRem(16),
          fontSize: size.md,
          color: isLight ? text.main : rgba(white.main, 0.8),
        },
        dividers: {
          ...(isLight && {
            borderTop: `${borderWidth[1]} solid ${borderColor}`,
            borderBottom: `${borderWidth[1]} solid ${borderColor}`,
          }),
          ...(!isLight && {
            borderTop: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
            borderBottom: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
          }),
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: size.md,
          color: isLight ? text.main : rgba(white.main, 0.8),
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: pxToRem(16),
          fontSize: size.xl,
        },
      },
    },
  };
};
