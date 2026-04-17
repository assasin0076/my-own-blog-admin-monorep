import { Outlet } from 'react-router';
import styles from './index.module.scss';
import { Sidebar } from '@/components/Sidebar';

export const BaseLayout = () => {
  return (
    <div className={styles['layout-container']}>
      <div className={styles['sidebar-container']}>
        <Sidebar />
      </div>
      <div className={styles['sidebar-fake']} />
      <Outlet />
    </div>
  );
};
