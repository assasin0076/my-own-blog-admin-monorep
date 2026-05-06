import { trpcBackend } from '@backend/lib/trpc';
import { zSignInInput } from './input';
import { getPasswordHash } from '@backend/utils/getPasswordHash';
import { signJwt } from '@backend/utils/signJWT';

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

    const token = signJwt(user.id);
    ctx.res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { token };
  });
