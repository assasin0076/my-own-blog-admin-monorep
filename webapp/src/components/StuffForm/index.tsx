import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { FormTextarea } from '@frontend/components/form/FormTextarea';
import { useFormik } from 'formik';
import { zCreateTrpcStuffInput } from '@my-own-blog-admin-pannel/backend/router/createStuff/input';
import { useTimedMessage } from '@frontend/hooks/useTimedMessage';
import { FormButton } from '@frontend/components/form/FormButton';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const initialValuesBase = {
  label: '',
  description: '',
  tags: '',
  repoLink: '',
  viewLink: '',
};
export type StuffFormValues = {
  label: string;
  description: string;
  tags: string;
  repoLink: string;
  viewLink: string | undefined | null;
};
type StuffFormProps = {
  onSubmit: (values: StuffFormValues) => Promise<boolean>;
  mode: 'edit' | 'create';
  initialValues?: StuffFormValues;
};
export const StuffForm = ({
  onSubmit,
  mode,
  initialValues = initialValuesBase,
}: StuffFormProps) => {
  const { isVisible: isMessageVisible, show: showMessage, message } = useTimedMessage();
  const {
    isVisible: isErrorMessageVisible,
    message: errorMessage,
    show: showErrorMessage,
  } = useTimedMessage();

  const formik = useFormik({
    initialValues,

    validationSchema: toFormikValidationSchema(zCreateTrpcStuffInput),

    onSubmit: async (values) => {
      try {
        await onSubmit(values);
        formik.resetForm();
        showMessage(mode === 'create' ? 'Успешно создано' : 'Успешно обновлено');
      } catch (error) {
        if (typeof error !== 'string') return;
        showErrorMessage(`Произошла ошибка: ${error}`);
      }
    },
  });

  return (
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
      {isMessageVisible && <div className={css.success}>{message}</div>}
      {isErrorMessageVisible && <div className={css.error}>Произошла ошибка: {errorMessage}</div>}
      <FormButton
        label={mode === 'create' ? 'Создать' : 'Обновить'}
        type="submit"
        disabled={formik.isSubmitting}
      />
    </form>
  );
};
