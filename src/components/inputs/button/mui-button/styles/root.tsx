import type { ButtonOwnerStateType } from '@components/inputs/button/mui-button/types';
import { filterForwardProps } from '@core/utils/filters';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, Theme } from '@mui/material/styles';

type StyledButtonProps = ButtonProps & {
  ownerState: ButtonOwnerStateType;
};

const ButtonRoot = styled(Button, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['ownerState']),
})<StyledButtonProps>(({ ownerState, theme }) => {
  const { functions, borders } = theme;
  const { size, circular, iconOnly } = ownerState;

  const { pxToRem } = functions;
  const { borderRadius } = borders;

  // styles for the button with circular={true}
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });

  // styles for the button with iconOnly={true}
  const iconOnlyStyles = () => {
    // width, height, minWidth and minHeight values
    let sizeValue = pxToRem(38);

    if (size === 'small') {
      sizeValue = pxToRem(25.4);
    } else if (size === 'large') {
      sizeValue = pxToRem(52);
    }

    // padding value
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === 'small') {
      paddingValue = pxToRem(4.5);
    } else if (size === 'large') {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,

      '& .material-icons': {
        marginTop: 0,
      },

      '&:hover, &:focus, &:active': {
        transform: 'none',
      },
    };
  };

  return {
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});

export default ButtonRoot;
