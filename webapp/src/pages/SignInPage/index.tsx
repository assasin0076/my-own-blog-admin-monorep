import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { useFormik } from 'formik';
import { trpc } from '@frontend/lib/trpc.ts';
import { zSignInInput } from '@my-own-blog-admin-pannel/backend/router/signIn/input';
import { FormButton } from '@frontend/components/form/FormButton';
import { useTimedMessage } from '@frontend/hooks/useTimedMessage';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useNavigate } from 'react-router';
import { getStuffListRoute } from '@frontend/router/routes';

export const SignInPage = () => {
  const signIn = trpc.signIn.useMutation();

  const navigate = useNavigate();

  const initialValues = {
    nick: '',
    password: '',
  };

  const {
    isVisible: isErrorMessageVisible,
    message: errorMessage,
    show: showErrorMessage,
  } = useTimedMessage();

  const formik = useFormik({
    initialValues,

    validationSchema: toFormikValidationSchema(zSignInInput),

    onSubmit: async (values) => {
      try {
        await signIn.mutateAsync(values);
        formik.resetForm();
        navigate(getStuffListRoute());
      } catch (error) {
        if (typeof error !== 'string') return;
        showErrorMessage(`Произошла ошибка: ${error}`);
      }
    },
  });

  return (
    <div className={css.page}>
      <h1 className={css.header}>Авторизация</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className={css.form}
      >
        <FormInput label={'nick'} name={'nick'} formik={formik} />
        <FormInput label={'password'} name={'password'} formik={formik} />
        {formik.isSubmitting && <div className={css.info}>Отправка формы</div>}
        {isErrorMessageVisible && <div className={css.error}>Произошла ошибка: {errorMessage}</div>}
        <FormButton label="Войти" type="submit" disabled={formik.isSubmitting} />
      </form>
    </div>
  );
};
