import { RouterProvider } from 'react-router/dom';
import { TrpcProvider } from './lib/trpc';
import { router } from './router';

export const App = () => {
  return (
    <TrpcProvider>
      <RouterProvider router={router} />
    </TrpcProvider>
  );
};
