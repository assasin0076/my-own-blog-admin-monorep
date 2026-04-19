import { initTRPC } from '@trpc/server';
import type { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { TrpcRouter } from '@backend/router';

export const trpcBackend = initTRPC.create();

export const applyTrpcToExpressApp = (expressApp: Express, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
    })
  );
};
