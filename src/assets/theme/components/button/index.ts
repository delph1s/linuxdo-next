import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { CoreColors } from '@assets/theme/vars/types';
import { buttonClasses, ButtonProps } from '@mui/material/Button';
import { alpha, CSSInterpolation, Theme } from '@mui/material/styles';

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

  const rootStyle = (ownerState: ButtonProps) => {
    const containedVariant = ownerState.variant === 'contained';
    const outlinedVariant = ownerState.variant === 'outlined';
    const textVariant = ownerState.variant === 'text';
    const smallSize = ownerState.size === 'small';
    const mediumSize = ownerState.size === 'medium';
    const largeSize = ownerState.size === 'large';

    const defaultStyle: CSSInterpolation = {
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
    };

    const variantStyle = {
      ...(containedVariant && {
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
      }),
      ...(outlinedVariant && {
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
      }),
      ...(textVariant && {
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
        [`& .material-icon, .material-icons-round, svg`]: {
          fontSize: `${pxToRem(16)} !important`,
        },
      }),
    };

    const colorStyle = CoreColors.map(color => ({
      ...(color === ownerState.color && {
        ...(containedVariant && {
          backgroundColor: theme.palette[color].main,
          '&:hover': {
            backgroundColor: theme.palette[color].main,
          },
          '&:focus:not(:hover)': {
            backgroundColor: theme.palette[color].focus,
          },
        }),
        ...(outlinedVariant && {
          backgroundColor: transparent.main,
          borderColor: theme.palette[color].main,
          '&:hover': {
            backgroundColor: transparent.main,
          },
        }),
        ...(textVariant && {
          color: theme.palette[color].main,
          '&:hover': {
            color: theme.palette[color].main,
          },
          '&:focus:not(:hover)': {
            color: theme.palette[color].focus,
            boxShadow: 'none',
          },
        }),
      }),
    }));

    const sizeStyle = {
      ...(smallSize && {
        ...((containedVariant || textVariant) && {
          minHeight: pxToRem(isLight ? 32 : 29),
          padding: `${pxToRem(6)} ${pxToRem(isLight ? 16 : 18)}`,
          fontSize: size.xs,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(12)} !important`,
          },
        }),
        ...(outlinedVariant && {
          minHeight: pxToRem(isLight ? 32 : 31),
          padding: `${pxToRem(6)} ${pxToRem(isLight ? 16 : 18)}`,
          fontSize: size.xs,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(12)} !important`,
          },
        }),
      }),
      // ...(mediumSize && {}),
      ...(largeSize && {
        ...((containedVariant || textVariant) && {
          minHeight: pxToRem(isLight ? 47 : 44),
          padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 24)}`,
          fontSize: size.sm,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(22)} !important`,
          },
        }),
        ...(outlinedVariant && {
          minHeight: pxToRem(isLight ? 47 : 46),
          padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 24)}`,
          fontSize: size.sm,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(22)} !important`,
          },
        }),
      }),
    };

    return [defaultStyle, variantStyle, ...colorStyle, sizeStyle];
  };

  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonProps }) => rootStyle(ownerState),
        // contained: {},
        // outlined: {},
        // text: {},
        // icon: {
        //   [`&.${buttonClasses.sizeSmall} > .${buttonClasses.icon}`]: {},
        //   [`&.${buttonClasses.sizeMedium} > .${buttonClasses.icon}`]: {},
        //   [`&.${buttonClasses.sizeLarge} > .${buttonClasses.icon}`]: {},
        // },
      },
    },
    MuiIconButton: {
      // styleOverrides: {
      //   root: {},
      // },
    },
    MuiListItemButton: {
      // styleOverrides: {
      //   root: {},
      // },
    },
  };
};
