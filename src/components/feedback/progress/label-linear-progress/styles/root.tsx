import { LinearProgressOwnerStateType } from '@components/feedback/progress/label-linear-progress/types';
import { filterForwardProps } from '@core/utils/filters';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

type StyledProgressProps = {
  ownerState: LinearProgressOwnerStateType;
};

const LinearProgressRoot = styled(LinearProgress, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['ownerState']),
})<StyledProgressProps>(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerState;

  const { text, gradients } = palette;
  const { linearGradient } = functions;

  // background value
  let backgroundValue;

  if (variant === 'gradient') {
    backgroundValue = gradients[color]
      ? linearGradient(gradients[color].main, gradients[color].state)
      : linearGradient(gradients.info.main, gradients.info.state);
  } else {
    backgroundValue = palette[color] ? palette[color].main : palette.info.main;
  }

  return {
    [`& .${linearProgressClasses.bar}`]: {
      background: backgroundValue,
      width: `${value}%`,
      color: text.main,
    },
  };
});

export default LinearProgressRoot;
