import Button from '@components/button/mui-button';
import Box from '@components/layout/box/mui-box';
import LinearProgress from '@components/progress/label-linear-progress';
import Typography from '@components/typography/mui-typography';
import { getCsrfToken, getPreloadedUsername } from '@core/dom';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { fetchGetUserSummary } from '@src/server';
import lodashSome from 'lodash/some';
import React, { useEffect, useState } from 'react';

type SuggestionsType = {
  label: string;
  username: string;
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

const filter = createFilterOptions<SuggestionsType>();

function UserComparisonDialog({ open, toggleOpen }: UserComparisonDialogProps) {
  const [userSuggestions, setUserSuggestions] = useState<SuggestionsType[]>([
    {
      label: '我秦始皇',
      username: 'neo',
    },
    {
      label: '慕思斐',
      username: 'musifei',
    },
  ]);
  const [leftUser, setLeftUser] = useState<SuggestionsType | null>(null);
  const [rightUser, setRightUser] = useState<SuggestionsType | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);

  useEffect(() => {
    const username = getPreloadedUsername();
    if (username && !lodashSome(userSuggestions, ['username', username])) {
      setUserSuggestions(prevState => [
        {
          label: username,
          username,
        },
        ...userSuggestions,
      ]);
      setLeftUser({
        label: username,
        username,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trimUserSummaryData = (
    dataLeftUser: { user_summary: { [K: string]: number }; [K: string]: any },
    dataRightUser: { user_summary: { [K: string]: number }; [K: string]: any },
  ): ComparisonData[] => {
    const { user_summary: leftUS } = dataLeftUser;
    const { user_summary: rightUS } = dataRightUser;

    const newDataList = [
      { id: 'days_visited', title: '访问天数', leftValue: leftUS.days_visited, rightValue: rightUS.days_visited },
      { id: 'time_read', title: '阅读时间', leftValue: leftUS.time_read, rightValue: rightUS.time_read },
      { id: 'recent_time_read', title: '阅读时间（最近）', leftValue: leftUS.recent_time_read, rightValue: rightUS.recent_time_read },
      { id: 'topics_entered', title: '浏览的话题', leftValue: leftUS.topics_entered, rightValue: rightUS.topics_entered },
      { id: 'posts_read_count', title: '已读帖子', leftValue: leftUS.posts_read_count, rightValue: rightUS.posts_read_count },
      { id: 'likes_given', title: '已送出赞', leftValue: leftUS.likes_given, rightValue: rightUS.likes_given },
      { id: 'likes_received', title: '已收到赞', leftValue: leftUS.likes_received, rightValue: rightUS.likes_received },
      { id: 'topic_count', title: '创建的话题', leftValue: leftUS.topic_count, rightValue: rightUS.topic_count },
      { id: 'post_count', title: '创建的帖子', leftValue: leftUS.post_count, rightValue: rightUS.post_count },
      { id: 'solved_count', title: '解决数', leftValue: leftUS.solved_count, rightValue: rightUS.solved_count },
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
              value={leftUser}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setLeftUser({
                    label: newValue,
                    username: newValue,
                  });
                } else if (newValue && newValue.username) {
                  setLeftUser({
                    label: newValue.username,
                    username: newValue.username,
                  });
                } else {
                  setLeftUser(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                const isExisting = options.some(option => inputValue === option.username);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    label: `添加"${inputValue}"`,
                    username: inputValue,
                  });
                  setUserSuggestions(prevState => [
                    {
                      label: inputValue,
                      username: inputValue,
                    },
                    ...userSuggestions,
                  ]);
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={userSuggestions}
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.label) {
                  return option.label;
                }
                return option.username;
              }}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              freeSolo
              renderInput={params => <TextField {...params} label="挑战者" />}
            />
          </Box>
          <Box sx={{ width: '140px', textAlign: 'center' }}>
            <Button onClick={() => handlePK()}>
              VS
            </Button>
          </Box>
          <Box sx={{ width: '280px', ml: 1 }}>
            <Autocomplete
              value={rightUser}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setRightUser({
                    label: newValue,
                    username: newValue,
                  });
                } else if (newValue && newValue.username) {
                  setRightUser({
                    label: newValue.username,
                    username: newValue.username,
                  });
                } else {
                  setRightUser(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                const isExisting = options.some(option => inputValue === option.username);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    label: `添加"${inputValue}"`,
                    username: inputValue,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={userSuggestions}
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.label) {
                  return option.label;
                }
                return option.username;
              }}
              renderOption={(props, option) => <li {...props}>{option.label}</li>}
              freeSolo
              renderInput={params => <TextField {...params} label="守擂者" />}
            />
          </Box>
        </Box>
        {comparisonData.length > 0 && comparisonData.map(item => {
          return (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 3, pb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40%', mr: 1 }}>
                <Box sx={{ width: '20%', mr: 1 }}>
                  <Typography variant="button" fontWeight="medium" color="text">
                    {`${item.leftValue}`}
                  </Typography>
                </Box>
                <Box sx={{ width: '80%' }}>
                  <LinearProgress color={item.leftColor} variant="gradient" value={item.leftPercent} sx={{ transform: 'scaleX(-1)' }} />
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
