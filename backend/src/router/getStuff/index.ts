import { stuff } from '@backend/lib/stuff';
import { trpcBackend } from '@backend/lib/trpc';
import { z } from 'zod';

export const getStuffTrpcRoute = trpcBackend.procedure
  .input(
    z.object({
      label: z.string(),
    })
  )
  .query(({ input }) => {
    const foundStuff = stuff.find((s) => s.label === input.label);

    if (!foundStuff) {
      throw new Error('Stuff not found');
    }

    return { foundStuff: foundStuff || null };
  });
