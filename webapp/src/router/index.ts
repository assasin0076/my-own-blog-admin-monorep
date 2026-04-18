import { MainPage } from '@/pages/MainPage';
import { StuffListPage } from '@/pages/StuffListPage';
import { StuffPage } from '@/pages/StuffPage';
import { createBrowserRouter } from 'react-router';
import { getMainRoute, getStuffListRoute, getStuffNewtRoute, getStuffRoute } from './routes';
import { BaseLayout } from '@/components/baseLayout';
import { NewStuffPage } from '@/pages/NewStuffPage';

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
        path: getStuffNewtRoute(),
        Component: NewStuffPage,
      },
      {
        path: getStuffRoute({ stuffName: ':stuffName' }),
        Component: StuffPage,
      },
    ],
  },
]);
