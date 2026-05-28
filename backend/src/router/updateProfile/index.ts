import { trpcBackend } from '@backend/lib/trpc';
import { zUpdateTrpcProfileInput } from './input';
import { toClientMe } from '@backend/lib/models';

export const updateProfileTrpcRoute = trpcBackend.procedure
  .input(zUpdateTrpcProfileInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('Unauthorized');
    }

    const exUser = await ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!exUser) {
      throw new Error('Пользователь не найден');
    }

    if (exUser.id !== ctx.me.id) {
      throw new Error('Unauthorized');
    }

    if (exUser?.nick !== input?.nick) {
      const nickUsed = await ctx.prisma.stuff.findUnique({
        where: {
          label: input.nick,
        },
      });

      if (nickUsed) {
        throw new Error('Пользователь с таким именем уже существует');
      }
    }

    const updateMe = await ctx.prisma.user.update({
      where: {
        id: input.id,
      },
      data: { ...input },
    });

    ctx.me = updateMe;

    return toClientMe(updateMe);
  });
