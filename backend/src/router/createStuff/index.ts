import { trpcBackend } from '@backend/lib/trpc';
import { z } from 'zod';
import { stuff } from '@backend/lib/stuff';

export const createStuffTrpcRoute = trpcBackend.procedure
  .input(
    z.object({
      label: z.string().min(1, 'Лейбл пуст'),
      description: z.string().min(1, 'Описание пусто'),
      tags: z.string().min(1, 'Теги пусты'),
      repoLink: z.string().min(1, 'Ссылка на репозиторий пуста'),
      viewLink: z.string().optional(),
    })
  )
  .mutation(({ input }) => {
    const formatedInput = {
      ...input,
      viewLink: input.viewLink ?? 'Не задана',
      tags: input.tags.split('|'),
    };

    stuff.unshift(formatedInput);
    return true;
  });
