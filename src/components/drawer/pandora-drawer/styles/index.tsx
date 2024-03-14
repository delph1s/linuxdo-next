import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import { uiConfig } from '@config/ui';
import { filterForwardProps } from '@core/utils/filters';
import Drawer, { drawerClasses, DrawerProps } from '@mui/material/Drawer';
import { CSSObject, styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type PandoraDrawerProps = DrawerProps & {
  openPandora?: boolean;
  drawerPosition?: PandoraButtonPosition;
};

export const StyledPandoraDrawer = styled(Drawer, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['openPandora', 'drawerPosition']),
})<PandoraDrawerProps>(
  ({ drawerPosition = 'right', openPandora = false, theme }): CSSObject => {
    const {breakpoints, transitions} = theme;
    const matches = useMediaQuery(breakpoints.up('sm'));
    const drawerSize = matches ? uiConfig.pandoraDrawerMaxHeight : uiConfig.pandoraDrawerMinHeight;
    const drawerSizeGap = `${50 - parseInt(drawerSize.replace('%', ''), 10) / 2}%`;

    const baseStyle: CSSObject = {
      borderWidth: 0,
      borderRadius: '0.75rem',
    };

    switch (drawerPosition) {
      case 'top':
        return {
          [`& .${drawerClasses.paper}`]: {
            height: uiConfig.pandoraDrawerWidth,
            width: `${drawerSize}`,
            left: drawerSizeGap,
          },
        };
      case 'right':
        return {
          [`& .${drawerClasses.paper}`]: {
            ...baseStyle,
            width: uiConfig.pandoraDrawerWidth,
            height: `${drawerSize}`,
            top: drawerSizeGap,
            transform: `translateX(${uiConfig.pandoraDrawerWidth})`,
            transition: transitions.create(['transform'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.shorter,
            }),
            ...(openPandora && {
              transform: `translateX(${0})`,
              transition: transitions.create(['transform'], {
                easing: transitions.easing.sharp,
                duration: transitions.duration.enteringScreen,
              })
            }),
          },
        };
      case 'bottom':
        return {
          [`& .${drawerClasses.paper}`]: {
            height: uiConfig.pandoraDrawerWidth,
            width: `${drawerSize}`,
            left: drawerSizeGap,
          },
        };
      case 'left':
        return {
          [`& .${drawerClasses.paper}`]: {
            width: uiConfig.pandoraDrawerWidth,
            height: `${drawerSize}`,
            top: drawerSizeGap,
          },
        };
      default:
        return {
          [`& .${drawerClasses.paper}`]: {
            width: uiConfig.pandoraDrawerWidth,
            height: `${drawerSize}`,
            top: drawerSizeGap,
          },
        };
    }
  }
);
