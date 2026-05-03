import jwt from 'jsonwebtoken';

export const signJwt = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });
};
