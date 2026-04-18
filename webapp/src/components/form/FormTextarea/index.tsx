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

  return (
    <div className={css.field}>
      <label htmlFor={inputId}>{label}</label>
      <textarea
        onChange={(e) => void formik.setFieldValue(name, e.target.value)}
        value={value}
        name={inputId}
        id={inputId}
      />
      <div className={css.error}>{error ?? ''}</div>
    </div>
  );
};
