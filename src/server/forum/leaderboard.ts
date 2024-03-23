import { routes } from '@src/server';

export type PeriodType = 'all' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export const fetchGetLeaderBoard = (period: PeriodType, csrfToken: string) => {
  return fetch(routes.leaderBoard(period), {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      pragma: 'no-cache',
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
