import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  JWT_SECRET: z.string().min(1),
  PORT: z
    .string()
    .min(1)
    .transform((value) => parseInt(value, 10)),
  FRONTEND_URL: z.string().min(1),
});

export const handledEnv = envSchema.parse({
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
});
