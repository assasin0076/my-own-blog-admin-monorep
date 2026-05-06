import { trpcBackend } from '@backend/lib/trpc';
import _ from 'lodash';

export const getMeTrpcRoute = trpcBackend.procedure.query(async ({ ctx }) => {
  return { me: ctx.me && _.pick(ctx.me, ['id', 'nick']) };
});
