import jwt from 'jsonwebtoken';
import { handledEnv } from './handledEnv';

export const verifyJwt = (token: string) => {
  return jwt.verify(token, handledEnv.JWT_SECRET) as {
    userId: string;
  };
};
