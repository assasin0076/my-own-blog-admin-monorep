import { getStuffsTrpcRoute } from '@backend/router/getStuffs';
import { getStuffTrpcRoute } from '@backend/router/getStuff';
import { trpcBackend } from '@backend/lib/trpc';
import { createStuffTrpcRoute } from './createStuff';
import { signUpRoute } from './signUp';

export const trpcRouter = trpcBackend.router({
  getStuffs: getStuffsTrpcRoute,
  getStuff: getStuffTrpcRoute,
  createStuff: createStuffTrpcRoute,
  signUp: signUpRoute,
});

export type TrpcRouter = typeof trpcRouter;
