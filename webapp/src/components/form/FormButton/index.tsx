import css from './index.module.scss';

interface FormButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const FormButton = ({ label, type = 'button', disabled }: FormButtonProps) => {
  return (
    <button type={type} className={css.button} disabled={disabled}>
      {label}
    </button>
  );
};
