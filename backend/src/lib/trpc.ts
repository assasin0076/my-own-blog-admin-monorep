import { initTRPC } from '@trpc/server';
import type { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { TrpcRouter } from '@backend/router';
import type { PrismaContext } from './prisma';

export const trpcBackend = initTRPC.context<PrismaContext>().create();

export const applyTrpcToExpressApp = (
  expressApp: Express,
  prismaContext: PrismaContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => prismaContext,
    })
  );
};
