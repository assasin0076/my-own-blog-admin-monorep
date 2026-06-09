import { pick } from '@my-own-blog-admin-pannel/shared';
import { type User } from '@prisma/client';

export const toClientMe = (user: User | null) => {
  return user && pick(user, ['id', 'nick', 'permissions']);
};
