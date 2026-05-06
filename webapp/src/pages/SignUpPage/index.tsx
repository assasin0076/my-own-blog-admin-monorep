import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { useFormik } from 'formik';
import { trpc } from '@frontend/lib/trpc.ts';
import { zSignUpInput } from '@my-own-blog-admin-pannel/backend/router/signUp/input';
import { FormButton } from '@frontend/components/form/FormButton';
import { useTimedMessage } from '@frontend/hooks/useTimedMessage';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import z from 'zod';
import { getStuffListRoute } from '@frontend/router/routes';
import { useNavigate } from 'react-router';

export const SignUpPage = () => {
  const signUp = trpc.signUp.useMutation();
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const initialValues = {
    nick: '',
    password: '',
    passwordAgain: '',
  };
  const {
    isVisible: isErrorMessageVisible,
    message: errorMessage,
    show: showErrorMessage,
  } = useTimedMessage();

  const formik = useFormik({
    initialValues,

    validationSchema: toFormikValidationSchema(
      zSignUpInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .refine((data) => data.password === data.passwordAgain, {
          message: 'Пароли должны совпадать',
          path: ['passwordAgain'],
        })
    ),

    onSubmit: async (values) => {
      try {
        await signUp.mutateAsync(values);
        formik.resetForm();
        trpcUtils.invalidate();
        navigate(getStuffListRoute());
      } catch (error) {
        if (typeof error !== 'string') return;
        showErrorMessage(`Произошла ошибка: ${error}`);
      }
    },
  });

  return (
    <div className={css.page}>
      <h1 className={css.header}>Регистрация</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className={css.form}
      >
        <FormInput label={'nick'} name={'nick'} formik={formik} />
        <FormInput label={'password'} name={'password'} formik={formik} />
        <FormInput label={'passwordAgain'} name={'passwordAgain'} formik={formik} />
        {formik.isSubmitting && <div className={css.info}>Отправка формы</div>}
        {isErrorMessageVisible && <div className={css.error}>Произошла ошибка: {errorMessage}</div>}
        <FormButton label="Создать" type="submit" disabled={formik.isSubmitting} />
      </form>
    </div>
  );
};
