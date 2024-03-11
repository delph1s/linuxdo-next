import styles from '@assets/scss/vars.module.scss';
import PandoraButton from '@components/button/pandora-button';
import PandoraDrawer from '@components/drawer/pandora-drawer';
import ThemeProvider from '@src/store/context/module/theme';
import React, { useEffect, useState } from 'react';

function App() {
  const [open, setOpen] = React.useState(false);

  // useEffect(() => {
  // }, []);

  const toggleOpen = (newOpen: boolean) => {
    setOpen(true);
  };

  return (
    <div className={styles.pandoraButton}>
      <ThemeProvider>
        <PandoraButton onClick={() => toggleOpen(true)} />
        <PandoraDrawer open={open} toggleOpen={toggleOpen} />
      </ThemeProvider>
    </div>
  );
}

export default App;
