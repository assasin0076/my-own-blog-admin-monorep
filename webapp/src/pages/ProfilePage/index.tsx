import { withPageWrapper } from '@frontend/components/WithPageWrapper';
import css from './index.module.scss';
import { FormButton } from '@frontend/components/form/FormButton';
import { useState } from 'react';
import { useFormik } from 'formik';
import { zUpdateTrpcProfileInput } from '@backend/router/updateProfile/input';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '@frontend/lib/trpc';
import z from 'zod';
import { FormInput } from '@frontend/components/form/FormInput';
import { zUpdatePasswordTrpcInput } from '@backend/router/updatePassword';

export const ProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  const [mode, setMode] = useState<'base' | 'edit' | 'changePassword'>('base');

  const utils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const updatePassword = trpc.updatePassword.useMutation();

  const onSubmitEdit = async (
    values: z.infer<typeof zUpdateTrpcProfileInput>
  ): Promise<boolean> => {
    const updatedMe = await updateProfile.mutateAsync(values);

    setMode('base');

    utils.getMe.invalidate();

    utils.getMe.setData(undefined, { me: updatedMe });
    return true;
  };

  const initialValuesEdit = {
    id: me!.id,
    nick: me?.nick ?? '',
  };
  const formikEdit = useFormik({
    initialValues: initialValuesEdit,

    validationSchema: toFormikValidationSchema(zUpdateTrpcProfileInput),

    onSubmit: async (values: z.infer<typeof zUpdateTrpcProfileInput>) => {
      try {
        await onSubmitEdit(values);
        formikEdit.resetForm();
      } catch (error) {
        if (typeof error !== 'string') return;
      }
    },
  });

  const initialValuesPassword = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  };
  const formikPassword = useFormik({
    initialValues: initialValuesPassword,

    validationSchema: toFormikValidationSchema(
      zUpdatePasswordTrpcInput
        .extend({
          newPasswordAgain: z.string().min(6),
        })
        .superRefine((val, ctx) => {
          if (val.newPassword !== val.newPasswordAgain) {
            ctx.addIssue({
              code: 'custom',
              message: 'Match: Passwords expected to match',
              path: ['newPasswordAgain'],
            });
          }
        })
    ),

    onSubmit: async ({ newPassword, oldPassword }) => {
      try {
        await updatePassword.mutateAsync({ newPassword, oldPassword });

        setMode('base');
        formikPassword.resetForm();
      } catch (error) {
        if (typeof error !== 'string') return;
      }
    },
  });

  const handleEdit = () => {
    setMode('edit');
  };
  const handleSaveEdit = () => {
    formikEdit.handleSubmit();
  };

  const handleChangePassword = () => {
    setMode('changePassword');
  };
  const handleSavePassword = () => {
    formikPassword.handleSubmit();
  };

  const handleReset = () => {
    setMode('base');
    formikEdit.resetForm();
    formikPassword.resetForm();
  };

  const formViews = {
    base: (
      <div className={css.page__data}>
        <div className={css.data__container}>
          <div className={css.data__field}>
            <div className={css.data__label}>Никнейм:</div>
            <div className={css.data__value}>{me?.nick ?? 'Нет никнейма'}</div>
          </div>
        </div>
        <div className={css.form__buttons}>
          <FormButton
            label="Изменить пароль"
            className={css.data__button}
            onClick={handleChangePassword}
          />
          <FormButton label="Редактировать" className={css.data__button} onClick={handleEdit} />
        </div>
      </div>
    ),
    edit: (
      <div className={css.page__data}>
        <div className={css.data__container}>
          <div className={css.data__field}>
            <div className={css.data__label}>Никнейм:</div>
            <FormInput label="" name="nick" formik={formikEdit} />
          </div>
        </div>
        <div className={css.form__buttons}>
          <FormButton label="Отменить" className={css.data__button} onClick={handleReset} />
          <FormButton label="Сохранить" className={css.data__button} onClick={handleSaveEdit} />
        </div>
      </div>
    ),
    changePassword: (
      <div className={css.page__data}>
        <div className={css.data__container}>
          <div className={css.data__field}>
            <div className={css.data__label}>Старый пароль:</div>
            <FormInput label="" name="oldPassword" formik={formikPassword} />
          </div>
          <div className={css.data__field}>
            <div className={css.data__label}>Новый пароль:</div>
            <FormInput label="" name="newPassword" formik={formikPassword} />
          </div>
          <div className={css.data__field}>
            <div className={css.data__label}>Повторите новый пароль:</div>
            <FormInput label="" name="newPasswordAgain" formik={formikPassword} />
          </div>
        </div>
        <div className={css.form__buttons}>
          <FormButton label="Отменить" className={css.data__button} onClick={handleReset} />
          <FormButton label="Сохранить" className={css.data__button} onClick={handleSavePassword} />
        </div>
      </div>
    ),
  };

  return (
    <div className={css.page}>
      <h2>Профиль</h2>
      {formViews[mode]}
    </div>
  );
});
