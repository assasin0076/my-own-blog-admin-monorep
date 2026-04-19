import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TrpcProvider } from '@frontend/lib/TrpcProvider.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from '@frontend/router/index.ts';
import '@frontend/styles/global.scss';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <TrpcProvider>
      <RouterProvider router={router} />
    </TrpcProvider>
  </StrictMode>
);
