import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { FormTextarea } from '@frontend/components/form/FormTextarea';
import { useFormik } from 'formik';
import { trpc } from '@frontend/lib/trpc.ts';
import { zCreateTrpcStuffInput } from '@my-own-blog-admin-pannel/backend/router/createStuff/input';
import { useRef, useState } from 'react';

export const NewStuffPage = () => {
  const createStuff = trpc.createStuff.useMutation();

  const initialValues = {
    label: '',
    description: '',
    tags: '',
    repoLink: '',
    viewLink: '',
  };

  const [isSuccessMessageVisible, setSuccessMessageVisibility] = useState(false);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
        await createStuff.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisibility(true);
        successTimeoutRef.current = setTimeout(() => {
          setSuccessMessageVisibility(false);
        }, 3000);
      } catch (error) {
        console.error(error);
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
        <button type="submit" className={css.button} disabled={formik.isSubmitting}>
          Создать
        </button>
      </form>
    </div>
  );
};
