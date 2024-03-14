/*
 * @version: 0.1.0
 * @author: HaituN.Lou
 * @contact: haitunlou@gmail.com
 * @time: 2024/3/14 09:34
 * @description:
 */

import '@mui/lab/themeAugmentation';
import '@mui/x-data-grid/themeAugmentation';
import '@mui/x-date-pickers/themeAugmentation';
import '@mui/x-tree-view/themeAugmentation';

import { Theme, ThemeOptions } from '@mui/material/styles';

export type MuiThemeOptionsComponents<MuiTheme = Omit<Theme, 'components'>> = Required<ThemeOptions>['components'];
