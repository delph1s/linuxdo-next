import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { CoreColors, ThemeColors } from '@assets/theme/vars/types';
import { buttonClasses, ButtonProps } from '@mui/material/Button';
import { CSSInterpolation, Theme } from '@mui/material/styles';
import lodashHas from 'lodash/has';

const ButtonColors = ['white', ...ThemeColors];

export const button = (
  theme: Theme,
): {
  MuiButtonBase: MuiThemeOptionsComponents['MuiButtonBase'];
  MuiButton: MuiThemeOptionsComponents['MuiButton'];
  MuiIconButton: MuiThemeOptionsComponents['MuiIconButton'];
  MuiListItemButton: MuiThemeOptionsComponents['MuiListItemButton'];
} => {
  const { palette } = theme;
  const isLight = palette.mode === 'light';
  const {
    white,
    black,
    primary,
    secondary,
    error,
    warning,
    success,
    info,
    light,
    dark,
    grey,
    text,
    transparent,
    gradients,
  } = palette;
  const { borderRadius } = theme.borders;
  const { fontWeightBold, size } = theme.typography;
  const { boxShadow, linearGradient, pxToRem, rgba } = theme.functions;
  const { colored } = theme.boxShadows;

  const rootStyle = (ownerState: ButtonProps) => {
    const containedVariant = ownerState.variant === 'contained';
    const outlinedVariant = ownerState.variant === 'outlined';
    const textVariant = ownerState.variant === 'text';
    const gradientVariant = ownerState.variant === 'gradient';
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

    const colorStyle = ButtonColors.map(color => {
      if (color === ownerState.color) {
        if (containedVariant) {
          // background color value
          const backgroundValue = lodashHas(palette, color) ? palette[color].main : white.main;
          // backgroundColor value when button is focused
          const focusedBackgroundValue = lodashHas(palette, color) ? palette[color].focus : white.focus;
          // boxShadow value
          const boxShadowValue = lodashHas(colored, color)
            ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
                [0, 3],
                [1, -2],
                palette[color].main,
                0.2,
              )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
            : 'none';
          // boxShadow value when button is hovered
          const hoveredBoxShadowValue = lodashHas(colored, color)
            ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
                [0, 4],
                [23, 0],
                palette[color].main,
                0.15,
              )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
            : 'none';
          // color value
          let colorValue = white.main;
          if (isLight && (color === 'white' || color === 'light' || !palette[color])) {
            colorValue = text.main;
          } else if (!isLight && (color === 'white' || color === 'light' || !palette[color])) {
            colorValue = grey['600'];
          }
          // color value when button is focused
          let focusedColorValue = white.main;
          if (color === 'white') {
            focusedColorValue = text.main;
          } else if (color === 'primary' || color === 'error' || color === 'dark') {
            focusedColorValue = white.main;
          }

          return {
            background: backgroundValue,
            // backgroundColor: backgroundValue,
            color: colorValue,
            boxShadow: boxShadowValue,
            '&:hover': {
              backgroundColor: backgroundValue,
              color: colorValue,
              boxShadow: hoveredBoxShadowValue,
            },
            '&:focus:not(:hover)': {
              backgroundColor: focusedBackgroundValue,
              color: colorValue,
              boxShadow: palette[color]
                ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
                : boxShadow([0, 0], [0, 3.2], white.main, 0.5),
            },
            [`&.${buttonClasses.disabled}`]: {
              backgroundColor: backgroundValue,
              color: focusedColorValue,
            },
          };
        }

        if (outlinedVariant) {
          // background color value
          const backgroundValue = color === 'white' ? rgba(white.main, 0.1) : transparent.main;
          // color value
          const colorValue = lodashHas(palette, color) ? palette[color].main : white.main;
          // boxShadow value
          const boxShadowValue = lodashHas(palette, color)
            ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
            : boxShadow([0, 0], [0, 3.2], white.main, 0.5);
          // border color value
          let borderColorValue = lodashHas(palette, color) ? palette[color].main : rgba(white.main, 0.75);
          if (color === 'white') {
            borderColorValue = rgba(white.main, 0.75);
          }

          return {
            background: backgroundValue,
            // backgroundColor: backgroundValue,
            color: colorValue,
            border: `${pxToRem(1)} solid ${borderColorValue}`,

            '&:hover': {
              backgroundColor: transparent.main,
              color: colorValue,
              borderColor: colorValue,
              opacity: 0.85,
            },

            '&:focus:not(:hover)': {
              backgroundColor: transparent.main,
              color: colorValue,
              boxShadow: boxShadowValue,
            },

            '&:active:not(:hover)': {
              backgroundColor: colorValue,
              color: white.main,
              opacity: 0.85,
            },

            [`&.${buttonClasses.disabled}`]: {
              color: colorValue,
              borderColor: colorValue,
            },
          };
        }

        if (textVariant) {
          // color value
          const colorValue = lodashHas(palette, color) ? palette[color].main : white.main;
          // color value when button is focused
          const focusedColorValue = lodashHas(palette, color) ? palette[color].focus : white.focus;

          return {
            color: colorValue,

            '&:hover': {
              color: focusedColorValue,
            },

            '&:focus:not(:hover)': {
              color: focusedColorValue,
              boxShadow: 'none',
            },
          };
        }

        if (gradientVariant) {
          // background value
          const backgroundValue =
            color === 'white' || !lodashHas(colored, color)
              ? white.main
              : linearGradient(gradients[color].main, gradients[color].state);
          // boxShadow value
          const boxShadowValue = lodashHas(colored, color)
            ? `${boxShadow([0, 3], [3, 0], palette[color].main, 0.15)}, ${boxShadow(
                [0, 3],
                [1, -2],
                palette[color].main,
                0.2,
              )}, ${boxShadow([0, 1], [5, 0], palette[color].main, 0.15)}`
            : 'none';
          // boxShadow value when button is hovered
          const hoveredBoxShadowValue = lodashHas(colored, color)
            ? `${boxShadow([0, 14], [26, -12], palette[color].main, 0.4)}, ${boxShadow(
                [0, 4],
                [23, 0],
                palette[color].main,
                0.15,
              )}, ${boxShadow([0, 8], [10, -5], palette[color].main, 0.2)}`
            : 'none';
          // color value
          let colorValue = white.main;
          if (color === 'white') {
            colorValue = text.main;
          } else if (color === 'light') {
            colorValue = gradients.dark.state;
          }

          return {
            background: backgroundValue,
            color: colorValue,
            boxShadow: boxShadowValue,

            '&:hover': {
              boxShadow: hoveredBoxShadowValue,
              color: colorValue,
            },

            '&:focus:not(:hover)': {
              boxShadow: boxShadowValue,
              color: colorValue,
            },

            [`&.${buttonClasses.disabled}`]: {
              background: backgroundValue,
              color: colorValue,
            },
          };
        }

        return {};
      }

      return {};
    });

    const sizeStyle = {
      ...(smallSize && {
        ...((containedVariant || gradientVariant || textVariant) && {
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
      ...(mediumSize && {
        ...((containedVariant || gradientVariant || textVariant) && {
          minHeight: pxToRem(isLight ? 40 : 37),
          padding: `${pxToRem(6)} ${pxToRem(isLight ? 22 : 26)}`,
          fontSize: size.xs,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(17)} !important`,
          },
        }),
        ...(outlinedVariant && {
          minHeight: pxToRem(isLight ? 32 : 31),
          padding: `${pxToRem(6)} ${pxToRem(isLight ? 22 : 26)}`,
          fontSize: size.xs,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(17)} !important`,
          },
        }),
      }),
      ...(largeSize && {
        ...((containedVariant || gradientVariant || textVariant) && {
          minHeight: pxToRem(isLight ? 47 : 44),
          padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 34)}`,
          fontSize: size.sm,
          '& .material-icon, .material-icons-round, svg': {
            fontSize: `${pxToRem(22)} !important`,
          },
        }),
        ...(outlinedVariant && {
          minHeight: pxToRem(isLight ? 47 : 46),
          padding: `${pxToRem(12)} ${pxToRem(isLight ? 28 : 34)}`,
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
