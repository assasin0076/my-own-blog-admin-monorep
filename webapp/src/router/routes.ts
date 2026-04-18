const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => {
      return {
        ...acc,
        [key]: `:${key}`,
      };
    },
    {} as Record<keyof T, string>
  );
};

export const getMainRoute = () => '/';
export const getStuffListRoute = () => '/stuff';
export const getStuffNewtRoute = () => '/stuff/new';

export const stuffRouteParams = getRouteParams({
  stuffName: true,
});
export type StuffRouteParams = typeof stuffRouteParams;
export const getStuffRoute = (stuffRouteParams: StuffRouteParams) =>
  `/stuff/${stuffRouteParams.stuffName}`;
