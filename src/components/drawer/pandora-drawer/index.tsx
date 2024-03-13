import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import { uiConfig } from '@config/ui';
import { getCsrfToken, getPreloadedUsername } from '@core/dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchGetInvites, fetchUpdateInvite } from '@src/server';
import lodashClone from 'lodash/clone';
import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { StyledPandoraDrawer } from './styles';

type PandoraDrawerProps = {
  openDrawer?: boolean;
  handleCloseDrawer?: () => void;
  drawerPosition?: PandoraButtonPosition;
};

function PandoraDrawer({
  openDrawer = false,
  handleCloseDrawer = undefined,
  drawerPosition = 'right',
  ...restProps
}: PandoraDrawerProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const forceStop = useRef<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const drawerSize = matches ? uiConfig.pandoraDrawerMaxHeight : uiConfig.pandoraDrawerMinHeight;
  const drawerVariant = drawerPosition === 'left' || drawerPosition === 'right' ? 'permanent' : 'persistent';

  const handleModifyInviteExpiredTime = async (inviteIDs: number[], csrfToken: string) => {
    // 用户强制跳出
    if (forceStop.current) {
      forceStop.current = false;
      setIsFetching(false);
      console.warn('用户强制跳出');
      return;
    }

    // 数组空了直接跳出
    if (inviteIDs.length <= 0) {
      setIsFetching(false);
      return;
    }

    // 开始修改
    const inviteID = inviteIDs.splice(0, 1)[0];
    const modifyRes = await fetchUpdateInvite(inviteID, csrfToken);
    console.log(modifyRes);

    // 生成随机整数 randSleepTime，范围在 1000ms 到 2000ms 之间
    const randSleepTime = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    // 设置1秒后再次调用此函数，处理下一批字符串
    setTimeout(() => {
      handleModifyInviteExpiredTime(inviteIDs, csrfToken);
    }, randSleepTime);
  };

  const handleModifyInvitesExpiredTime = async () => {
    const username = getPreloadedUsername();
    const csrfToken = getCsrfToken();
    if (username && csrfToken) {
      const invitesData = await fetchGetInvites(username, csrfToken, 'pending', 0);
      if (invitesData) {
        const invites = lodashClone(invitesData.invites);
        setIsFetching(true);
        forceStop.current = false;
        await handleModifyInviteExpiredTime(invites.map(invite => invite.id), csrfToken);
      }
    }
  };

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
      <Box component="div" sx={{ m: '0.5rem' }}>
        <LoadingButton variant="contained" loading={isFetching} onClick={() => handleModifyInvitesExpiredTime()}>
          一键修改邀请时限
        </LoadingButton>
        <Button
          variant="contained"
          disabled={!isFetching}
          onClick={() =>
            { forceStop.current = true; }
          }
        >
          停止修改邀请时限
        </Button>
      </Box>
    </StyledPandoraDrawer>
  );
}

export default PandoraDrawer;
