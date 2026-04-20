import css from './index.module.scss';
import * as _ from 'lodash';
import type { FormikProps } from 'formik';

export const FormTextarea = ({
  label,
  name,
  formik,
}: {
  label: string;
  name: string;
  formik: FormikProps<any>;
}) => {
  const inputId = _.uniqueId();

  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name] as boolean;

  return (
    <div className={css.field}>
      <label htmlFor={inputId}>{label}</label>
      <textarea
        onChange={(e) => void formik.setFieldValue(name, e.target.value)}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        className={css.input}
        value={value}
        name={inputId}
        id={inputId}
        disabled={formik.isSubmitting}
      />
      <div className={css.error}>{error && touched ? error : ''}</div>
    </div>
  );
};
