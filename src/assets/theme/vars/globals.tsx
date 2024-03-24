import styles from '@assets/scss/vars.module.scss';
import { dialogClasses } from '@mui/material';
import MuiGlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export function GlobalStyles() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const { white, info, dark, grey } = theme.palette;

  return (
    <MuiGlobalStyles
      styles={{
        // [`#${styles.pluginContainer}`]: {
        //   scrollBehavior: 'smooth',
        // },
        // [`#${styles.pluginContainer} *, #${styles.pluginContainer} *::before, #${styles.pluginContainer} *::after`]: {
        //   margin: 0,
        //   padding: 0,
        // },
        // [`#${styles.pluginContainer} a, #${styles.pluginContainer} a:link, #${styles.pluginContainer} a:visited`]: {
        //   textDecoration: 'none !important',
        // },
        // [`#${styles.pluginContainer} a.link, #${styles.pluginContainer} .link, #${styles.pluginContainer} a.link:link, #${styles.pluginContainer} .link:link, #${styles.pluginContainer} a.link:visited, #${styles.pluginContainer} .link:visited`]:
        //   {
        //     color: `${dark.main} !important`,
        //     transition: 'color 150ms ease-in !important',
        //   },
        // [`#${styles.pluginContainer} a.link:hover, #${styles.pluginContainer} .link:hover, #${styles.pluginContainer} a.link:focus, #${styles.pluginContainer} .link:focus`]:
        //   {
        //     color: `${info.main} !important`,
        //   },
        [`.${dialogClasses.root}`]: {
          '& input[type=text], & input[type=password], & input[type=datetime], & input[type=datetime-local], & input[type=date], & input[type=month], & input[type=time], & input[type=week], & input[type=number], & input[type=email], & input[type=url], & input[type=search], & input[type=tel], & input[type=color]':
            {
              boxSizing: 'content-box',
              display: 'block',
              marginBottom: 0,
              color: isLight ? grey[700] : white.main,
              backgroundColor: 'transparent',
              border: 0,
              borderRadius: 0,
            },
          '& input[type=text]:focus, & input[type=password]:focus, & input[type=datetime]:focus, & input[type=datetime-local]:focus, & input[type=date]:focus, & input[type=month]:focus, & input[type=time]:focus, & input[type=week]:focus, & input[type=number]:focus, & input[type=email]:focus, & input[type=url]:focus, & input[type=search]:focus, & input[type=tel]:focus, & input[type=color]:focus':
            {
              borderColor: 'transparent',
              outline: 0,
              outlineOffset: 0,
            },
        },
      }}
    />
  );
}
