import { appConfig } from '@src/config';

const baseRoutes = {
  user: `${appConfig.domain}/u`,
  topics: `${appConfig.domain}/topics`,
  posts: `${appConfig.domain}/posts`,
};

export const routes = {
  about: `${appConfig.domain}/about.json`,
  user: {
    userProfile: (username: string) => `${baseRoutes.user}/${username}.json`,  // 用户数据
    summary: (username: string) => `${baseRoutes.user}/${username}/summary.json`,  // 用户总结
  },
  topics: {
    createdBy: (username: string) => `${baseRoutes.topics}/created-by/${username}.json`,  // 用户创建的主题
    timing: `${baseRoutes.topics}/timings`,  // 阅读计时
  },
  posts: {
    post: (postID: number) => `${baseRoutes.posts}/${postID}.json`,
  },
};
