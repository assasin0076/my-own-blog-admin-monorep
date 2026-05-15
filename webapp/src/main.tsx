import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TrpcProvider } from '@frontend/lib/TrpcProvider.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from '@frontend/router/index.ts';
import '@frontend/styles/global.scss';
import { AppContextProvider } from './lib/ctx';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <TrpcProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </TrpcProvider>
  </StrictMode>
);
