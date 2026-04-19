import { Outlet } from 'react-router';
import css from './index.module.scss';
import { Sidebar } from '@frontend/components/Sidebar';

export const BaseLayout = () => {
  return (
    <div className={css.layout}>
      <div className={css.sidebar}>
        <Sidebar />
      </div>
      <div className={css.fake} />
      <div className={css.page}>
        <Outlet />
      </div>
    </div>
  );
};
