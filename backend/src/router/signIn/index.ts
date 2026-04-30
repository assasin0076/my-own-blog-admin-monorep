import { trpcBackend } from '@backend/lib/trpc';
import { zSignInInput } from './input';
import { getPasswordHash } from '@backend/utils/getPasswordHash';

export const signInTrpcRoute = trpcBackend.procedure
  .input(zSignInInput)
  .mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    if (!user) {
      throw 'Пользователь с таким ником не найден';
    }

    return true;
  });
