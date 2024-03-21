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
import { fetchUserProfile } from '@src/server';
import lodashHas from 'lodash/has';
import lodashUniqueId from 'lodash/uniqueId';
import React, { useEffect, useRef, useState } from 'react';

export type TrustLevelRequireData = {
  visitCount: string;
  visitCountRequire: string;
  repliedTopic: string;
  repliedTopicRequire: string;
  viewedTopic: string;
  viewedTopicRequire: string;
  viewedTopicAll: string;
  viewedTopicAllRequire: string;
  viewedPost: string;
  viewedPostRequire: string;
  viewedPostAll: string;
  viewedPostAllRequire: string;
  reportedPost: string;
  reportedPostRequire: string;
  reportedUser: string;
  reportedUserRequire: string;
  likes: string;
  likesRequire: string;
  liked: string;
  likedRequire: string;
  likedTopSingleDay: string;
  likedTopSingleDayRequire: string;
  likedUser: string;
  likedUserRequire: string;
  postBanned: string;
  postBannedRequire: string;
  allBannedUser: string;
  allBannedUserRequire: string;
};

type TrustLevelRequireVisualData = {
  title: string;
  value: number;
  requireValue: number;
  calc: string;
};

type TrustLevelDialogProps = {
  open: boolean;
  toggleOpen: (state?: boolean) => void;
};

function LinearProgressWithLabel(props: LinearProgressProps & TrustLevelRequireVisualData) {
  const calResult = (
    v: number,
    rv: number,
    cc: string,
  ): {
    color: 'success' | 'error' | 'primary';
    pv: number;
    label: string;
  } => {
    let pv = v;
    if (rv === 0) {
      pv = v * 100;
    } else {
      pv = (v / rv) * 100;
    }
    pv = pv > 100 ? 100 : pv;

    if (cc === '>=') {
      return pv < 100
        ? { color: 'error', pv, label: `${v} < ${rv}，未达标` }
        : { color: 'success', pv, label: `${v} ≥ ${rv}，已达标` };
    }
    if (cc === '<=') {
      return pv > 100
        ? { color: 'error', pv, label: `${v} > ${rv}，未达标` }
        : { color: 'success', pv, label: `${v} ≤ ${rv}，已达标` };
    }

    return { color: 'primary', pv, label: `${v} / ${rv}，未知` };
  };

  const { title, value, requireValue, calc, ...restProps } = props;
  const result = calResult(value, requireValue, calc);

  return (
    <LinearProgress
      {...restProps}
      value={result.pv}
      color={result.color}
      variant="gradient"
      label
      labelColor={result.color}
      labelText={`${title}：${result.label}`}
    />
  );
}

function TrustLevelDialog({ open = false, toggleOpen }: TrustLevelDialogProps) {
  const connectLinuxDoIframeRef = useRef<HTMLIFrameElement>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trustLevelData, setTrustLevelData] = useState<TrustLevelRequireVisualData[]>([]);

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

  useEffect(() => {
    const transformStats = (
      items: {
        title: string;
        value: string;
        requireValue: string;
        calc?: string;
      }[],
    ): TrustLevelRequireVisualData[] => {
      return items.map(item => {
        const value = extractValue(item.value);
        const requireValue = extractRequireValue(item.requireValue);
        const calc = determineCalc(item.title, item.value, item.requireValue);

        return {
          title: item.title,
          value,
          requireValue,
          calc,
        };
      });
    };

    const connectLinuxDoListener = (e: MessageEvent<any>) => {
      if (lodashHas(e.data, 'allBannedUserRequire')) {
        const { data: leveltrustRequireData }: { data: TrustLevelRequireData } = e;
        const ltList = [
          {
            title: '访问次数',
            value: leveltrustRequireData.visitCount,
            requireValue: leveltrustRequireData.visitCountRequire,
          },
          {
            title: '回复的话题',
            value: leveltrustRequireData.repliedTopic,
            requireValue: leveltrustRequireData.repliedTopicRequire,
          },
          {
            title: '浏览的话题',
            value: leveltrustRequireData.viewedTopic,
            requireValue: leveltrustRequireData.viewedTopicRequire,
          },
          {
            title: '浏览的话题（所有时间）',
            value: leveltrustRequireData.viewedTopicAll,
            requireValue: leveltrustRequireData.viewedTopicAllRequire,
          },
          {
            title: '已读帖子',
            value: leveltrustRequireData.viewedPost,
            requireValue: leveltrustRequireData.viewedPostRequire,
          },
          {
            title: '已读帖子（所有时间）',
            value: leveltrustRequireData.viewedPostAll,
            requireValue: leveltrustRequireData.viewedPostAllRequire,
          },
          {
            title: '被举报的帖子',
            value: leveltrustRequireData.reportedPost,
            requireValue: leveltrustRequireData.reportedPostRequire,
          },
          {
            title: '发起举报的用户',
            value: leveltrustRequireData.reportedUser,
            requireValue: leveltrustRequireData.reportedUserRequire,
          },
          { title: '点赞', value: leveltrustRequireData.likes, requireValue: leveltrustRequireData.likesRequire },
          { title: '获赞', value: leveltrustRequireData.liked, requireValue: leveltrustRequireData.likedRequire },
          {
            title: '获赞：单日最高数量',
            value: leveltrustRequireData.likedTopSingleDay,
            requireValue: leveltrustRequireData.likedTopSingleDayRequire,
          },
          {
            title: '获赞：点赞用户数量',
            value: leveltrustRequireData.likedUser,
            requireValue: leveltrustRequireData.likedUserRequire,
          },
          {
            title: '被禁言（过去6个月）',
            value: leveltrustRequireData.postBanned,
            requireValue: leveltrustRequireData.postBannedRequire,
          },
          {
            title: '被封禁（过去6个月）',
            value: leveltrustRequireData.allBannedUser,
            requireValue: leveltrustRequireData.allBannedUserRequire,
          },
        ];
        setTrustLevelData(transformStats(ltList));
      }
    };

    const username = getPreloadedUsername();
    const csrfToken = getCsrfToken();
    if (username && csrfToken) {
      fetchUserProfile(username, csrfToken).then(res => {
        setUserProfile(res);
        if (res.user.trust_level >= 2) {
          window.addEventListener('message', connectLinuxDoListener);
        }
      });
    }

    return () => {
      if (connectLinuxDoListener) {
        window.removeEventListener('message', connectLinuxDoListener);
      }
    };
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

              <iframe
                title="levelTrustInfo"
                ref={connectLinuxDoIframeRef}
                style={{
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                  border: 'none',
                  borderRadius: '0.5rem',
                  display: 'hidden',
                }}
                // style={{ width: '100%', height: '800px', overflow: 'visible', border: 'none', borderRadius: '0.5rem' }}
                src="https://connect.linux.do/"
              />
              {trustLevelData.length > 0 ? (
                trustLevelData.map(ltd => (
                  <LinearProgressWithLabel
                    key={lodashUniqueId('tlProcess')}
                    title={ltd.title}
                    value={ltd.value}
                    requireValue={ltd.requireValue}
                    calc={ltd.calc}
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
        <Tooltip title="点击跳转 2024.03.19 更新说明" placement="top">
          <Button
            color="error"
            variant="text"
            onClick={() => window.open('https://linux.do/t/topic/35204?u=delph1s#h-2024-03-19-7', '_blank')}
          >
            一直无法显示？
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
