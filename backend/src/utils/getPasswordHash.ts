import { handledEnv } from '@backend/lib/handledEnv';
import crypto from 'crypto';

export const getPasswordHash = (password: string) => {
  return crypto.createHash('sha256').update(`${handledEnv.PASSWORD_SALT}${password}`).digest('hex');
};
