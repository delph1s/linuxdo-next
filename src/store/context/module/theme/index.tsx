import { componentsOverrides } from '@assets/theme/components';
import { boxShadow } from '@assets/theme/functions/boxShadow';
import { hexToRgb } from '@assets/theme/functions/hexToRgb';
import { linearGradient } from '@assets/theme/functions/linearGradient';
import { pxToRem } from '@assets/theme/functions/pxToRem';
import { rgba } from '@assets/theme/functions/rgba';
import { borders } from '@assets/theme/vars/borders';
import { boxShadows } from '@assets/theme/vars/boxShadows';
import { breakpoints } from '@assets/theme/vars/breakpoints';
import { palette } from '@assets/theme/vars/colors';
import type { ThemeMode } from '@assets/theme/vars/types';
import { typography } from '@assets/theme/vars/typography';
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import lodashMerge from 'lodash/merge';
import React, { ReactNode, useMemo } from 'react';

/**
 * 改变主题
 *
 * @param mode 主题模式
 */
export const changeThemeMode = (mode: ThemeMode) => {
  return {
    palette: palette(mode),
    typography: typography(mode),
    boxShadows: boxShadows(mode),
    borders: borders(mode),
  };
};

type ThemeProviderProps = {
  children?: ReactNode;
};

function ThemeProvider({ children, ...restProps }: ThemeProviderProps) {
  const settings = { themeMode: 'light' };
  const themeModeOption = changeThemeMode(settings.themeMode as ThemeMode);

  // 基本配置
  const baseOption: ThemeOptions = useMemo(() => {
    return {
      breakpoints: { ...breakpoints },
      palette: palette('light'),
      typography: typography('light'),
      boxShadows: boxShadows('light'),
      borders: borders('light'),
      functions: {
        boxShadow,
        hexToRgb,
        linearGradient,
        pxToRem,
        rgba,
      },
      components: {},
    };
  }, []);

  const memoizedValue: ThemeOptions = useMemo(
    () =>
      lodashMerge(
        // Base
        baseOption,
        // Dark mode
        themeModeOption,
      ),
    [baseOption, themeModeOption],
  );

  // 创建样式
  const theme = createTheme(memoizedValue);
  // 覆盖组件样式
  theme.components = lodashMerge(componentsOverrides(theme), {});

  return (
    <MuiThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
