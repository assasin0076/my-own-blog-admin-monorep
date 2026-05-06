import { trpcBackend } from '@backend/lib/trpc';

export const signOutTrpcRoute = trpcBackend.procedure.mutation(({ ctx }) => {
  ctx.res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  });

  return { success: true };
});
