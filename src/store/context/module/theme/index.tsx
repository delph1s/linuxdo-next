// import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { ReactNode } from 'react';

type ThemeProviderProps = {
  children?: ReactNode;
};

function ThemeProvider({ children, ...restProps }: ThemeProviderProps) {
  // 创建样式
  const theme = createTheme({});
  return (
    <MuiThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
