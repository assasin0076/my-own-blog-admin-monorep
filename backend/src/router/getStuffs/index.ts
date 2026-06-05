import { trpcBackend } from '@backend/lib/trpc';
import { zGetStuffsTrpcInput } from './input';
import { normalizeSpaces } from '@backend/utils/normalizeSpaces';

export const getStuffsTrpcRoute = trpcBackend.procedure
  .input(zGetStuffsTrpcInput)
  .query(async ({ ctx, input }) => {
    const normalizedSearch = input.search ? normalizeSpaces(input.search) : undefined;
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
      where: !input.search
        ? undefined
        : {
            OR: [
              {
                label: {
                  search: normalizedSearch,
                },
                description: {
                  search: normalizedSearch,
                },
              },
            ],
          },
    });
    const nextStuff = stuff[input.limit];
    const nextCursor = nextStuff?.serialNumber;
    const ideasExceptNext = stuff.slice(0, input.limit);
    return { stuff: ideasExceptNext, nextCursor };
  });
