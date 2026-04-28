import z from 'zod';

export const zSignUpInput = z.object({
  nick: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, 'Nick can only contain letters, numbers, and underscores'),
  password: z.string().min(8),
});
