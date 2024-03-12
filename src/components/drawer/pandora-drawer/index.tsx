import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import { uiConfig } from '@config/ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';

import { StyledPandoraDrawer } from './styles';

type PandoraDrawerProps = {
  openDrawer?: boolean;
  handleCloseDrawer?: () => void;
  drawerPosition?: PandoraButtonPosition;
};

function PandoraDrawer(
  {
    openDrawer = false, handleCloseDrawer = undefined, drawerPosition = 'right', ...restProps
  }: PandoraDrawerProps
) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const drawerSize = matches ? uiConfig.pandoraDrawerMaxHeight : uiConfig.pandoraDrawerMinHeight;
  const drawerVariant = drawerPosition === 'left' || drawerPosition === 'right' ? 'permanent' : 'persistent';
  console.log(openDrawer);

  return (
    <StyledPandoraDrawer
      anchor={drawerPosition}
      variant={drawerVariant}
      open={openDrawer}
      onClose={() => handleCloseDrawer && handleCloseDrawer()}
      ModalProps={{
        keepMounted: true,
      }}
      openPandora={openDrawer}
      drawerPosition={drawerPosition}
    >
      abcdefg
    </StyledPandoraDrawer>
  );
}

export default PandoraDrawer;
