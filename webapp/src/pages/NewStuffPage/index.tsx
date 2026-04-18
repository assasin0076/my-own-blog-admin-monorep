import css from './index.module.scss';
import { FormInput } from '@/components/form/FormInput';
import { FormTextarea } from '@/components/form/FormTextarea';
import { useFormik } from 'formik';

export const NewStuffPage = () => {
  const stateDefaultValues = {
    label: '',
    description: '',
    tags: '',
    repoLink: '',
    viewLink: '',
  };
  const formik = useFormik({
    initialValues: {
      ...stateDefaultValues,
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};

      if (!values.label) {
        errors.label = 'Лейбл пуст';
      }
      if (!values.description) {
        errors.description = 'Описание пусто';
      }
      if (!values.tags) {
        errors.tags = 'Теги пусты';
      }
      if (!values.repoLink) {
        errors.repoLink = 'Ссылка на репозиторий пуста';
      }

      return errors;
    },
    onSubmit: (values) => {
      console.info('Submitted', values);
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
