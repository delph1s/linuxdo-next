import Button from '@components/button/mui-button';
import LinearProgress from '@components/progress/mui-linear-progress';
import { LinearProgressProps } from '@components/progress/mui-linear-progress/types';
import Typography from '@components/typography/mui-typography';
import { getCsrfToken, getPreloadedUsername } from '@core/dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import { UserProfile } from '@server/user/types';
import { fetchRealTrustLevelInfo, fetchUserProfile, TrustLevelRequireRawData } from '@src/server';
import lodashUniqueId from 'lodash/uniqueId';
import React, { useEffect, useRef, useState } from 'react';

type TrustLevelRequireProgressData = {
  title: string;
  value: number;
  label: string;
  color: 'success' | 'error' | 'primary';
};

type TrustLevelDialogProps = {
  open: boolean;
  toggleOpen: (state?: boolean) => void;
};

function LinearProgressWithLabel(
  props: Omit<LinearProgressProps, 'value' | 'color' | 'label'> & TrustLevelRequireProgressData,
) {
  const { title, color, value, label, ...restProps } = props;

  return (
    <LinearProgress
      {...restProps}
      value={value}
      color={color}
      variant="gradient"
      label
      labelColor={color}
      labelText={`${title}：${label}`}
    />
  );
}

function TrustLevelDialog({ open = false, toggleOpen }: TrustLevelDialogProps) {
  const connectLinuxDoIframeRef = useRef<HTMLIFrameElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trustLevelData, setTrustLevelData] = useState<TrustLevelRequireProgressData[]>([]);

  const extractValue = (value: string): number => {
    if (value.includes('%')) {
      return parseFloat(value);
    }
    if (value.includes('≥')) {
      return parseFloat(value.substring(1).trim());
    }
    return parseFloat(value);
  };

  const extractRequireValue = (requireValue: string): number => {
    if (requireValue.includes('%')) {
      return parseFloat(requireValue);
    }
    if (requireValue.includes('最多')) {
      return parseFloat(requireValue.match(/\d+/)![0]);
    }
    return parseFloat(requireValue);
  };

  const determineCalc = (title: string, value: string, requireValue: string): string => {
    if (title.includes('被禁言') || title.includes('封禁') || requireValue.includes('最多')) {
      return '<=';
    }
    return '>=';
  };

  const transToProgressData = (
    title: string,
    value: number,
    requireValue: number,
    calc: string,
  ): TrustLevelRequireProgressData => {
    let newValue = value;
    if (requireValue === 0) {
      newValue = value * 100;
    } else {
      newValue = (value / requireValue) * 100;
    }
    newValue = newValue > 100 ? 100 : newValue;

    if (calc === '>=') {
      return newValue < 100
        ? { title, color: 'error', value: newValue, label: `${value} < ${requireValue}，未达标` }
        : { title, color: 'success', value: newValue, label: `${value} ≥ ${requireValue}，已达标` };
    }
    if (calc === '<=') {
      return newValue > 100
        ? { title, color: 'error', value: newValue, label: `${value} > ${requireValue}，未达标` }
        : { title, color: 'success', value: newValue, label: `${value} ≤ ${requireValue}，已达标` };
    }

    return { title, color: 'primary', value: newValue, label: `${value} / ${requireValue}，未知` };
  };

  useEffect(() => {
    const transformStats = (
      items: {
        title: string;
        value: string;
        requireValue: string;
        calc?: string;
      }[],
    ): TrustLevelRequireProgressData[] => {
      return items.map(item => {
        const value = extractValue(item.value);
        const requireValue = extractRequireValue(item.requireValue);
        const calc = determineCalc(item.title, item.value, item.requireValue);
        const progressData = transToProgressData(item.title, value, requireValue, calc);

        return progressData;
      });
    };

    const username = getPreloadedUsername();
    const csrfToken = getCsrfToken();
    if (username && csrfToken) {
      fetchUserProfile(username, csrfToken).then(res => {
        setUserProfile(res);
        if (res.user.trust_level >= 2) {
          fetchRealTrustLevelInfo().then((trustLevelRawData) => {
            const transformedData = transformStats(trustLevelRawData as TrustLevelRequireRawData[]);
            setTrustLevelData(transformedData);
          });
        }
      });
    }

    return () => {};
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={() => toggleOpen(false)}>
      <DialogTitle variant="h2">用户等级信息</DialogTitle>
      <DialogContent>
        {userProfile &&
          (userProfile.user.trust_level >= 2 ? (
            <>
              <Typography variant="body1">
                {`你的用户等级为${userProfile.user.trust_level}级，精确信息通过 connect.linux.do 查询`}
              </Typography>
              {trustLevelData.length > 0 ? (
                trustLevelData.map(ltd => (
                  <LinearProgressWithLabel
                    key={lodashUniqueId('tlProcess')}
                    title={ltd.title}
                    value={ltd.value}
                    label={ltd.label}
                    color={ltd.color}
                  />
                ))
              ) : (
                <>
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                </>
              )}
            </>
          ) : (
            <>
              <Typography variant="body1">{`你的用户等级为${userProfile.user.trust_level}级，还没有权限通过 connect.linux.do 查询，以下为估算数据`}</Typography>
              <Typography variant="body2">见笑了，这部分我还没有写好</Typography>
            </>
          ))}
      </DialogContent>
      <DialogActions>
        <Tooltip title="点击跳转 2024.03.22 更新说明" placement="top">
          <Button
            color="error"
            variant="text"
            onClick={() => window.open('https://linux.do/t/topic/35204#h-2024-03-22-9', '_blank')}
          >
            一直无法显示？
          </Button>
        </Tooltip>
        <Tooltip title="点击跳转 2024.03.22 更新说明" placement="top">
          <Button color="success" variant="text" onClick={() => window.open('https://connect.linux.do/', '_blank')}>
            被始皇 Ban 了就跳转官方吧
          </Button>
        </Tooltip>
        <Button color="info" onClick={() => toggleOpen(false)}>
          好的，我知道了
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TrustLevelDialog;
