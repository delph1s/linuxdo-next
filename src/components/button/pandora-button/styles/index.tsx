import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import { uiConfig } from '@config/ui';
import { filterForwardProps } from '@core/utils/filters';
import Button, { ButtonProps } from '@mui/material/Button';
import { CSSObject, styled, useTheme } from '@mui/material/styles';

type PandoraButtonProps = ButtonProps & {
  openPandora?: boolean;
  buttonPosition?: PandoraButtonPosition;
};

export const StyledPandoraButton = styled(Button, {
  shouldForwardProp: (fieldName: string) => filterForwardProps(fieldName, ['openPandora', 'buttonPosition']),
})<PandoraButtonProps>(
  ({ buttonPosition = 'right', openPandora = false, theme }): CSSObject => {
    const { transitions } = theme;

    const baseStyle: CSSObject = {
      position: 'fixed',
    };

    switch (buttonPosition) {
      case 'top':
        return {
          ...baseStyle,
          left: '50%',
          top: openPandora ? `calc(50% - ${uiConfig.pandoraDrawerWidth})` : 0,
          transform: 'translateX(-50%)',
        };
      case 'right':
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
          })
        };
      case 'bottom':
        return {
          ...baseStyle,
          left: '50%',
          bottom: openPandora ? `calc(50% - ${uiConfig.pandoraDrawerWidth})` : 0,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          ...baseStyle,
          top: '50%',
          left: openPandora ? `calc(50% - ${uiConfig.pandoraDrawerWidth})` : 0,
          transform: 'translateY(-50%)',
        };
      default:
        return {
          ...baseStyle,
          top: '50%',
          right: openPandora ? `calc(50% - ${uiConfig.pandoraDrawerWidth})` : 0,
        };
    }
  }
);
