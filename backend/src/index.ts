import express from 'express';
import { trpcRouter } from '@backend/router';
import cors from 'cors';
import { applyTrpcToExpressApp } from '@backend/lib/trpc';
import { createPrismaContext } from './lib/prisma';
import type { PrismaContext } from './lib/prisma';
import cookieParser from 'cookie-parser';
import { handledEnv } from './lib/handledEnv';

void (async () => {
  let prismaContext: PrismaContext | null = null;
  try {
    prismaContext = createPrismaContext();
    const expressApp = express();
    expressApp.use(
      cors({
        origin: handledEnv.FRONTEND_URL,
        credentials: true,
      })
    );
    expressApp.use(cookieParser());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    applyTrpcToExpressApp(expressApp, prismaContext, trpcRouter);

    expressApp.listen(handledEnv.PORT, () => {
      console.info('Listening at http://localhost:' + handledEnv.PORT);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    await prismaContext?.stop();
  }
})();
