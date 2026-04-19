import { stuff } from '@backend/lib/stuff';
import { trpcBackend } from '@backend/lib/trpc';

export const getStuffsTrpcRoute = trpcBackend.procedure.query(() => {
  return { stuff };
});
