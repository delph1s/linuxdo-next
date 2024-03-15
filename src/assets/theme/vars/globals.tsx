import styles from '@assets/scss/vars.module.scss';
import MuiGlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export function GlobalStyles() {
  const theme = useTheme();
  // const isLight = theme.palette.mode === 'light';
  const { info, dark } = theme.palette;

  return (
    <MuiGlobalStyles
      styles={{
        [`#${styles.pluginContainer}`]: {
          scrollBehavior: 'smooth',
        },
        [`#${styles.pluginContainer} *, #${styles.pluginContainer} *::before, #${styles.pluginContainer} *::after`]: {
          margin: 0,
          padding: 0,
        },
        [`#${styles.pluginContainer} a, #${styles.pluginContainer} a:link, #${styles.pluginContainer} a:visited`]: {
          textDecoration: 'none !important',
        },
        [`#${styles.pluginContainer} a.link, #${styles.pluginContainer} .link, #${styles.pluginContainer} a.link:link, #${styles.pluginContainer} .link:link, #${styles.pluginContainer} a.link:visited, #${styles.pluginContainer} .link:visited`]:
          {
            color: `${dark.main} !important`,
            transition: 'color 150ms ease-in !important',
          },
        [`#${styles.pluginContainer} a.link:hover, #${styles.pluginContainer} .link:hover, #${styles.pluginContainer} a.link:focus, #${styles.pluginContainer} .link:focus`]:
          {
            color: `${info.main} !important`,
          },
      }}
    />
  );
}
