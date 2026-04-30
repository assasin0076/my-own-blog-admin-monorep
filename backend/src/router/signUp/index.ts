import { trpcBackend } from '@backend/lib/trpc';
import { zSignUpInput } from './input';
import { getPasswordHash } from '@backend/utils/getPasswordHash';

export const signUpRoute = trpcBackend.procedure
  .input(zSignUpInput)
  .mutation(async ({ ctx, input }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    });

    if (exUser) {
      throw new Error('Пользователь с таким ником уже существует');
    }
    await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    return true;
  });
