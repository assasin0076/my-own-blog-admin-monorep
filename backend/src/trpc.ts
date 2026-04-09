import { initTRPC } from '@trpc/server';

const stuff = [
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
  getStuff: tprc.procedure.query(() => {
    return stuff;
  }),
});

export type TrpcRouter = typeof trpcRouter;
