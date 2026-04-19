import { trpcBackend } from '@backend/lib/trpc';
import { stuff } from '@backend/lib/stuff';
import { zCreateTrpcStuffInput } from '@backend/router/createStuff/input';

export const createStuffTrpcRoute = trpcBackend.procedure
  .input(zCreateTrpcStuffInput)
  .mutation(({ input }) => {
    const formatedInput = {
      ...input,
      viewLink: input.viewLink ?? 'Не задана',
      tags: input.tags.split('|'),
    };

    stuff.unshift(formatedInput);
    return true;
  });
