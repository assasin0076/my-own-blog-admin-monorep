import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { FormTextarea } from '@frontend/components/form/FormTextarea';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const NewStuffPage = () => {
  const stateDefaultValues = {
    label: '',
    description: '',
    tags: '',
    repoLink: '',
    viewLink: '',
  };
  const validationSchema = Yup.object({
    label: Yup.string().required('Лейбл пуст'),
    description: Yup.string().required('Описание пусто'),
    tags: Yup.string().required('Теги пусты'),
    repoLink: Yup.string().required('Ссылка на репозиторий пуста'),
  });

  const formik = useFormik({
    initialValues: {
      ...stateDefaultValues,
    },
    validationSchema: validationSchema,
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
