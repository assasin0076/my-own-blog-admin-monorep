import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { FormTextarea } from '@frontend/components/form/FormTextarea';
import { useFormik } from 'formik';
import { trpc } from '@frontend/lib/trpc.ts';
import { zCreateTrpcStuffInput } from '@my-own-blog-admin-pannel/backend/router/createStuff/input';
import { useTimedMessage } from '@frontend/hooks/useTimedMessage';
import { FormButton } from '@frontend/components/form/FormButton';

export const NewStuffPage = () => {
  const createStuff = trpc.createStuff.useMutation();

  const initialValues = {
    label: '',
    description: '',
    tags: '',
    repoLink: '',
    viewLink: '',
  };

  const { isVisible: isSuccessMessageVisible, show: showSuccessMessage } = useTimedMessage();
  const {
    isVisible: isErrorMessageVisible,
    message: errorMessage,
    show: showErrorMessage,
  } = useTimedMessage();

  const formik = useFormik({
    initialValues,

    validate: (values) => {
      const result = zCreateTrpcStuffInput.safeParse(values);

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
        await createStuff.mutateAsync(values);
        formik.resetForm();
        showSuccessMessage('Успешно отправлено');
      } catch (error) {
        if (typeof error !== 'string') return;
        showErrorMessage(`Произошла ошибка: ${error}`);
      }
    },
  });

  return (
    <div className={css.page}>
      <h1 className={css.header}>Добавление проекта</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className={css.form}
      >
        <FormInput label={'label'} name={'label'} formik={formik} />
        <FormTextarea label={'description'} name={'description'} formik={formik} />
        <FormInput label={'tags'} name={'tags'} formik={formik} />
        <FormInput label={'repo link'} name={'repoLink'} formik={formik} />
        <FormInput label={'view link'} name={'viewLink'} formik={formik} />
        {formik.isSubmitting && <div className={css.info}>Отправка формы</div>}
        {isSuccessMessageVisible && <div className={css.success}>Успешно отправлено</div>}
        {isErrorMessageVisible && <div className={css.error}>Произошла ошибка: {errorMessage}</div>}
        <FormButton label="Создать" type="submit" disabled={formik.isSubmitting} />
      </form>
    </div>
  );
};
