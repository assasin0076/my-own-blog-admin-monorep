import css from './index.module.scss';
import clsx from 'clsx';

interface FormButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FormButton = ({
  label,
  type = 'button',
  disabled,
  onClick,
  className = '',
}: FormButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(css.button, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
