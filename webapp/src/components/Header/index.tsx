import { Link } from 'react-router';
import styles from './index.module.scss';

export const Header = () => {
  return (
    <div className={styles['header']}>
      <div className={styles['nav']}>
        <Link to="/signup" className={styles['link']}>
          Регистрация
        </Link>
        <Link to="/signin" className={styles['link']}>
          Авторизация
        </Link>
      </div>
    </div>
  );
};
