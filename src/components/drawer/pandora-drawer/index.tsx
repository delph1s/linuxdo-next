import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import { uiConfig } from '@config/ui';
import { getCsrfToken, getPreloadedUsername } from '@core/dom';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchGetInvites, fetchUpdateInvite } from '@src/server';
import lodashClone from 'lodash/clone';
import React, { useState } from 'react';

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
  const [forceStop, setForceStop] = useState<boolean>(false);

  const drawerSize = matches ? uiConfig.pandoraDrawerMaxHeight : uiConfig.pandoraDrawerMinHeight;
  const drawerVariant = drawerPosition === 'left' || drawerPosition === 'right' ? 'permanent' : 'persistent';

  // const handleModifyInviteExpiredTime = (inviteID: number, csrfToken: string) => {
  //   // 用户强制跳出
  //   if (forceStop) {
  //     setForceStop(false);
  //     console.warn("用户强制跳出");
  //     return;
  //   }
  //
  //   // 开始修改
  //   const modifyRes = await fetchUpdateInvite(inviteID, csrfToken);
  //   // console.info(browseRes);
  //   console.info(`success: ${SUCCESS_COUNT}, fail: ${FAILURE_COUNT}, successTotal: ${SUCCESS_COUNT * 60}`);
  //
  //   // 生成随机整数 randSleepTime，范围在 2000ms 到 3000ms 之间
  //   let randSleepTime = Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000;
  //   // 设置1秒后再次调用此函数，处理下一批字符串
  //   setTimeout(() => {
  //     handleModifyInviteExpiredTime(topicId, csrfToken);
  //   }, randSleepTime);
  // }

  const handleModifyInvitesExpiredTime = async () => {
    const username = getPreloadedUsername();
    const csrfToken = getCsrfToken();
    if (username && csrfToken) {
      const invitesData = await fetchGetInvites(username, csrfToken, 'pending', 0);
      if (invitesData) {
        const invites = lodashClone(invitesData.invites);
        // const modifyInviteInterval = setInterval();
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
        <Button variant="contained" onClick={() => handleModifyInvitesExpiredTime()}>
          一键修改邀请时限
        </Button>
      </Box>
    </StyledPandoraDrawer>
  );
}

export default PandoraDrawer;
