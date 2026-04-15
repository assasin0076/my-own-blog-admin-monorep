import { MainPage } from '@/pages/MainPage';
import { StuffListPage } from '@/pages/StuffListPage';
import { createBrowserRouter } from 'react-router';

const a = 1;

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainPage,
  },
  {
    path: '/stuff',
    Component: StuffListPage,
  },
]);
