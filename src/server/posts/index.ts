import { routes } from '@src/server/routes';

/**
 * 获取帖子信息
 * @param postID - 帖子 id
 */
export const fetchGetPost = (postID: number) => {
  return fetch(routes.posts.detail(postID), {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      'sec-ch-ua': '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'x-csrf-token': 'gCV68uaSEWdGZVQww4DLcqAd4LeN2UQpY9meS_uQ0Wuz_3AKUn18-o7t56iruIVcK2PYGb2bexVePGaMiRL92g',
      'x-requested-with': 'XMLHttpRequest',
    },
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
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

type CreatePostBodyType = {
  raw: string; // 回复原始文本
  topic_id: number; // 回复主题 id
  reply_to_post_number: number; // 回复帖子 id
  unlist_topic?: boolean; // false
  category?: 11 | number; // 11 是搞七捻三
  is_warning?: boolean; // false
  whisper?: boolean; // false
  archetype?: 'regular' | string; // regular
  typing_duration_msecs?: number; // 2800
  composer_open_duration_msecs?: number; // 5037
  // featured_link?: ; // 空白
  shared_draft?: boolean; // false
  draft_key?: string; // topic_26876
  nested_post?: boolean; // true
};

/**
 * 创建帖子
 * FBI warning: 这是个危险的方法
 * @param fetchBody - 帖子的内容
 * @param csrfToken - csrf token
 */
export const fetchCreatePost = (fetchBody: CreatePostBodyType, csrfToken: string) => {
  const queryString = Object.entries(fetchBody)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return fetch(routes.posts.root, {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      'x-csrf-token': csrfToken,
      'x-requested-with': 'XMLHttpRequest',
    },
    body: queryString,
    method: 'POST',
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
