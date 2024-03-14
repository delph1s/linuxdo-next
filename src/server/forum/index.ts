import { routes } from '@server/routes';

type UserInfo = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  title: string;
  last_seen_at: string | null;
}

type FetchForumAboutType = (csrfToken: string) => Promise<any>;

export const fetchForumAbout: FetchForumAboutType = csrfToken => {
  return fetch(routes.about, {
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
