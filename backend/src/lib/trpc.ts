import { initTRPC } from '@trpc/server';
import type { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { TrpcRouter } from '@backend/router';
import type { PrismaContext } from './prisma';
import SuperJSON from 'superjson';
import type { Request, Response } from 'express';

export type TrpcContext = PrismaContext &
  PrismaContext & {
    req: Request;
    res: Response;
  };

export const trpcBackend = initTRPC.context<TrpcContext>().create({
  transformer: SuperJSON,
});

export const applyTrpcToExpressApp = (
  expressApp: Express,
  prismaContext: PrismaContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: ({ req, res }) => ({
        ...prismaContext,
        req,
        res,
      }),
    })
  );
};
