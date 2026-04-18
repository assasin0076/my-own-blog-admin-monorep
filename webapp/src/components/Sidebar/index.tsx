import styles from './index.module.scss';
import { Link } from 'react-router';
import { getMainRoute, getStuffListRoute, getStuffNewtRoute } from '@/router/routes.ts';

export const Sidebar = () => {
  return (
    <div className={styles['sidebar']}>
      <div className={styles.label}>Меню</div>
      <div className={styles['sidebar--elements']}>
        <div className={styles['sidebar--element']}>
          <Link to={getMainRoute()} className={styles.link}>
            Главная
          </Link>
        </div>
        <div className={styles['sidebar--element']}>
          <Link to={getStuffListRoute()} className={styles.link}>
            Проекты
          </Link>
        </div>
        <div className={styles['sidebar--element']}>
          <Link to={getStuffNewtRoute()} className={styles.link}>
            Добавить проект
          </Link>
        </div>
      </div>
    </div>
  );
};
