import { z } from 'zod';

export const zCreateTrpcStuffInput = z.object({
  label: z.string().min(1, 'Лейбл пуст'),
  description: z.string().min(1, 'Описание пусто'),
  tags: z.string().min(1, 'Теги пусты'),
  repoLink: z.string().min(1, 'Ссылка на репозиторий пуста'),
  viewLink: z.string().optional(),
});
