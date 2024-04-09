import lodashKeys from 'lodash/keys';

export const objectToQuery = <T extends {}>(obj: T): string => {
  const query = (lodashKeys(obj) as (keyof typeof obj)[]).reduce((previousValue: string[], currentValue) => {
    if (obj[currentValue] !== undefined) {
      return [...previousValue, `${currentValue as string}=${obj[currentValue]}`];
    }
    return previousValue;
  }, []);
  return query.join('&');
};
