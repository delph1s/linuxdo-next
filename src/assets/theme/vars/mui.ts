import '@mui/lab/themeAugmentation';
import '@mui/x-data-grid/themeAugmentation';
import '@mui/x-date-pickers/themeAugmentation';
import '@mui/x-tree-view/themeAugmentation';

import { Theme, ThemeOptions } from '@mui/material/styles';

export type MuiThemeOptionsComponents<MuiTheme = Omit<Theme, 'components'>> = Required<ThemeOptions>['components'];
