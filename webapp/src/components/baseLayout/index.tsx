import { Outlet } from 'react-router';
import css from './index.module.scss';
import { Sidebar } from '@frontend/components/Sidebar';
import { Header } from '../Header';

export const BaseLayout = () => {
  return (
    <div className={css.layout}>
      <div className={css.fixed}>
        <Sidebar />
        <Header />
      </div>
      <div />
      <div />
      <div />
      <div className={css.page}>
        <Outlet />
      </div>
    </div>
  );
};
