import { TypographyOwnerStateType } from '@components/typography/mui-typography/types';
import { filterForwardProps } from '@core/utils/filters';
import { CSSObject, styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';

type StyledTypographyProps = {
  ownerState: TypographyOwnerStateType;
};

const TypographyRoot = styled(Typography, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['ownerState']),
})<StyledTypographyProps>(({ theme, ownerState }) => {
  const { palette, typography, functions } = theme;
  const isLight = palette.mode === 'light';
  const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient } = ownerState;

  const { gradients, transparent, white } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights: { [key: string]: number } = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== 'inherit' && color !== 'text' && color !== 'white' && gradients[color]
        ? linearGradient(gradients[color].main, gradients[color].state)
        : linearGradient(gradients.dark.main, gradients.dark.state),
    display: 'inline-block',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: transparent.main,
    position: 'relative',
    zIndex: 1,
  });

  // color value
  let colorValue = color === 'inherit' || !palette[color] ? 'inherit' : palette[color].main;

  if (!isLight && (color === 'inherit' || !palette[color])) {
    colorValue = 'inherit';
  } else if (!isLight && color === 'dark') colorValue = white.main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: 'none',
    color: colorValue,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...(textGradient && gradientStyles()),
  } as CSSObject;
});

export default TypographyRoot;
