import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { alpha, Theme } from '@mui/material/styles';
import { switchClasses } from '@mui/material/Switch';

export const progress = (
  theme: Theme,
): {
  MuiSwitch: MuiThemeOptionsComponents['MuiSwitch'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, gradients, grey, transparent } = theme.palette;
  const { borderWidth } = theme.borders;
  const { md } = theme.boxShadows;
  const { pxToRem, linearGradient } = theme.functions;

  return {
    MuiSwitch: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        switchBase: {
          color: gradients.dark.main,
          "&:hover": {
            backgroundColor: transparent.main,
          },
          "&.Mui-checked": {
            color: gradients.dark.main,
            "&:hover": {
              backgroundColor: transparent.main,
            },
            [`& .${switchClasses.thumb}`]: {
              borderColor: `${gradients.dark.main} !important`,
            },
            [`& + .${switchClasses.track}`]: {
              backgroundColor: `${gradients.dark.main} !important`,
              borderColor: `${gradients.dark.main} !important`,
              opacity: 1,
            },
          },
          [`&.Mui-disabled + .${switchClasses.track}`]: {
            opacity: "0.3 !important",
          },
          [`&.Mui-focusVisible .${switchClasses.thumb}`]: {
            backgroundImage: linearGradient(gradients.info.main, gradients.info.state),
          },
        },
        thumb: {
          backgroundColor: white.main,
          boxShadow: md,
          border: `${borderWidth[1]} solid ${grey[400]}`,
        },
        track: {
          width: pxToRem(32),
          height: pxToRem(15),
          backgroundColor: grey[400],
          border: `${borderWidth[1]} solid ${grey[400]}`,
          opacity: 1,
        },
        checked: {},
      },
    },
  };
};
