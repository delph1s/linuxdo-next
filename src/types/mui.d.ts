import { BoxShadowsType } from '@assets/theme/vars/types';

declare module '@mui/material/styles' {
  interface Theme {
    boxShadows: BoxShadowsType;
  }
}
