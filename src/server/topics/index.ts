import { routes } from '@server/routes';
import ldRandom from 'lodash/random';

export const fetchTopicDetail = (topicID: number, csrfToken: string) => {
  return fetch(`${routes.topics.detail(topicID)}?track_visit=true&forceLoad=true`, {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      'discourse-track-view': 'true',
      'x-csrf-token': csrfToken,
      'x-requested-with': 'XMLHttpRequest',
    },
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })
    .then(serverPromise => {
      return serverPromise
        .json()
        .then(res => {
          return Promise.resolve(res);
        })
        .catch(err => {
          console.error(err);
          return Promise.reject(err);
        });
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
};

export const genContinuousPostsNumber = (botNum: number, topNum: number) => {
  return Array.from({ length: topNum - botNum + 1}, (_, i) => i + botNum);
};

export const genContinuousAllPostsNumber = (topNum: number) => {
  return genContinuousPostsNumber(1, topNum);
};

export const genFetchTopicsTimingBody = (topicID: number, postsNumber: number[]) => {
  // 随机时间（单位毫秒），有效数字为 0 - 60000 ms，超过的视为 60000 ms。分析见 https://linux.do/t/topic/26966?u=delph1s
  const randTime = ldRandom(60000, 61000, false);
  // 使用模板生成新的字符串列表
  const newPostsTimingsString = postsNumber.map(num => `timings%5B${num}%5D=${randTime}`);
  // 使用"&"连接字符串
  const result = newPostsTimingsString.join('&');

  return `${result}&topic_time=${randTime}&topic_id=${topicID}`;
};

export const fetchTopicsTiming = (fetchBody: string, csrfToken: string) => {
  return fetch(routes.topics.timing, {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'discourse-background': 'true',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      'x-csrf-token': csrfToken,
      'x-requested-with': 'XMLHttpRequest',
      'x-silence-logger': 'true',
    },
    body: fetchBody,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(new Error(`请求失败：${err.code}`));
    });
};
