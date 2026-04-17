import { MainPage } from '@/pages/MainPage';
import { StuffListPage } from '@/pages/StuffListPage';
import { StuffPage } from '@/pages/StuffPage';
import { createBrowserRouter } from 'react-router';
import { getMainRoute, getStuffListRoute, getStuffRoute } from './routes';
import { BaseLayout } from '@/components/baseLayout';

export const router = createBrowserRouter([
  {
    Component: BaseLayout,
    children: [
      {
        path: getMainRoute(),
        Component: MainPage,
      },
      {
        path: getStuffListRoute(),
        Component: StuffListPage,
      },
      {
        path: getStuffRoute({ stuffName: ':stuffName' }),
        Component: StuffPage,
      },
    ],
  },
]);
