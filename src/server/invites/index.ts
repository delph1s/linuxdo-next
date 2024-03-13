import { appConfig } from '@src/config';

type Invite = {
  id: number;
  invite_key: string;
  link: string;
  email: null | string;
  domain: null | string;
  can_delete_invite: boolean;
  max_redemptions_allowed: number;
  redemption_count: number;
  created_at: string; // ISO8601 datetime string
  updated_at: string; // ISO8601 datetime string
  expires_at: string; // ISO8601 datetime string
  expired: boolean;
  topics: any[]; // You might want to define a more specific type if the structure of topics is known
  groups: any[]; // Similarly, define a more specific type for groups if possible
};

type Counts = {
  pending: number;
  expired: number;
  redeemed: number;
  total: number;
};

type InviteList = {
  invites: Invite[];
  can_see_invite_details: boolean;
  counts: Counts;
};

type GetInvitesFilter = 'pending' | 'expired' | 'redeemed' | '';

type FetchGetInvitesType = (
  username: string,
  csrfToken: string,
  filter?: GetInvitesFilter,
  offset?: number,
) => Promise<InviteList | null>;

export const fetchGetInvites: FetchGetInvitesType = (
  username,
  csrfToken,
  filter = 'pending',
  offset = 0,
) => {
  return fetch(`${appConfig.domain}/u/${username}/invited.json?filter=${filter}&offset=${offset}`, {
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
        .then((res: InviteList) => {
          return res;
        })
        .catch(err => {
          console.error(err);
          return null;
        });
    })
    .catch(err => {
      console.error(err);
      return null;
    });
};

type FetchUpdateInviteType = (
  inviteID: number,
  csrfToken: string,
  maxRedemptionsAllowed?: number,
  expiresAt?: string,
) => Promise<InviteList | null>;

export const fetchUpdateInvite: FetchUpdateInviteType = (
  inviteID,
  csrfToken,
  maxRedemptionsAllowed = 10,
  expiresAt = '2099-12-31+23%3A59%2B08%3A00',
) => {
  return fetch(`${appConfig.domain}/invites/${inviteID}`, {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'discourse-logged-in': 'true',
      'discourse-present': 'true',
      'x-csrf-token': csrfToken,
      'x-requested-with': 'XMLHttpRequest',
    },
    body: `max_redemptions_allowed=${maxRedemptionsAllowed}&expires_at=${expiresAt}`,
    method: 'PUT',
    mode: 'cors',
    credentials: 'include',
  })
    .then(serverPromise => {
      return serverPromise
        .json()
        .then(res => {
          return res;
        })
        .catch(err => {
          console.error(err);
          return null;
        });
    })
    .catch(err => {
      console.error(err);
      return null;
    });
};
