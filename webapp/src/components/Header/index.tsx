import { Link, useNavigate } from 'react-router';
import styles from './index.module.scss';
import { trpc } from '@frontend/lib/trpc';
import { FormButton } from '../form/FormButton';
import { useMe } from '@frontend/lib/ctx';

export const Header = () => {
  const me = useMe();
  const navigate = useNavigate();
  const tprcUtils = trpc.useUtils();

  const logout = trpc.signOut.useMutation({
    onSuccess: async () => {
      await tprcUtils.invalidate();
      navigate('/signin');
    },
  });

  return (
    <div className={styles['header']}>
      <div className={styles['nav']}>
        {me ? (
          <>
            <span className={styles['welcome']}>Добро пожаловать, {me.nick}!</span>
            <FormButton onClick={() => logout.mutate()} label="Выйти" />
          </>
        ) : (
          <>
            <Link to="/signup" className={styles['link']}>
              Регистрация
            </Link>
            <Link to="/signin" className={styles['link']}>
              Авторизация
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
