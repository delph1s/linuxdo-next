import type { PeriodType } from '@server/forum/leaderboard';
import { appConfig } from '@src/config';

const baseRoutes = {
  user: `${appConfig.domain}/u`,
  topics: `${appConfig.domain}/topics`,
  topicsShort: `${appConfig.domain}/t`,
  posts: `${appConfig.domain}/posts`,
};

export const routes = {
  about: `${appConfig.domain}/about.json`,
  leaderBoard: (period: PeriodType) => `${appConfig.domain}/leaderboard/1?period=${period}`,
  user: {
    searchUsers: `${baseRoutes.user}/search/users`, // 用户查询
    userProfile: (username: string) => `${baseRoutes.user}/${username}.json`, // 用户数据
    summary: (username: string) => `${baseRoutes.user}/${username}/summary.json`, // 用户总结
    trustLevelInfo: 'https://connect.linux.do/', // 官方信任等级查询页面
  },
  topics: {
    detail: (topicID: number) => `${baseRoutes.topicsShort}/${topicID}.json`, // 主题详情
    createdBy: (username: string) => `${baseRoutes.topics}/created-by/${username}.json`, // 用户创建的主题
    timing: `${baseRoutes.topics}/timings`, // 阅读计时
  },
  posts: {
    root: baseRoutes.posts,
    detail: (postID: number) => `${baseRoutes.posts}/${postID}.json`,
  },
};
