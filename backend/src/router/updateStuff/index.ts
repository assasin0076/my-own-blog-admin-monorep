import { trpcBackend } from '@backend/lib/trpc';
import { zUpdateTrpcStuffInput } from './input';

export const updateStuffTrpcRoute = trpcBackend.procedure
  .input(zUpdateTrpcStuffInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('Unauthorized');
    }

    const exStuff = await ctx.prisma.stuff.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!exStuff) {
      throw new Error('Проект не найден');
    }

    if (exStuff.authorId !== ctx.me.id) {
      throw new Error('Unauthorized');
    }

    if (exStuff.label !== input.label) {
      const labelUsed = await ctx.prisma.stuff.findUnique({
        where: {
          label: input.label,
        },
      });

      if (labelUsed) {
        throw new Error('Проект с таким названием уже существует');
      }
    }

    await ctx.prisma.stuff.update({
      where: {
        id: input.id,
      },
      data: { ...input },
    });

    return true;
  });
