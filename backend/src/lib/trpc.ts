import { initTRPC } from '@trpc/server';
import type { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import type { TrpcRouter } from '@backend/router';
import type { PrismaContext } from './prisma';
import SuperJSON from 'superjson';
import type { Request, Response } from 'express';
import type { User } from '@prisma/client';
import { verifyJwt } from './decodeJwt';

export type TrpcContext = PrismaContext & {
  req: Request;
  res: Response;
  me: User | null;
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
      createContext: async ({ req, res }) => {
        const token = req.cookies?.token;

        let me = null;

        if (token) {
          try {
            const payload = verifyJwt(token);

            me = await prismaContext.prisma.user.findUnique({
              where: {
                id: payload.userId,
              },
            });
          } catch {
            me = null;
          }
        }

        return {
          ...prismaContext,
          req,
          res,
          me,
        };
      },
    })
  );
};
