import { ThemeColorSchema } from '@assets/theme/vars/types';
import { TypographyProps } from '@components/typography/mui-typography/types';
import { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';
import { Merge } from 'type-fest';

export type LinearProgressOwnerStateType = {
  color: ThemeColorSchema;
  value: MuiLinearProgressProps['value'];
  variant: 'contained' | 'gradient';
};

export type LinearProgressProps = Merge<
  MuiLinearProgressProps,
  {
    variant?: LinearProgressOwnerStateType['variant'];
    color?: LinearProgressOwnerStateType['color'];
    label?: boolean;
    labelPosition?: 'top' | 'right' | 'left' | 'bottom';
    labelColor?: TypographyProps['color'];
    labelText?: string;
  }
>;
