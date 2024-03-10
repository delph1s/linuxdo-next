import { appConfig } from '@src/config';

const baseRoutes = {
  posts: `${appConfig.domain}/posts`,
  topics: `${appConfig.domain}/topics`,
  user: `${appConfig.domain}/u`,
};

export const routes = {
  user: {
    summary: (username: string) => `${baseRoutes.user}/${username}/summary.json`,  // 用户总结
  },
  posts: {
    post: (postID: number) => `${baseRoutes.posts}/${postID}.json`,
  },
  topics: {
    createdBy: (username: string) => `${baseRoutes.topics}/created-by/${username}.json`,  // 用户创建的主题
    timing: `${baseRoutes.topics}/timings`,  // 阅读计时
  },
};
