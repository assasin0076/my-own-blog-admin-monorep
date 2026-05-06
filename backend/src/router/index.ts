import { getStuffsTrpcRoute } from '@backend/router/getStuffs';
import { getStuffTrpcRoute } from '@backend/router/getStuff';
import { trpcBackend } from '@backend/lib/trpc';
import { createStuffTrpcRoute } from './createStuff';
import { signUpRoute } from './signUp';
import { signInTrpcRoute } from './signIn';
import { getMeTrpcRoute } from './getMe';
import { signOutTrpcRoute } from './signOut';

export const trpcRouter = trpcBackend.router({
  getStuffs: getStuffsTrpcRoute,
  getStuff: getStuffTrpcRoute,
  createStuff: createStuffTrpcRoute,
  signUp: signUpRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  signOut: signOutTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
