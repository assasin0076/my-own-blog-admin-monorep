import { trpcBackend } from '@backend/lib/trpc';

export const getStuffsTrpcRoute = trpcBackend.procedure.query(async ({ ctx }) => {
  const stuff = await ctx.prisma.stuff.findMany({
    select: {
      id: true,
      label: true,
      description: true,
      repoLink: true,
      viewLink: true,
    },
  });
  return { stuff };
});
