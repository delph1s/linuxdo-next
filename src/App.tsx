import styles from '@assets/scss/vars.module.scss';
import PandoraButton from '@components/inputs/button/pandora-button';
import PandoraDrawer from '@components/navigation/drawer/pandora-drawer';
import SettingsProvider from '@src/store/context/module/settings';
import ThemeProvider from '@src/store/context/module/theme';
import React, { useEffect, useState } from 'react';

function App() {
  const [openPandora, setOpenPandora] = React.useState(false);

  const toggleOpenPandora = () => {
    setOpenPandora(prevState => !prevState);
  };

  const handleClosePandora = () => {
    setOpenPandora(false);
  };

  return (
    <div className={styles.pandoraButton}>
      <SettingsProvider defaultSettings={{ themeMode: 'light' }}>
        <ThemeProvider>
          <PandoraButton
            color="info"
            variant="gradient"
            openPandora={openPandora}
            onClick={() => toggleOpenPandora()}
          />
          <PandoraDrawer openDrawer={openPandora} handleCloseDrawer={handleClosePandora} />
        </ThemeProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
