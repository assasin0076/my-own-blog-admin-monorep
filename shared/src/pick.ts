import _ from 'lodash';

export const pick = <TObject extends object, TKeys extends keyof TObject>(
  obj: TObject,
  keys: readonly TKeys[]
): Pick<TObject, TKeys> => {
  return _.pick(obj, keys) as Pick<TObject, TKeys>;
};
