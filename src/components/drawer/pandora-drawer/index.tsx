import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { useState } from 'react';

type PandoraDrawerProps = {
  open?: boolean;
  toggleOpen?: (newOpen: boolean) => void;
};

const drawerBleeding = 56;

function PandoraDrawer({
                         open = false, toggleOpen = undefined, ...restProps
                       }: PandoraDrawerProps) {
  const toggleDrawer = (newOpen: boolean) => () => {
    if (toggleOpen) {
      toggleOpen(newOpen);
    }
  };

  // const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <SwipeableDrawer
      // container={container}
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      a
    </SwipeableDrawer>
  );
}

export default PandoraDrawer;
