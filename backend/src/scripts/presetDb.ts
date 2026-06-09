import type { PrismaContext } from '@backend/lib/prisma';
import { getPasswordHash } from '@backend/utils/getPasswordHash';

export const presetDb = async (ctx: PrismaContext) => {
  await ctx.prisma.user.upsert({
    where: {
      nick: 'admin',
    },
    create: {
      nick: 'admin',
      password: getPasswordHash(process.env.PORT || ''),
      permissions: ['ALL'],
    },
    update: {
      permissions: ['ALL'],
    },
  });
};
