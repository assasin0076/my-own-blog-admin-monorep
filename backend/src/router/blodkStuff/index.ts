import { trpcBackend } from '@backend/lib/trpc';
import { zBlockStuffTrpcInput } from './input';
import { canBlockStuff } from '@backend/lib/can';

export const blockStuffTrpcRoute = trpcBackend.procedure
  .input(zBlockStuffTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { stuffId } = input;

    if (!canBlockStuff(ctx.me)) {
      throw new Error('PERMISSION_DENIED');
    }

    const stuff = await ctx.prisma.stuff.findUnique({
      where: {
        id: stuffId,
      },
    });

    if (!stuff) {
      throw new Error('NOT_FOUND');
    }

    await ctx.prisma.stuff.update({
      where: {
        id: stuffId,
      },
      data: {
        blockedAt: new Date(),
      },
    });

    return true;
  });
