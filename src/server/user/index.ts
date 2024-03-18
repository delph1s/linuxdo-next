import { routes } from '@server/routes';
import { UserProfile } from '@server/user/types';

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
