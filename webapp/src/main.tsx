import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TrpcProvider } from '@/lib/trpc.tsx';
import { RouterProvider } from 'react-router/dom';
import { router } from '@/router/index.ts';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <TrpcProvider>
      <RouterProvider router={router} />
    </TrpcProvider>
  </StrictMode>
);
