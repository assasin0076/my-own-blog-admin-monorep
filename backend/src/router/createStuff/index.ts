import { trpcBackend } from '@backend/lib/trpc';
import { zCreateTrpcStuffInput } from '@backend/router/createStuff/input';

export const createStuffTrpcRoute = trpcBackend.procedure
  .input(zCreateTrpcStuffInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('Unauthorized');
    }

    const exStuff = await ctx.prisma.stuff.findUnique({
      where: {
        label: input.label,
      },
    });

    if (exStuff) {
      throw new Error('Проект с таким названием уже существует');
    }
    await ctx.prisma.stuff.create({
      data: { ...input, authorId: ctx.me.id },
    });

    return true;
  });
