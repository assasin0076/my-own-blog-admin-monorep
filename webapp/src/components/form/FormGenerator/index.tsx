import css from './index.module.scss';
import { FormInput } from '@frontend/components/form/FormInput';
import { useFormik } from 'formik';
import { FormButton } from '@frontend/components/form/FormButton';
import { useTimedMessage } from '@frontend/hooks/useTimedMessage';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import type { JSX } from 'react/jsx-runtime';
import { FormTextarea } from '@frontend/components/form/FormTextarea';
import type z from 'zod';

type Values = Record<string, unknown>;
type FieldTypes = 'input' | 'textarea' | 'select';
type FormField = Readonly<{
  type: FieldTypes;
  value: string;
  label: string;
  name: string;
  options?: { label: string; value: string }[]; // для select
}>;
type formSchema = readonly FormField[];
type FormGeneratorProps<TValues extends Values> = {
  formSchema: formSchema;
  validationSchema: z.ZodType<TValues>;
  onSubmit: (values: TValues) => Promise<unknown>;
  successMessage?: string;
};

export const FormGenerator = <TValues extends Values>({
  formSchema,
  validationSchema,
  onSubmit = async () => {},
  successMessage = 'Успешно выполнено',
}: FormGeneratorProps<TValues>): JSX.Element => {
  const { isVisible: isMessageVisible, show: showMessage, message } = useTimedMessage();
  const {
    isVisible: isErrorMessageVisible,
    message: errorMessage,
    show: showErrorMessage,
  } = useTimedMessage();

  const formik = useFormik<TValues>({
    initialValues: formSchema.reduce((acc, field) => {
      acc[field.name as keyof TValues] = field.value as TValues[keyof TValues];
      return acc;
    }, {} as TValues),

    validationSchema: toFormikValidationSchema(validationSchema),

    onSubmit: async (values) => {
      try {
        await onSubmit(values);
        formik.resetForm();
        showMessage(successMessage);
      } catch (error: Error | string | unknown) {
        let errorMsg = 'Неизвестная ошибка';
        if (typeof error === 'string') {
          errorMsg = error;
        } else if (error instanceof Error) {
          errorMsg = error.message;
        }
        showErrorMessage(`${errorMsg}`);
      }
    },
  });

  const defineField = (field: FormField) => {
    switch (field.type) {
      case 'input':
        return <FormInput key={field.name} label={field.label} name={field.name} formik={formik} />;
      case 'textarea':
        return (
          <FormTextarea key={field.name} label={field.label} name={field.name} formik={formik} />
        );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className={css.form}
    >
      {formSchema.map((field) => defineField(field))}
      {formik.isSubmitting && <div className={css.info}>Отправка формы</div>}
      {isMessageVisible && <div className={css.success}>{message}</div>}
      {isErrorMessageVisible && <div className={css.error}>Произошла ошибка: {errorMessage}</div>}
      <FormButton label="Войти" type="submit" disabled={formik.isSubmitting} />
    </form>
  );
};
