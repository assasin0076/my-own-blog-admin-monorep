import { trpcBackend } from '@backend/lib/trpc';
import { zSignUpInput } from './input';
import { getPasswordHash } from '@backend/utils/getPasswordHash';
import { signJwt } from '@backend/utils/signJWT';

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
    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    });

    const token = signJwt(user.id);
    ctx.res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  });
