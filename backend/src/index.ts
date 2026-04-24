import express from 'express';
import { trpcRouter } from '@backend/router';
import cors from 'cors';
import { applyTrpcToExpressApp } from '@backend/lib/trpc';
import { createPrismaContext } from './lib/prisma';
import type { PrismaContext } from './lib/prisma';

void (async () => {
  let prismaContext: PrismaContext | null = null;
  try {
    prismaContext = createPrismaContext();
    const expressApp = express();
    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    applyTrpcToExpressApp(expressApp, prismaContext, trpcRouter);

    expressApp.listen(3000, () => {
      console.info('Listening at http://localhost:3000');
    });
  } catch (error) {
    console.error('Error starting server:', error);
    await prismaContext?.stop();
  }
})();
