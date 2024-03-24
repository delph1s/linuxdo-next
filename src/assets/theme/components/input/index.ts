import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { inputClasses } from '@mui/material/Input';
import { inputBaseClasses } from '@mui/material/InputBase';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Theme } from '@mui/material/styles';

export const input = (
  theme: Theme,
): {
  MuiInput: MuiThemeOptionsComponents['MuiInput'];
  MuiInputLabel: MuiThemeOptionsComponents['MuiInputLabel'];
  MuiOutlinedInput: MuiThemeOptionsComponents['MuiOutlinedInput'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, black, info, dark, text, grey, transparent, background, inputBorderColor } = theme.palette;
  const { borderWidth, borderRadius } = theme.borders;
  const { md } = theme.boxShadows;
  const { rgba, pxToRem } = theme.functions;
  const { size } = theme.typography;

  return {
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: size.sm,
          color: dark.main,
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `${borderWidth[1]} solid ${isLight ? inputBorderColor : rgba(inputBorderColor, 0.6)}`,
          },
          '&:before': {
            borderColor: isLight ? inputBorderColor : rgba(inputBorderColor, 0.6),
          },
          '&:after': {
            borderColor: info.main,
          },
          ...(!isLight && {
            input: {
              color: white.main,
              '&::-webkit-input-placeholder': {
                color: grey[100],
              },
            },
          }),
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: size.sm,
          color: text.main,
          lineHeight: 0.9,
          '&.Mui-focused': {
            color: info.main,
          },
          [`&.${inputLabelClasses.shrink}`]: {
            lineHeight: 1.5,
            fontSize: size.md,
            [`~ .${inputBaseClasses.root} .${outlinedInputClasses.notchedOutline} legend`]: {
              fontSize: '0.85em',
            },
          },
        },
        sizeSmall: {
          fontSize: size.xs,
          lineHeight: 1.625,
          [`&.${inputLabelClasses.shrink}`]: {
            lineHeight: 1.6,
            fontSize: size.sm,
            [`~ .${inputBaseClasses.root} .${outlinedInputClasses.notchedOutline} legend`]: {
              fontSize: '0.72em',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: transparent.main,
          fontSize: size.sm,
          borderRadius: borderRadius.md,
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: isLight ? inputBorderColor : rgba(inputBorderColor, 0.6),
          },
          '&.Mui-focused': {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: info.main,
            },
          },
        },
        notchedOutline: {
          borderColor: isLight ? inputBorderColor : rgba(inputBorderColor, 0.6),
        },
        input: {
          color: isLight ? grey[700] : white.main,
          padding: pxToRem(12),
          backgroundColor: transparent.main,
          ...(!isLight && {
            '&::-webkit-input-placeholder': {
              color: grey[100],
            },
          }),
        },
        inputSizeSmall: {
          fontSize: size.xs,
          padding: pxToRem(10),
        },
        multiline: {
          color: grey[700],
          padding: 0,
        },
      },
    },
  };
};
