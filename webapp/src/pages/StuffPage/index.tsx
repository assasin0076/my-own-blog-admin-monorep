import { trpc } from '@frontend/lib/trpc';
import type { StuffRouteParams } from '@frontend/router/routes';

import { format } from 'date-fns';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import styles from './index.module.scss';

import { FormButton } from '@frontend/components/form/FormButton';

import type { StuffFormValues } from '@frontend/components/StuffForm';
import { StuffForm } from '@frontend/components/StuffForm';
import _ from 'lodash';
import { convertStuffToFormValues } from './converters';
import { withPageWrapper } from '@frontend/components/WithPageWrapper';

export const StuffPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { stuffName } = useParams() as StuffRouteParams;

    return trpc.getStuff.useQuery({
      label: stuffName,
    });
  },
  setProps: ({ queryResult, checkExists }) => {
    const stuff = checkExists(queryResult.data.foundStuff, 'Не найден');
    return { stuff };
  },
})(({ stuff }) => {
  const { stuffName } = useParams() as StuffRouteParams;

  const utils = trpc.useUtils();

  const navigate = useNavigate();

  const updateStuff = trpc.updateStuff.useMutation();

  const [isEdit, setEdit] = useState(false);

  const updateStuffHandler = async (values: StuffFormValues): Promise<boolean> => {
    await updateStuff.mutateAsync({
      id: stuff?.id as string,
      ...values,
    });

    setEdit(false);
    if (stuffName !== values.label) {
      navigate(`/stuff/${values.label}`);
    }

    utils.getStuff.invalidate({ label: stuffName });
    return true;
  };

  return (
    <div className={styles.page}>
      {isEdit ? (
        <div>
          <h1 className={styles.header}>Редактирование проекта</h1>

          <StuffForm
            mode="edit"
            onSubmit={updateStuffHandler}
            initialValues={convertStuffToFormValues(stuff)}
          />

          <FormButton
            className={styles['edit-button']}
            onClick={() => setEdit(false)}
            label="Отмена"
          />
        </div>
      ) : (
        <div>
          <h1>stuff page</h1>

          <h2>{stuff?.label}</h2>

          <div className={styles.info}>
            <p>created at: </p>

            <p>{stuff?.createdAt ? format(stuff?.createdAt, 'MM/dd/yyyy') : 'нет даты'}</p>

            <p>tags: </p>

            <p>{stuff?.tags}</p>

            <p>description: </p>

            <p>{stuff?.description}</p>

            <p>author: </p>

            <p>{stuff?.author?.nick}</p>
          </div>

          <FormButton
            className={styles['edit-button']}
            onClick={() => setEdit(true)}
            label="Редактировать"
          />
        </div>
      )}
    </div>
  );
});
