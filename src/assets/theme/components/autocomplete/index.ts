import { MuiThemeOptionsComponents } from '@assets/theme/vars/mui';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { chipClasses } from '@mui/material/Chip';
import { Theme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';

export const autocomplete = (
  theme: Theme,
): {
  MuiAutocomplete: MuiThemeOptionsComponents['MuiAutocomplete'];
} => {
  const isLight = theme.palette.mode === 'light';
  const { white, light, dark, text, transparent, background, gradients } = theme.palette;
  const { borderRadius } = theme.borders;
  const { md, lg } = theme.boxShadows;
  const { rgba, pxToRem } = theme.functions;
  const { size } = theme.typography;

  return {
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          boxShadow: isLight ? lg : md,
          padding: pxToRem(8),
          fontSize: size.sm,
          color: text.main,
          textAlign: 'left',
          backgroundColor: `${isLight ? white.main : background.card} !important`,
          borderRadius: borderRadius.md,
        },
        paper: {
          boxShadow: 'none',
          backgroundColor: transparent.main,
        },
        option: {
          padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
          borderRadius: borderRadius.md,
          fontSize: size.sm,
          color: text.main,
          transition: 'background-color 300ms ease, color 300ms ease',
          '&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus': {
            backgroundColor: isLight ? light.main : rgba(light.main, 0.2),
            color: isLight ? dark.main : white.main,
          },
          '&[aria-selected="true"]': {
            backgroundColor: `${isLight ? light.main : rgba(light.main, 0.2)} !important`,
            color: `${isLight ? dark.main : white.main} !important`,
          },
        },
        noOptions: {
          fontSize: size.sm,
          color: text.main,
        },
        groupLabel: {
          color: dark.main,
        },
        loading: {
          fontSize: size.sm,
          color: text.main,
        },
        tag: {
          display: 'flex',
          alignItems: 'center',
          height: 'auto',
          padding: pxToRem(4),
          backgroundColor: gradients.dark.state,
          color: white.main,
          [`& .${chipClasses.label}`]: {
            lineHeight: 1.2,
            padding: `0 ${pxToRem(10)} 0 ${pxToRem(4)}`,
          },
          [`& .${svgIconClasses.root}, & .${svgIconClasses.root}:hover, & .${svgIconClasses.root}:focus`]: {
            color: white.main,
            marginRight: 0,
          },
        },
        ...(!isLight && {
          popupIndicator: {
            color: text.main,
          },
          clearIndicator: {
            color: text.main,
          },
        }),
      },
    },
  };
};
