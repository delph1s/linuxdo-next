import { button } from '@assets/theme/components/button';
import { drawer } from '@assets/theme/components/drawer';
import { Theme, ThemeOptions } from '@mui/material/styles';
import lodashMerge from 'lodash/merge';

export const componentsOverrides = (theme: Theme): Theme['components'] => {
  const components = lodashMerge(
    button(theme),
    drawer(theme),
  );

  return components;
};
