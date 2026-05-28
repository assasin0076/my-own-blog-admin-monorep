import { withPageWrapper } from '@frontend/components/WithPageWrapper';
import { useMe } from '@frontend/lib/ctx';
import css from './index.module.scss';
import { FormButton } from '@frontend/components/form/FormButton';
import { useState } from 'react';
import { useFormik } from 'formik';
import { zUpdateTrpcProfileInput } from '@backend/router/updateProfile/input';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '@frontend/lib/trpc';
import type z from 'zod';
import { FormInput } from '@frontend/components/form/FormInput';

const ProfilePageInner = () => {
  const me = useMe();
  const [isEdit, setIsEdit] = useState(false);
  const initialValues = {
    id: me!.id,
    nick: me?.nick ?? '',
  };

  const utils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();

  const onSubmit = async (values: z.infer<typeof zUpdateTrpcProfileInput>): Promise<boolean> => {
    const updatedMe = await updateProfile.mutateAsync(values);

    setIsEdit(false);

    utils.getMe.invalidate();

    utils.getMe.setData(undefined, { me: updatedMe });
    return true;
  };

  const formik = useFormik({
    initialValues,

    validationSchema: toFormikValidationSchema(zUpdateTrpcProfileInput),

    onSubmit: async (values: z.infer<typeof zUpdateTrpcProfileInput>) => {
      try {
        await onSubmit(values);
        formik.resetForm();
      } catch (error) {
        if (typeof error !== 'string') return;
      }
    },
  });

  const handleButton = () => {
    if (!isEdit) return setIsEdit(true);
    formik.handleSubmit();
  };

  const handleReset = () => {
    setIsEdit(false);
    formik.resetForm();
  };
  return (
    <div className={css.page}>
      <h2>Профиль</h2>
      <div className={css.page__data}>
        <div className={css.data__container}>
          <div className={css.data__field}>
            <div className={css.data__label}>Никнейм:</div>
            {isEdit ? (
              <FormInput label="" name="nick" formik={formik} />
            ) : (
              <div className={css.data__value}>{me?.nick ?? 'Нет никнейма'}</div>
            )}
          </div>
        </div>
        <FormButton
          label={isEdit ? 'Сохранить' : 'Редактировать'}
          className={css.data__button}
          onClick={handleButton}
        />
        {isEdit ? (
          <FormButton label="Отменить" className={css.data__button} onClick={handleReset} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export const ProfilePage = withPageWrapper({
  authorizedOnly: true,
})(ProfilePageInner);
