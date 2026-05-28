import { zSignUpInput } from '@my-own-blog-admin-pannel/backend/router/signUp/input';
import z from 'zod';

export const zUpdateTrpcProfileInput = zSignUpInput.partial().extend({
  id: z.string(),
});
