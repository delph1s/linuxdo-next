import { useLocalStorage } from '@core/utils/local-store';
import { SettingsContext } from '@src/core/hooks/useSettingsContext';
import type { SettingsValueProps } from '@src/store/context/module/settings/types';
import lodashIsEqual from 'lodash/isEqual';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

export type SettingsProviderProps = {
  children: ReactNode;
  defaultSettings: SettingsValueProps;
};

function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [settings, setSettings] = useLocalStorage('pandoraSettings', defaultSettings);

  const canReset = !lodashIsEqual(settings, defaultSettings);

  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
      setSettings((prevState: SettingsValueProps) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    },
    [setSettings],
  );

  // Reset
  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [defaultSettings, setSettings]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer(prevState => !prevState);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const memoizedValue = useMemo(() => {
    return {
      ...settings,
      onUpdate,
      // Reset
      canReset,
      onReset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    };
  }, [onReset, onUpdate, settings, canReset, openDrawer, onCloseDrawer, onToggleDrawer]);

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}

export default SettingsProvider;
