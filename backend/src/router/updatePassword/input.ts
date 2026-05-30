import { trpcBackend } from '@backend/lib/trpc';
import { zUpdatePasswordTrpcInput } from '.';
import { getPasswordHash } from '@backend/utils/getPasswordHash';

export const updatePasswordTrpcRoute = trpcBackend.procedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) throw new Error('Не авторизирован');
    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('Неверный старый пароль');
    }

    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    });

    ctx.me = updatedMe;
    return true;
  });
