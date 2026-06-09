import z from 'zod';

export const zBlockStuffTrpcInput = z.object({
  stuffId: z.string().min(1),
});
