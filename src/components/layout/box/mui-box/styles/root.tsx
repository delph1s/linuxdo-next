import {
  BordersBorderRadiusKeys,
  BoxOwnerStateType,
  BoxShadowsColoredKeys,
  BoxShadowsKeys,
  PaletteGradientsKeys,
} from '@components/layout/box/mui-box/types';
import { filterForwardProps } from '@core/utils/filters';
import Box, { BoxClasses } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import lodashHas from 'lodash/has';

type StyledBoxProps = {
  ownerState: BoxOwnerStateType;
};

const BoxRoot = styled(Box, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['ownerState']),
})<StyledBoxProps>(({ theme, ownerState }) => {
  const { palette, functions, borders, boxShadows } = theme;
  const { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow } = ownerState;

  const { gradients, grey, white } = palette;
  const { linearGradient } = functions;
  const { borderRadius: radius } = borders;
  const { colored } = boxShadows;

  const greyColors: { [key: string]: string } = {
    'grey-100': grey[100],
    'grey-200': grey[200],
    'grey-300': grey[300],
    'grey-400': grey[400],
    'grey-500': grey[500],
    'grey-600': grey[600],
    'grey-700': grey[700],
    'grey-800': grey[800],
    'grey-900': grey[900],
  };

  const validGradients: BoxOwnerStateType['bgColor'][] = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
    'light',
  ];

  const validColors = [
    'transparent',
    'white',
    'black',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
    'text',
    'grey-100',
    'grey-200',
    'grey-300',
    'grey-400',
    'grey-500',
    'grey-600',
    'grey-700',
    'grey-800',
    'grey-900',
  ];

  const validBorderRadius = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'section'];
  const validBoxShadows = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'inset'];

  // background value
  let backgroundValue: string = bgColor;
  if (variant === 'gradient') {
    backgroundValue = lodashHas(gradients, bgColor)
      ? linearGradient(
          gradients[bgColor as PaletteGradientsKeys].main,
          gradients[bgColor as PaletteGradientsKeys].state,
        )
      : white.main;
  } else if (validColors.includes(bgColor)) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  let colorValue: string = color;
  if (validColors.includes(color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  let borderRadiusValue: string = borderRadius;
  if (validBorderRadius.includes(borderRadius)) {
    borderRadiusValue = radius[borderRadius as BordersBorderRadiusKeys];
  }

  // boxShadow value
  let boxShadowValue: string = 'none';
  if (validBoxShadows.includes(shadow)) {
    boxShadowValue = boxShadows[shadow as BoxShadowsKeys];
  } else if (coloredShadow) {
    boxShadowValue = lodashHas(colored, coloredShadow) ? colored[coloredShadow as BoxShadowsColoredKeys] : 'none';
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});

export default BoxRoot;
