import { getStuffsTrpcRoute } from '@backend/router/getStuffs';
import { getStuffTrpcRoute } from '@backend/router/getStuff';
import { trpcBackend } from '@backend/lib/trpc';
import { createStuffTrpcRoute } from './createStuff';
import { signUpRoute } from './signUp';
import { signInTrpcRoute } from './signIn';

export const trpcRouter = trpcBackend.router({
  getStuffs: getStuffsTrpcRoute,
  getStuff: getStuffTrpcRoute,
  createStuff: createStuffTrpcRoute,
  signUp: signUpRoute,
  signIn: signInTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
