import { ButtonProps as MuiButtonProps } from '@mui/material/Button/Button';
import { Merge } from 'type-fest';

export type ButtonProps = Merge<MuiButtonProps, {
  circular?: boolean;
  iconOnly?: boolean;
}>;

export type ButtonOwnerStateType = {
  size?: ButtonProps['size'];
  circular?: ButtonProps['circular'];
  iconOnly?: ButtonProps['iconOnly'];
};
