import { appBar } from '@assets/theme/components/appBar';
import { autocomplete } from '@assets/theme/components/autocomplete';
import { button } from '@assets/theme/components/button';
import { card } from '@assets/theme/components/card';
import { dialog } from '@assets/theme/components/dialog';
import { divider } from '@assets/theme/components/divider/divider';
import { drawer } from '@assets/theme/components/drawer';
import { input } from '@assets/theme/components/input';
import { progress } from '@assets/theme/components/progress';
import { switchButton } from '@assets/theme/components/switch';
import { Theme, ThemeOptions } from '@mui/material/styles';
import lodashMerge from 'lodash/merge';

export const componentsOverrides = (theme: Theme): Theme['components'] => {
  const components = lodashMerge(
    appBar(theme),
    autocomplete(theme),
    button(theme),
    card(theme),
    dialog(theme),
    divider(theme),
    drawer(theme),
    input(theme),
    progress(theme),
    switchButton(theme),
  );

  return components;
};
