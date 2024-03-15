import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { buttonClasses, ButtonProps } from '@mui/material/Button';
import { IconClasses } from '@mui/material/Icon';
import { alpha, Theme } from '@mui/material/styles';

export const button = (
  theme: Theme,
): {
  MuiButtonBase: MuiThemeOptionsComponents['MuiButtonBase'];
  MuiButton: MuiThemeOptionsComponents['MuiButton'];
  MuiIconButton: MuiThemeOptionsComponents['MuiIconButton'];
  MuiListItemButton: MuiThemeOptionsComponents['MuiListItemButton'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, black, primary, secondary, error, warning, success, info, light, dark, text, transparent } =
    theme.palette;
  const { borderRadius } = theme.borders;
  const { fontWeightBold, size } = theme.typography;
  const { pxToRem } = theme.functions;

  const rootStyle = (ownerState: ButtonProps) => {};

  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: size.xs,
          fontWeight: fontWeightBold,
          borderRadius: borderRadius.lg,
          padding: `${pxToRem(6.302)} ${pxToRem(16.604)}`,
          lineHeight: 1.4,
          textAlign: 'center',
          textTransform: 'uppercase',
          userSelect: 'none',
          backgroundSize: '150% !important',
          backgroundPositionX: '25% !important',
          transition: 'all 150ms ease-in',

          [`&.${buttonClasses.disabled}`]: {
            pointerEvent: 'none',
            opacity: 0.65,
          },

          '& .material-icons': {
            fontSize: pxToRem(15),
            marginTop: pxToRem(-2),
          },
        },
        text: {
          backgroundColor: transparent.main,
          minHeight: pxToRem(isLight ? 40 : 37),
          color: text.main,
          boxShadow: 'none',
          padding: `${pxToRem(isLight ? 10 : 9)} ${pxToRem(24)}`,

          '&:hover': {
            backgroundColor: transparent.main,
            boxShadow: 'none',
          },

          '&:focus': {
            boxShadow: 'none',
          },

          '&:active, &:active:focus, &:active:hover': {
            opacity: 0.85,
            boxShadow: 'none',
          },

          [`&.${buttonClasses.disabled}`]: {
            boxShadow: 'none',
          },

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(16)} !important`,
          },

          // [`&.${buttonClasses.text}.${buttonClasses.colorInherit}`]: {},
          [`&.${buttonClasses.text}.${buttonClasses.colorPrimary}`]: {
            color: info.main,

            '&:hover': {
              color: info.main,
            },

            '&:focus:not(:hover)': {
              color: info.focus,
              boxShadow: 'none',
            },
          },
          [`&.${buttonClasses.text}.${buttonClasses.colorSecondary}`]: {
            color: secondary.main,

            '&:hover': {
              color: secondary.main,
            },

            '&:focus:not(:hover)': {
              color: secondary.focus,
              boxShadow: 'none',
            },
          },
          [`&.${buttonClasses.text}.${buttonClasses.colorError}`]: {
            color: error.main,

            '&:hover': {
              color: error.main,
            },

            '&:focus:not(:hover)': {
              color: error.focus,
              boxShadow: 'none',
            },
          },
          [`&.${buttonClasses.text}.${buttonClasses.colorWarning}`]: {
            color: warning.main,

            '&:hover': {
              color: warning.main,
            },

            '&:focus:not(:hover)': {
              color: warning.focus,
              boxShadow: 'none',
            },
          },
          [`&.${buttonClasses.text}.${buttonClasses.colorSuccess}`]: {
            color: success.main,

            '&:hover': {
              color: success.main,
            },

            '&:focus:not(:hover)': {
              color: success.focus,
              boxShadow: 'none',
            },
          },
          [`&.${buttonClasses.text}.${buttonClasses.colorInfo}`]: {
            color: info.main,

            '&:hover': {
              color: info.main,
            },

            '&:focus:not(:hover)': {
              color: info.focus,
              boxShadow: 'none',
            },
          },
          [`&.${buttonClasses.text}.${buttonClasses.sizeSmall}`]: {
            minHeight: pxToRem(isLight ? 32 : 29),
            padding: `${pxToRem(6)} ${pxToRem(isLight ? 16 : 18)}`,
            fontSize: size.xs,

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(12)} !important`,
            },
          },
          // [`&.${buttonClasses.text}.${buttonClasses.sizeMedium}`]: {},
          [`&.${buttonClasses.text}.${buttonClasses.sizeLarge}`]: {
            minHeight: pxToRem(isLight ? 47 : 44),
            padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 24)}`,
            fontSize: size.sm,

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(22)} !important`,
            },
          },
        },
        outlined: {
          minHeight: pxToRem(isLight ? 40 : 39),
          color: light.main,
          borderColor: light.main,
          padding: `${pxToRem(isLight ? 10 : 9)} ${pxToRem(24)}`,

          '&:hover': {
            opacity: 0.75,
            backgroundColor: transparent.main,
          },

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(16)} !important`,
          },

          //   [`&.${buttonClasses.outlined}.${buttonClasses.colorInherit}`]: {},
          [`&.${buttonClasses.outlined}.${buttonClasses.colorPrimary}`]: {
            backgroundColor: transparent.main,
            borderColor: info.main,

            '&:hover': {
              backgroundColor: transparent.main,
            },
          },
          [`&.${buttonClasses.outlined}.${buttonClasses.colorSecondary}`]: {
            backgroundColor: transparent.main,
            borderColor: secondary.main,

            '&:hover': {
              backgroundColor: transparent.main,
            },
          },
          [`&.${buttonClasses.outlined}.${buttonClasses.colorError}`]: {
            backgroundColor: transparent.main,
            borderColor: error.main,

            '&:hover': {
              backgroundColor: transparent.main,
            },
          },
          [`&.${buttonClasses.outlined}.${buttonClasses.colorWarning}`]: {
            backgroundColor: transparent.main,
            borderColor: warning.main,

            '&:hover': {
              backgroundColor: transparent.main,
            },
          },
          [`&.${buttonClasses.outlined}.${buttonClasses.colorSuccess}`]: {
            backgroundColor: transparent.main,
            borderColor: success.main,

            '&:hover': {
              backgroundColor: transparent.main,
            },
          },
          [`&.${buttonClasses.outlined}.${buttonClasses.colorInfo}`]: {
            backgroundColor: transparent.main,
            borderColor: info.main,

            '&:hover': {
              backgroundColor: transparent.main,
            },
          },
          [`&.${buttonClasses.outlined}.${buttonClasses.sizeSmall}`]: {
            minHeight: pxToRem(isLight ? 32 : 31),
            padding: `${pxToRem(6)} ${pxToRem(isLight ? 16 : 18)}`,
            fontSize: size.xs,

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(12)} !important`,
            },
          },
          //   [`&.${buttonClasses.outlined}.${buttonClasses.sizeMedium}`]: {},
          [`&.${buttonClasses.outlined}.${buttonClasses.sizeLarge}`]: {
            minHeight: pxToRem(isLight ? 47 : 46),
            padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 24)}`,
            fontSize: size.sm,

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(22)} !important`,
            },
          },
        },
        contained: {
          backgroundColor: white.main,
          minHeight: pxToRem(isLight ? 40 : 37),
          color: text.main,
          padding: `${pxToRem(isLight ? 10 : 9)} ${pxToRem(24)}`,

          '&:hover': {
            backgroundColor: white.main,
          },

          '&:active, &:active:focus, &:active:hover': {
            opacity: 0.85,
          },

          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(16)} !important`,
          },

          // [`&.${buttonClasses.contained}.${buttonClasses.colorInherit}`]: {},
          [`&.${buttonClasses.contained}.${buttonClasses.colorPrimary}`]: {
            backgroundColor: info.main,

            '&:hover': {
              backgroundColor: info.main,
            },

            '&:focus:not(:hover)': {
              backgroundColor: info.focus,
            },
          },
          [`&.${buttonClasses.contained}.${buttonClasses.colorSecondary}`]: {
            backgroundColor: secondary.main,

            '&:hover': {
              backgroundColor: secondary.main,
            },

            '&:focus:not(:hover)': {
              backgroundColor: secondary.focus,
            },
          },
          [`&.${buttonClasses.contained}.${buttonClasses.colorError}`]: {
            backgroundColor: error.main,

            '&:hover': {
              backgroundColor: error.main,
            },

            '&:focus:not(:hover)': {
              backgroundColor: error.focus,
            },
          },
          [`&.${buttonClasses.contained}.${buttonClasses.colorWarning}`]: {
            backgroundColor: warning.main,

            '&:hover': {
              backgroundColor: warning.main,
            },

            '&:focus:not(:hover)': {
              backgroundColor: warning.focus,
            },
          },
          [`&.${buttonClasses.contained}.${buttonClasses.colorSuccess}`]: {
            backgroundColor: success.main,

            '&:hover': {
              backgroundColor: success.main,
            },

            '&:focus:not(:hover)': {
              backgroundColor: success.focus,
            },
          },
          [`&.${buttonClasses.contained}.${buttonClasses.colorInfo}`]: {
            backgroundColor: info.main,

            '&:hover': {
              backgroundColor: info.main,
            },

            '&:focus:not(:hover)': {
              color: info.focus,
            },
          },
          [`&.${buttonClasses.contained}.${buttonClasses.sizeSmall}`]: {
            minHeight: pxToRem(isLight ? 32 : 29),
            padding: `${pxToRem(6)} ${pxToRem(isLight ? 16 : 18)}`,
            fontSize: size.xs,

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(12)} !important`,
            },
          },
          // [`&.${buttonClasses.contained}.${buttonClasses.sizeMedium}`]: {},
          [`&.${buttonClasses.contained}.${buttonClasses.sizeLarge}`]: {
            minHeight: pxToRem(isLight ? 47 : 44),
            padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 24)}`,
            fontSize: size.sm,

            '& .material-icon, .material-icons-round, svg': {
              fontSize: `${pxToRem(22)} !important`,
            },
          },
        },
        // icon: {
        //   [`&.${buttonClasses.sizeSmall} > .${buttonClasses.icon}`]: {},
        //   [`&.${buttonClasses.sizeMedium} > .${buttonClasses.icon}`]: {},
        //   [`&.${buttonClasses.sizeLarge} > .${buttonClasses.icon}`]: {},
        // },
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
