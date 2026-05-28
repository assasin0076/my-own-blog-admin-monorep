import { MainPage } from '@frontend/pages/MainPage';
import { SignUpPage } from '@frontend/pages/SignUpPage';
import { SignInPage } from '@frontend/pages/SignInPage';
import { StuffListPage } from '@frontend/pages/StuffListPage';
import { StuffPage } from '@frontend/pages/StuffPage';
import { createBrowserRouter } from 'react-router';
import {
  getMainRoute,
  getSignInRoute,
  getSignUpRoute,
  getStuffListRoute,
  getStuffNewtRoute,
  getStuffRoute,
  getProfileRoute,
} from './routes';
import { BaseLayout } from '@frontend/components/baseLayout';
import { NewStuffPage } from '@frontend/pages/NewStuffPage';
import { NotFoundPage } from '@frontend/pages/NotFoundPage';
import { ProfilePage } from '@frontend/pages/ProfilePage';

export const router = createBrowserRouter([
  {
    Component: BaseLayout,
    children: [
      {
        path: getMainRoute(),
        Component: MainPage,
      },
      {
        path: getSignUpRoute(),
        Component: SignUpPage,
      },
      {
        path: getSignInRoute(),
        Component: SignInPage,
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
      {
        path: getProfileRoute(),
        Component: ProfilePage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
