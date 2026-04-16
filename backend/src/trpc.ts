import { initTRPC } from '@trpc/server';
import { z } from 'zod';

type Stuff = {
  name: string;
  tags: string[];
  description: string;
};

const stuff: Stuff[] = [
  {
    name: 'Первый проект',
    tags: ['тег1', 'тег2'],
    description:
      'Крупное многострочное описание проекта предполагающее некоторое количество текста',
  },
  {
    name: 'Второй проект',
    tags: ['тег3', 'тег4'],
    description:
      'Крупное многострочное описание проекта предполагающее некоторое количество текста',
  },
  {
    name: 'Третий проект',
    tags: ['тег5', 'тег6'],
    description:
      'Крупное многострочное описание проекта предполагающее некоторое количество текста',
  },
];

const tprc = initTRPC.create();

export const trpcRouter = tprc.router({
  getStuffs: tprc.procedure.query(() => {
    return { stuff };
  }),
  getStuff: tprc.procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      const foundStuff = stuff.find((s) => s.name === input.name);

      if (!foundStuff) {
        throw new Error('Stuff not found');
      }

      return { foundStuff: foundStuff || null };
    }),
});

export type TrpcRouter = typeof trpcRouter;
