import { button } from '@assets/theme/components/button';
import { Theme } from '@mui/material/styles';
import lodashMerge from 'lodash/merge';

export const componentsOverrides = (theme: Theme) => {
  const components = lodashMerge(
    button(theme),
  );

  return components;
};
