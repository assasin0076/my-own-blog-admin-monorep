import { Loader } from '@frontend/components/Loader';
import css from './index.module.scss';
import clsx from 'clsx';

interface FormButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

export const FormButton = ({
  label,
  type = 'button',
  disabled,
  onClick,
  className = '',
  isLoading = false,
}: FormButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(css.button, className)}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {label}
      {isLoading ? <Loader /> : ''}
    </button>
  );
};
