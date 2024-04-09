import Typography from '@components/data-display/typography/mui-typography';
import TrustLevelDialog from '@components/feedback/dialog/trust-level-dialog';
import UserComparisonDialog from '@components/feedback/dialog/user-comparison-dialog';
import Button from '@components/inputs/button/mui-button';
import { PandoraButtonPosition } from '@components/inputs/button/pandora-button/types';
import Box from '@components/layout/box/mui-box';
import { uiConfig } from '@config/ui';
import { getCsrfToken, getPreloadedUsername } from '@core/dom';
import { useSettingsContext } from '@core/hooks/useSettingsContext';
import { getFileHash } from '@core/utils/crypto-utils';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchForumAbout, fetchGetInvites, fetchUpdateInvite } from '@src/server';
import lodashClone from 'lodash/clone';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import { StyledPandoraDrawer } from './styles';

type PandoraDrawerProps = {
  openDrawer?: boolean;
  handleCloseDrawer?: () => void;
  drawerPosition?: PandoraButtonPosition;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function PandoraDrawer({
  openDrawer = false,
  handleCloseDrawer = undefined,
  drawerPosition = 'right',
  ...restProps
}: PandoraDrawerProps) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const forceStop = useRef<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [showPrivate, setShowPrivate] = useState<number>(0);

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

  const handleToggleOpen = (callback: Dispatch<SetStateAction<boolean>>, state?: boolean) => {
    if (state === undefined) {
      callback(prevState => !prevState);
    } else {
      callback(state);
    }
  };

  const [levelInfoOpen, setLevelInfoOpen] = useState<boolean>(false);
  const handleToggleLevelInfoDialog = (state?: boolean) => {
    handleToggleOpen(setLevelInfoOpen, state);
  };

  const [openPK, setOpenPK] = useState<boolean>(false);
  const handleToggleUserComparisonDialog = (state?: boolean) => {
    handleToggleOpen(setOpenPK, state);
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
      <Box pt={0.5} pb={3} px={3}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <Typography variant="h6">主题</Typography>
          <Switch
            checked={settings.themeMode === 'dark'}
            onChange={(e, checked) => settings.onUpdate('themeMode', checked ? 'dark' : 'light')}
          />
        </Box>
        <Divider />
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" gap={1} lineHeight={1}>
          <Typography variant="h6">修改邀请时限</Typography>
          <Tooltip title="太刑了，已被点名批评" placement="top" sx={{ zIndex: 10000 }}>
            <LoadingButton
              color="info"
              variant="gradient"
              // loading={isFetching}
              loading={false}
              // onClick={() => handleModifyInvitesExpiredTime()}
              onClick={() => window.open('https://linux.do/t/topic/46387/7?u=delph1s', '_blank')}
            >
              跳转说明帖子
            </LoadingButton>
          </Tooltip>
          {/* <Tooltip title="太刑了，已被点名批评" placement="top" sx={{ zIndex: 10000 }}> */}
          {/*   <Button */}
          {/*     color="primary" */}
          {/*     // disabled={!isFetching}  // 响应始皇的政策 */}
          {/*     disabled */}
          {/*     onClick={() => { */}
          {/*       forceStop.current = true; */}
          {/*     }} */}
          {/*   > */}
          {/*     停止 */}
          {/*   </Button> */}
          {/* </Tooltip> */}
        </Box>
        <Divider />
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <Typography variant="h6">升级之路</Typography>
          <Button color="info" disabled={isFetching} onClick={() => handleToggleLevelInfoDialog(true)}>
            查看等级数据
          </Button>
          <TrustLevelDialog open={levelInfoOpen} toggleOpen={handleToggleLevelInfoDialog} />
        </Box>
        <Divider />
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <Typography variant="h6">论坛统计数据</Typography>
          <LoadingButton
            color="info"
            variant="gradient"
            loading={isFetching}
            onClick={() => handleGetForumAbout()}
            disabled
          >
            查看
          </LoadingButton>
        </Box>
        <Divider />
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <Typography variant="h6">与佬友PK</Typography>
          <LoadingButton
            color="info"
            variant="gradient"
            loading={isFetching}
            onClick={() => handleToggleUserComparisonDialog(true)}
          >
            开P
          </LoadingButton>
          <UserComparisonDialog open={openPK} toggleOpen={handleToggleUserComparisonDialog} />
        </Box>
        <Divider />
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
          <Typography
            variant="h6"
            sx={{
              ...(showPrivate < 10 && {
                '&, &:hover, &:focus, &:focus:not(:hover), &:active': {
                  color: 'rgba(0, 0, 0, 0)',
                  background: 'transparent',
                  boxShadow: 'none',
                },
              }),
            }}
          >
            自主阅读
          </Typography>
          <Button
            color="info"
            variant="gradient"
            onClick={() => setShowPrivate(prevState => prevState + 1)}
            sx={{
              ...(showPrivate < 10 && {
                '&, &:hover, &:focus, &:focus:not(:hover), &:active': {
                  color: 'rgba(0, 0, 0, 0)',
                  background: 'transparent',
                  boxShadow: 'none',
                },
              }),
            }}
          >
            随机阅读
          </Button>
        </Box>
      </Box>
    </StyledPandoraDrawer>
  );
}

export default PandoraDrawer;
