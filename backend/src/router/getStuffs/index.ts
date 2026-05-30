import { trpcBackend } from '@backend/lib/trpc';
import { zGetStuffsTrpcInput } from './input';

export const getStuffsTrpcRoute = trpcBackend.procedure
  .input(zGetStuffsTrpcInput)
  .query(async ({ ctx, input }) => {
    const stuff = await ctx.prisma.stuff.findMany({
      select: {
        id: true,
        label: true,
        tags: true,
        description: true,
        repoLink: true,
        viewLink: true,
        serialNumber: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          serialNumber: 'desc',
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });
    const nextStuff = stuff[input.limit];
    const nextCursor = nextStuff?.serialNumber;
    const ideasExceptNext = stuff.slice(0, input.limit);
    return { stuff: ideasExceptNext, nextCursor };
  });
