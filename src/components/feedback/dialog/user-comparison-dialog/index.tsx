import Typography from '@components/data-display/typography/mui-typography';
import LinearProgress from '@components/feedback/progress/label-linear-progress';
import Button from '@components/inputs/button/mui-button';
import Box from '@components/layout/box/mui-box';
import { getCsrfToken, getPreloadedUserProfile } from '@core/dom';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { fetchGetUserSummary, fetchSearchUsers } from '@src/server';
import lodashSome from 'lodash/some';
import React, { useEffect, useState } from 'react';

type OptionsType = {
  id: number;
  username: string;
  name: string;
  avatarTemplate: string;
};

type ComparisonData = {
  id: string;
  title: string;
  leftValue: number;
  rightValue: number;
  leftPercent: number;
  rightPercent: number;
  leftColor: 'success' | 'primary';
  rightColor: 'success' | 'primary';
};

type UserComparisonDialogProps = {
  open: boolean;
  toggleOpen: (state?: boolean) => void;
};

const filter = createFilterOptions<OptionsType>();

function UserComparisonDialog({ open, toggleOpen }: UserComparisonDialogProps) {
  const [userSuggestions, setUserSuggestions] = useState<OptionsType[]>([]);
  const [userOptions, setUserOptions] = useState<OptionsType[]>([]);
  const [leftUser, setLeftUser] = useState<OptionsType | null>(null);
  const [leftInputUser, setLeftInputUser] = useState<string>('');
  const [rightUser, setRightUser] = useState<OptionsType | null>(null);
  const [rightInputUser, setRightInputUser] = useState<string>('');
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);

  useEffect(() => {
    const userProfile = getPreloadedUserProfile();
    if (userProfile.username && !lodashSome(userSuggestions, ['username', userProfile.username])) {
      setUserSuggestions([
        {
          id: userProfile.id,
          username: userProfile.username,
          name: userProfile.name || userProfile.username,
          avatarTemplate: userProfile.avatar_template,
        },
      ]);
      setLeftUser({
        id: userProfile.id,
        username: userProfile.username,
        name: userProfile.name || userProfile.username,
        avatarTemplate: userProfile.avatar_template,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let active = true;

    const csrfToken = getCsrfToken();
    if (csrfToken) {
      if (leftInputUser) {
        fetchSearchUsers({ term: leftInputUser }, csrfToken)
          .then(res => {
            if (active) {
              const newOptions = res.users.map(user => {
                return {
                  id: user.id,
                  username: user.username,
                  name: user.name || user.username,
                  avatarTemplate: user.avatar_template,
                };
              });
              setUserOptions([...newOptions]);
            }
          })
          .catch(err => console.error(err));
      } else {
        setUserOptions([...userSuggestions]);
      }
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftInputUser]);

  useEffect(() => {
    let active = true;

    const csrfToken = getCsrfToken();
    if (csrfToken) {
      if (rightInputUser) {
        fetchSearchUsers({ term: rightInputUser }, csrfToken)
          .then(res => {
            if (active) {
              const newOptions = res.users.map(user => {
                return {
                  id: user.id,
                  username: user.username,
                  name: user.name || user.username,
                  avatarTemplate: user.avatar_template,
                };
              });
              setUserOptions([...newOptions]);
            }
          })
          .catch(err => console.error(err));
      } else {
        setUserOptions([...userSuggestions]);
      }
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightInputUser]);

  const trimUserSummaryData = (
    dataLeftUser: { user_summary: { [K: string]: number }; [K: string]: any },
    dataRightUser: { user_summary: { [K: string]: number }; [K: string]: any },
  ): ComparisonData[] => {
    const { user_summary: leftUS } = dataLeftUser;
    const { user_summary: rightUS } = dataRightUser;

    const newDataList = [
      { id: 'days_visited', title: '访问天数', leftValue: leftUS.days_visited, rightValue: rightUS.days_visited },
      { id: 'time_read', title: '阅读时间', leftValue: leftUS.time_read, rightValue: rightUS.time_read },
      {
        id: 'recent_time_read',
        title: '阅读时间（最近）',
        leftValue: leftUS.recent_time_read,
        rightValue: rightUS.recent_time_read,
      },
      {
        id: 'topics_entered',
        title: '浏览的话题',
        leftValue: leftUS.topics_entered,
        rightValue: rightUS.topics_entered,
      },
      {
        id: 'posts_read_count',
        title: '已读帖子',
        leftValue: leftUS.posts_read_count,
        rightValue: rightUS.posts_read_count,
      },
      { id: 'likes_given', title: '已送出赞', leftValue: leftUS.likes_given, rightValue: rightUS.likes_given },
      { id: 'likes_received', title: '已收到赞', leftValue: leftUS.likes_received, rightValue: rightUS.likes_received },
      { id: 'topic_count', title: '创建的话题', leftValue: leftUS.topic_count, rightValue: rightUS.topic_count },
      { id: 'post_count', title: '创建的帖子', leftValue: leftUS.post_count, rightValue: rightUS.post_count },
      { id: 'solved_count', title: '解决问题数', leftValue: leftUS.solved_count, rightValue: rightUS.solved_count },
    ];

    const resultData: ComparisonData[] = newDataList.map(item => {
      if (item.leftValue > item.rightValue) {
        return {
          ...item,
          leftPercent: 100,
          rightPercent: (item.rightValue / item.leftValue) * 100,
          leftColor: 'success',
          rightColor: 'primary',
        };
      }
      if (item.leftValue < item.rightValue) {
        return {
          ...item,
          leftPercent: (item.leftValue / item.rightValue) * 100,
          rightPercent: 100,
          leftColor: 'primary',
          rightColor: 'success',
        };
      }
      return {
        ...item,
        leftPercent: 100,
        rightPercent: 100,
        leftColor: 'primary',
        rightColor: 'primary',
      };
    });

    return resultData;
  };

  const handlePK = async () => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      if (leftUser && rightUser) {
        const leftUserData = await fetchGetUserSummary(leftUser.username, csrfToken);
        const rightUserData = await fetchGetUserSummary(rightUser.username, csrfToken);
        if (leftUserData && !lodashSome(userSuggestions, ['username', leftUser.username])) {
          setUserSuggestions(prevState => [
            {
              id: leftUser.id,
              username: leftUser.username,
              name: leftUser.name || leftUser.username,
              avatarTemplate: leftUser.avatarTemplate,
            },
            ...prevState,
          ]);
        }
        if (rightUserData && !lodashSome(userSuggestions, ['username', rightUser.username])) {
          setUserSuggestions(prevState => [
            {
              id: rightUser.id,
              username: rightUser.username,
              name: rightUser.name || rightUser.username,
              avatarTemplate: rightUser.avatarTemplate,
            },
            ...prevState,
          ]);
        }
        const trimedUserSummaryData = trimUserSummaryData(leftUserData, rightUserData);

        setComparisonData(trimedUserSummaryData);
      }
    }
  };

  return (
    <Dialog open={open} onClose={() => toggleOpen(false)}>
      <DialogTitle>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            佬友PK一下
          </Typography>
          <IconButton edge="end" color="inherit" onClick={() => toggleOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', p: 3 }}>
          <Box sx={{ width: '280px', mr: 1 }}>
            <Autocomplete
              id="pk-user-left"
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                return option.name;
              }}
              filterOptions={options => options}
              options={userOptions.length > 0 ? userOptions : userSuggestions}
              // includeInputInList
              value={leftUser}
              noOptionsText="未选择用户"
              onChange={(event, newValue) => {
                setLeftUser(newValue);
              }}
              onInputChange={(event, value) => setLeftInputUser(value)}
              renderInput={params => <TextField {...params} label="守擂者" />}
              renderOption={(props, option) => (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: 'flex', width: 24 }}>
                      <Avatar
                        alt={option.name}
                        src={option.avatarTemplate.replace('{size}', '96')}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Grid>
                    <Grid item sx={{ ml: '4px', width: 'calc(100% - 28px)', wordWrap: 'break-word' }}>
                      <Typography variant="subtitle1" color="dark" fontSize={12}>
                        {option.name}
                      </Typography>
                      <Typography variant="subtitle2" color="secondary" fontSize={10}>
                        {option.username}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              )}
            />
          </Box>
          <Box sx={{ width: '140px', textAlign: 'center' }}>
            <Button onClick={() => handlePK()}>VS</Button>
          </Box>
          <Box sx={{ width: '280px', ml: 1 }}>
            <Autocomplete
              id="pk-user-right"
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                return option.name;
              }}
              filterOptions={options => options}
              options={userOptions.length > 0 ? userOptions : userSuggestions}
              // includeInputInList
              value={rightUser}
              noOptionsText="未选择用户"
              onChange={(event, newValue) => {
                setRightUser(newValue);
              }}
              onInputChange={(event, value) => setRightInputUser(value)}
              renderInput={params => <TextField {...params} label="守擂者" />}
              renderOption={(props, option) => (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: 'flex', width: 24 }}>
                      <Avatar
                        alt={option.name}
                        src={option.avatarTemplate.replace('{size}', '96')}
                        sx={{ width: 24, height: 24 }}
                      />
                    </Grid>
                    <Grid item sx={{ ml: '4px', width: 'calc(100% - 28px)', wordWrap: 'break-word' }}>
                      <Typography variant="subtitle1" color="dark" fontSize={12}>
                        {option.name}
                      </Typography>
                      <Typography variant="subtitle2" color="secondary" fontSize={10}>
                        {option.username}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              )}
            />
          </Box>
        </Box>
        {comparisonData.length > 0 &&
          comparisonData.map(item => {
            return (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 3, pb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%', mr: 1 }}>
                  <Box sx={{ width: '20%', mr: 1 }}>
                    <Typography variant="button" fontWeight="medium" color="text">
                      {`${item.leftValue}`}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '80%' }}>
                    <LinearProgress
                      color={item.leftColor}
                      variant="gradient"
                      value={item.leftPercent}
                      sx={{ transform: 'scaleX(-1)' }}
                    />
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ width: '20%', textAlign: 'center' }}>
                  {`${item.title}`}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%', ml: 1 }}>
                  <Box sx={{ width: '80%' }}>
                    <LinearProgress color={item.rightColor} variant="gradient" value={item.rightPercent} />
                  </Box>
                  <Box sx={{ width: '20%', ml: 1 }}>
                    <Typography variant="button" fontWeight="medium" color="text">
                      {`${item.rightValue}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </DialogContent>
    </Dialog>
  );
}

export default UserComparisonDialog;
