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

export const StuffPage = () => {
  const { stuffName } = useParams() as StuffRouteParams;

  const utils = trpc.useUtils();

  const navigate = useNavigate();

  const { data, error, isLoading, isError } = trpc.getStuff.useQuery({
    label: stuffName,
  });

  const updateStuff = trpc.updateStuff.useMutation();

  const [isEdit, setEdit] = useState(false);

  const updateStuffHandler = async (values: StuffFormValues): Promise<boolean> => {
    await updateStuff.mutateAsync({
      id: data?.foundStuff?.id as string,
      ...values,
    });

    setEdit(false);
    if (stuffName !== values.label) {
      navigate(`/stuff/${values.label}`);
    }

    utils.getStuff.invalidate({ label: stuffName });
    return true;
  };

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>error: {error.message}</span>;
  } else if (data?.foundStuff === null || !data) {
    return <span>Stuff not found</span>;
  } else {
    return (
      <div className={styles.page}>
        {isEdit ? (
          <div>
            <h1 className={styles.header}>Редактирование проекта</h1>

            <StuffForm
              mode="edit"
              onSubmit={updateStuffHandler}
              initialValues={convertStuffToFormValues(data.foundStuff)}
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

            <h2>{data?.foundStuff?.label}</h2>

            <div className={styles.info}>
              <p>created at: </p>

              <p>
                {data?.foundStuff?.createdAt
                  ? format(data?.foundStuff?.createdAt, 'MM/dd/yyyy')
                  : 'нет даты'}
              </p>

              <p>tags: </p>

              <p>{data?.foundStuff?.tags}</p>

              <p>description: </p>

              <p>{data?.foundStuff?.description}</p>

              <p>author: </p>

              <p>{data?.foundStuff?.author?.nick}</p>
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
  }
};
