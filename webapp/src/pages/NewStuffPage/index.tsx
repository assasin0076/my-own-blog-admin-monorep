import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { FormTextarea } from '@frontend/components/form/FormTextarea';
import { useFormik } from 'formik';
import { z } from 'zod';
import { trpc } from '@frontend/lib/trpc.ts';

export const NewStuffPage = () => {
  const createStuff = trpc.createStuff.useMutation();

  const schema = z.object({
    label: z.string().min(1, 'Лейбл пуст'),
    description: z.string().min(1, 'Описание пусто'),
    tags: z.string().min(1, 'Теги пусты'),
    repoLink: z.string().min(1, 'Ссылка на репозиторий пуста'),
    viewLink: z.string().optional(),
  });

  const initialValues = {
    label: '',
    description: '',
    tags: '',
    repoLink: '',
    viewLink: '',
  };

  const formik = useFormik({
    initialValues,

    validate: (values) => {
      const result = schema.safeParse(values);

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
      await createStuff.mutateAsync(values);
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
        <button type="submit" className={css.button}>
          Создать
        </button>
      </form>
    </div>
  );
};
