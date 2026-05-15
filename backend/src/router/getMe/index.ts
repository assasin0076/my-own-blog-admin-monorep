import { toClientMe } from '@backend/lib/models';
import { trpcBackend } from '@backend/lib/trpc';
import _ from 'lodash';

export const getMeTrpcRoute = trpcBackend.procedure.query(async ({ ctx }) => {
  return { me: toClientMe(ctx.me) ?? null };
});
