import { trpcBackend } from '@backend/lib/trpc';
import { z } from 'zod';

export const getStuffTrpcRoute = trpcBackend.procedure
  .input(
    z.object({
      label: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const foundStuff = await ctx.prisma.stuff.findUnique({
      where: {
        label: input.label,
      },
    });

    if (!foundStuff) {
      throw new Error('Stuff not found');
    }

    return { foundStuff: foundStuff || null };
  });
