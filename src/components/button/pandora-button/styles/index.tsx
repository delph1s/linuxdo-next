import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import { uiConfig } from '@config/ui';
import { filterForwardProps } from '@core/utils/filters';
import Button, { ButtonProps } from '@mui/material/Button';
import { CSSObject, styled, useTheme } from '@mui/material/styles';

type PandoraButtonProps = ButtonProps & {
  openPandora?: boolean;
  buttonVisible?: boolean;
  buttonPosition?: PandoraButtonPosition;
};

export const StyledPandoraButton = styled(Button, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['openPandora', 'buttonVisible', 'buttonPosition']),
})<PandoraButtonProps>(
  ({ buttonPosition = 'right', openPandora = false, buttonVisible = false, theme }): CSSObject => {
    const { transitions } = theme;

    const baseStyle: CSSObject = {
      position: 'fixed',
    };

    switch (buttonPosition) {
      case 'top':
        return {
          ...baseStyle,
          left: '50%',
          top: 0,
          transition: transitions.create(['top'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
          ...(openPandora && {
            top: uiConfig.pandoraDrawerWidth,
            transition: transitions.create(['top'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          }),
        };
      case 'right':
        return {
          ...baseStyle,
          top: '50%',
          right: 0,
          transform: 'translateX(60%) rotate(-90deg)',
          transition: transitions.create(['right', 'transform'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
          ...(buttonVisible && {
            transform: 'translateX(28%) rotate(-90deg)',
            transition: transitions.create(['right', 'transform'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          }),
          ...(openPandora && {
            right: uiConfig.pandoraDrawerWidth,
            transform: 'translateX(28%) rotate(-90deg)',
            transition: transitions.create(['right', 'transform'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          }),
        };
      case 'bottom':
        return {
          ...baseStyle,
          left: '50%',
          bottom: 0,
          transition: transitions.create(['bottom'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
          ...(openPandora && {
            left: uiConfig.pandoraDrawerWidth,
            transition: transitions.create(['bottom'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          }),
        };
      case 'left':
        return {
          ...baseStyle,
          top: '50%',
          left: 0,
          transition: transitions.create(['left'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
          ...(openPandora && {
            left: uiConfig.pandoraDrawerWidth,
            transition: transitions.create(['left'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          }),
        };
      default:
        return {
          ...baseStyle,
          top: '50%',
          right: 0,
          transition: transitions.create(['right'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.shorter,
          }),
          ...(openPandora && {
            right: uiConfig.pandoraDrawerWidth,
            transition: transitions.create(['right'], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          }),
        };
    }
  }
);