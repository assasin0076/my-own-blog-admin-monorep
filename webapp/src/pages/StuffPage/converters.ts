import type { StuffFormValues } from '@frontend/components/StuffForm';
import _ from 'lodash';

export const convertStuffToFormValues = (stuff: StuffFormValues) => {
  const picked = _.pick(stuff, ['label', 'description', 'tags', 'repoLink', 'viewLink']);
  return picked;
};
