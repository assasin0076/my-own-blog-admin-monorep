import { trpcBackend } from '@backend/lib/trpc';
import { zSignUpInput } from './input';
import crypto from 'crypto';

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
        password: crypto.createHash('sha256').update(input.password).digest('hex'),
      },
    });

    return true;
  });
