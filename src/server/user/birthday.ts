import { routes } from '@server/routes';

type FetchUpdateUserBirthdayType = (username: string, csrfToken: string, dateString?: string) => Promise<any>;

export const fetchUpdateUserBirthday: FetchUpdateUserBirthdayType = (username, csrfToken, dateString) => {
  return fetch(routes.user.userProfile(username), {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      pragma: 'no-cache',
      'x-csrf-token': csrfToken,
      'x-requested-with': 'XMLHttpRequest',
    },
    body: `date_of_birth=${dateString}`,
    method: 'PUT',
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
