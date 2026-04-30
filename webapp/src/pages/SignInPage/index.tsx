import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { useFormik } from 'formik';
import { trpc } from '@frontend/lib/trpc.ts';
import { zSignUpInput } from '@my-own-blog-admin-pannel/backend/router/signUp/input';
import { FormButton } from '@frontend/components/form/FormButton';
import { useTimedMessage } from '@frontend/hooks/useTimedMessage';

export const SignInPage = () => {
  const signUp = trpc.signUp.useMutation();

  const initialValues = {
    nick: '',
    password: '',
  };

  const {
    isVisible: isSuccessMessageVisible,
    message: successMessage,
    show: showSuccessMessage,
  } = useTimedMessage();
  const {
    isVisible: isErrorMessageVisible,
    message: errorMessage,
    show: showErrorMessage,
  } = useTimedMessage();

  const formik = useFormik({
    initialValues,

    validate: (values) => {
      const result = zSignUpInput.safeParse(values);

      if (result.success) return {};

      const errors: Partial<typeof initialValues> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof typeof initialValues;
        if (field) {
          errors[field] = err.message;
        }
      });

      return errors;
    },

    onSubmit: async (values) => {
      try {
        await signUp.mutateAsync(values);
        formik.resetForm();
        showSuccessMessage('Пользователь успешно зарегистрирован');
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
        {isSuccessMessageVisible && <div className={css.success}>{successMessage}</div>}
        {isErrorMessageVisible && <div className={css.error}>Произошла ошибка: {errorMessage}</div>}
        <FormButton label="Войти" type="submit" disabled={formik.isSubmitting} />
      </form>
    </div>
  );
};
