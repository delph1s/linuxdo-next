import { routes } from '@server/routes';
import { UserProfile } from '@server/user/types';
import { GM_xmlhttpRequest } from 'vite-plugin-monkey/dist/client';

/**
 * 获取用户总结
 * @param username - 用户名
 * @param csrfToken - csrf token
 */
export const fetchGetUserSummary = (username: string, csrfToken: string) => {
  return fetch(routes.user.summary(username), {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
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

export type TrustLevelRequireRawData = {
  key?: string;
  title: string;
  value: string;
  requireValue: string;
};

export const initRealTrustLevelInfo: TrustLevelRequireRawData[] = [
  {
    key: 'days_visited',
    title: '访问次数',
    value: '0',
    requireValue: '0',
  },
  {
    key: 'topics_reply_count',
    title: '回复的话题',
    value: '0',
    requireValue: '0',
  },
  {
    key: 'topics_entered',
    title: '浏览的话题',
    value: '0',
    requireValue: '0',
  },
  {
    key: 'topics_entered_all',
    title: '浏览的话题（所有时间）',
    value: '0',
    requireValue: '0',
  },
  {
    key: 'posts_read_count',
    title: '已读帖子',
    value: '0',
    requireValue: '0',
  },
  {
    key: 'posts_read_count_all',
    title: '已读帖子（所有时间）',
    value: '0',
    requireValue: '0',
  },
  {
    title: '被举报的帖子',
    value: '0',
    requireValue: '0',
  },
  {
    title: '发起举报的用户',
    value: '0',
    requireValue: '0',
  },
  {
    title: '点赞',
    value: '0',
    requireValue: '0',
  },
  {
    title: '获赞',
    value: '0',
    requireValue: '0',
  },
  {
    title: '获赞：单日最高数量',
    value: '0',
    requireValue: '0',
  },
  {
    title: '获赞：点赞用户数量',
    value: '0',
    requireValue: '0',
  },
  {
    title: '被禁言（过去6个月）',
    value: '0',
    requireValue: '0',
  },
  {
    title: '被封禁（过去6个月）',
    value: '0',
    requireValue: '0',
  },
];

export const fetchRealTrustLevelInfo = () => {
  const extractTrustLevelInfo = (trustLevelInfoHtmlText: string) => {
    if (trustLevelInfoHtmlText) {
      const trustLevelInfoParser = new DOMParser();
      const trustLevelInfoDoc = trustLevelInfoParser.parseFromString(trustLevelInfoHtmlText, 'text/html');
      const tableTr = Array.from(trustLevelInfoDoc.querySelectorAll('table tr td'));
      if (tableTr) {
        const tableData: string[] = [];
        tableTr.forEach(value => {
          tableData.push(value.textContent || '');
        });
        const trustLevelInfo = [
          {
            title: '访问次数',
            value: tableData[1],
            requireValue: tableData[2],
          },
          {
            title: '回复的话题',
            value: tableData[4],
            requireValue: tableData[5],
          },
          {
            title: '浏览的话题',
            value: tableData[7],
            requireValue: tableData[8],
          },
          {
            title: '浏览的话题（所有时间）',
            value: tableData[10],
            requireValue: tableData[11],
          },
          {
            title: '已读帖子',
            value: tableData[13],
            requireValue: tableData[14],
          },
          {
            title: '已读帖子（所有时间）',
            value: tableData[16],
            requireValue: tableData[17],
          },
          {
            title: '被举报的帖子',
            value: tableData[19],
            requireValue: tableData[20],
          },
          {
            title: '发起举报的用户',
            value: tableData[22],
            requireValue: tableData[23],
          },
          {
            title: '点赞',
            value: tableData[25],
            requireValue: tableData[26],
          },
          {
            title: '获赞',
            value: tableData[28],
            requireValue: tableData[29],
          },
          {
            title: '获赞：单日最高数量',
            value: tableData[31],
            requireValue: tableData[32],
          },
          {
            title: '获赞：点赞用户数量',
            value: tableData[34],
            requireValue: tableData[35],
          },
          {
            title: '被禁言（过去6个月）',
            value: tableData[37],
            requireValue: tableData[38],
          },
          {
            title: '被封禁（过去6个月）',
            value: tableData[40],
            requireValue: tableData[41],
          },
        ];
        return trustLevelInfo;
      }
      return initRealTrustLevelInfo;
    }
    return initRealTrustLevelInfo;
  };

  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: routes.user.trustLevelInfo,
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,zh;q=0.6',
        'sec-ch-ua': '"Chromium";v="999", "Not(A:Brand";v="24", "Microsoft Edge";v="999"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
      // data: undefined,
      // cookie,
      // binary,
      // nocache,
      // revalidate,
      // timeout,
      // context,
      // responseType,
      // overrideMimeType,
      // anonymous: true,
      // fetch,
      // user,
      // password,
      // onabort,
      onerror: (err) => {
        console.log('请求异常');
        resolve(initRealTrustLevelInfo);
      },
      // onloadstart,
      // onprogress,
      // onreadystatechange,
      // ontimeout,
      onload: (serverResponse) => {
        try {
          resolve(extractTrustLevelInfo(serverResponse.responseText));
        } catch (err) {
          resolve(initRealTrustLevelInfo);
        }
      },
    });
  });
};

/**
 * 获取用户信息
 * @param username - 用户名
 * @param csrfToken - csrf token
 */
export const fetchUserProfile = (username: string, csrfToken: string): Promise<UserProfile> => {
  return fetch(routes.user.userProfile(username), {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
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

export { fetchUpdateUserBirthday } from './birthday';
