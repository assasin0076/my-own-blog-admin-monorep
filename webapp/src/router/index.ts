import { MainPage } from '@frontend/pages/MainPage';
import { StuffListPage } from '@frontend/pages/StuffListPage';
import { StuffPage } from '@frontend/pages/StuffPage';
import { createBrowserRouter } from 'react-router';
import { getMainRoute, getStuffListRoute, getStuffNewtRoute, getStuffRoute } from './routes';
import { BaseLayout } from '@frontend/components/baseLayout';
import { NewStuffPage } from '@frontend/pages/NewStuffPage';

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
