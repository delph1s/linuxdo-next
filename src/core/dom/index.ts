import { qsOne } from '@core/utils/query-selector';

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

export const getPreloadedUsername = (): string | null => {
  const preloadedData = getPreloadedData();
  if (preloadedData && preloadedData.currentUser) {
    const { username } = preloadedData.currentUser;

    return username;
  }

  return null;
};
