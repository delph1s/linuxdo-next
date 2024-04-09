import { qsOne } from '@core/utils/query-selector';

/**
 * 获取页面中的 csrf token
 */
export const getCsrfToken = () => {
  const csrfTokenMetaDom = qsOne('meta[name="csrf-token"]');
  if (csrfTokenMetaDom) {
    return csrfTokenMetaDom.getAttribute('content');
  }

  return null;
};

type UserProfile = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;

  [K: string]: any;
};

type PreloadedDataType = {
  currentUser: UserProfile;
  topicTrackingStates: any;
};

const initialPreloadedData = {
  currentUser: {
    id: -1,
    username: '',
    name: '',
    avatar_template: '',
  },
  topicTrackingStates: null,
};

/**
 * 获取页面中的预加载数据
 */
export const getPreloadedData = (): PreloadedDataType => {
  const preloadedDataDom = qsOne('#data-preloaded');
  if (preloadedDataDom) {
    const preloadedStringData = preloadedDataDom.getAttribute('data-preloaded');
    if (preloadedStringData) {
      try {
        const preloadedRawData = JSON.parse(preloadedStringData);
        const preloadedData = { ...initialPreloadedData };
        try {
          preloadedData.currentUser = JSON.parse(preloadedRawData.currentUser);
        } catch {
          /* empty */
        }
        try {
          preloadedData.topicTrackingStates = JSON.parse(preloadedRawData.topicTrackingStates);
        } catch {
          /* empty */
        }

        return preloadedData;
      } catch {
        return initialPreloadedData;
      }
    }

    return initialPreloadedData;
  }

  return initialPreloadedData;
};

/**
 * 获取预加载数据中的用户信息
 */
export const getPreloadedUserProfile = () => {
  const preloadedData = getPreloadedData();
  return preloadedData.currentUser;
};

/**
 * 获取预加载数据中的用户名
 */
export const getPreloadedUsername = (): string => {
  return getPreloadedUserProfile().username;
};
