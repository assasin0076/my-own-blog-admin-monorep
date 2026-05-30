import z from 'zod';

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});
