import styles from '@assets/scss/vars.module.scss';
import PandoraButton from '@components/button/pandora-button';
import PandoraDrawer from '@components/drawer/pandora-drawer';
import ThemeProvider from '@src/store/context/module/theme';
import React, { useEffect, useState } from 'react';

function App() {
  const [openPandora, setOpenPandora] = React.useState(false);

  // useEffect(() => {
  // }, []);

  const toggleOpenPandora = ()  => {
    setOpenPandora(prevState => !prevState);
  };

  const handleClosePandora = () => {
    setOpenPandora(false);
  };

  return (
    <div className={styles.pandoraButton}>
      <ThemeProvider>
        <PandoraButton openPandora={openPandora} onClick={() => toggleOpenPandora()} />
        <PandoraDrawer openDrawer={openPandora} handleCloseDrawer={handleClosePandora} />
      </ThemeProvider>
    </div>
  );
}

export default App;
