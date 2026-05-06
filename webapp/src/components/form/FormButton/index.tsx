import css from './index.module.scss';

interface FormButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FormButton = ({ label, type = 'button', disabled, onClick }: FormButtonProps) => {
  return (
    <button type={type} className={css.button} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};
