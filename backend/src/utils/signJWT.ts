import { handledEnv } from '@backend/lib/handledEnv';
import jwt from 'jsonwebtoken';

export const signJwt = (userId: string) => {
  return jwt.sign({ userId }, handledEnv.JWT_SECRET, { expiresIn: '7d' });
};
