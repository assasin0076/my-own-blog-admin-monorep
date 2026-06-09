import type { User, UserPermissions } from '@prisma/client';

type MaybeUser = Pick<User, 'permissions' | 'id'> | null;

const hasPermission = (user: MaybeUser, permission: UserPermissions) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false;
};

export const canBlockStuff = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_STUFF');
};
