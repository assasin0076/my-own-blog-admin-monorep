import { getStuffsTrpcRoute } from '@backend/router/getStuffs';
import { getStuffTrpcRoute } from '@backend/router/getStuff';
import { trpcBackend } from '@backend//lib/trpc';

export const trpcRouter = trpcBackend.router({
  getStuffs: getStuffsTrpcRoute,
  getStuff: getStuffTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
