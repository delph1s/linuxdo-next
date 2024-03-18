import Button from '@components/button/mui-button';
import { PandoraButtonPosition } from '@components/button/pandora-button/types';
import TrustLevelDialog from '../../dialog/trust-level-dialog';
import { uiConfig } from '@config/ui';
import { getCsrfToken, getPreloadedUsername } from '@core/dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchForumAbout, fetchGetInvites, fetchUpdateInvite } from '@src/server';
import lodashClone from 'lodash/clone';
import React, { useRef, useState } from 'react';

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
        await handleModifyInviteExpiredTime(
          invites.map(invite => invite.id),
          csrfToken,
        );
      }
    }
  };

  const handleGetForumAbout = async () => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      setIsFetching(true);
      const aboutData = await fetchForumAbout(csrfToken).then(res => {
        setIsFetching(false);
        return res;
      });
      console.log(aboutData);
    }
  };

  const [levelInfoOpen, setLevelInfoOpen] = useState<boolean>(false);
  const handleToggleLevelInfoDialog = (state?: boolean) => {
    if (state === undefined) {
      setLevelInfoOpen(prevState => !prevState);
    } else {
      setLevelInfoOpen(state);
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
      <Box component="div" sx={{ width: 'calc(280px - 1rem)', m: '0.5rem' }}>
        <LoadingButton variant="contained" loading={isFetching} onClick={() => handleModifyInvitesExpiredTime()}>
          一键修改邀请时限
        </LoadingButton>
        <Button
          color="info"
          variant="gradient"
          disabled={!isFetching}
          onClick={() => {
            forceStop.current = true;
          }}
        >
          停止修改邀请时限
        </Button>
        <br />
        <LoadingButton variant="contained" loading={isFetching} onClick={() => handleGetForumAbout()}>
          获取 linux.do 论坛统计数据
        </LoadingButton>
        <br />
        <Button color="info" variant="gradient" disabled={isFetching} onClick={() => handleToggleLevelInfoDialog(true)}>
          查看等级数据
        </Button>
        <TrustLevelDialog open={levelInfoOpen} toggleOpen={handleToggleLevelInfoDialog} />
      </Box>
    </StyledPandoraDrawer>
  );
}

export default PandoraDrawer;
