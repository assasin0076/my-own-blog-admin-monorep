import z from 'zod';
import { zCreateTrpcStuffInput } from '../createStuff/input';

export const zUpdateTrpcStuffInput = zCreateTrpcStuffInput.extend({
  id: z.string(),
});
