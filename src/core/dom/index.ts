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

type PreloadedDataType = {
  currentUser: any;
  topicTrackingStates: any;
};

/**
 * 获取页面中的预加载数据
 */
export const getPreloadedData = (): PreloadedDataType | null => {
  const preloadedDataDom = qsOne('#data-preloaded');
  if (preloadedDataDom) {
    const preloadedStringData = preloadedDataDom.getAttribute('data-preloaded');
    if (preloadedStringData) {
      try {
        const preloadedRawData = JSON.parse(preloadedStringData);
        const preloadedData = {
          currentUser: null,
          topicTrackingStates: null,
        };
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
        return null;
      }
    }

    return null;
  }

  return null;
};

/**
 * 获取预加载数据中的用户名
 */
export const getPreloadedUsername = (): string | null => {
  const preloadedData = getPreloadedData();
  if (preloadedData && preloadedData.currentUser) {
    const { username } = preloadedData.currentUser;

    return username;
  }

  return null;
};
