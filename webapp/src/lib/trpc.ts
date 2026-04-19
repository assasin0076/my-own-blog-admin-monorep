import { createTRPCReact } from '@trpc/react-query';
import type { TrpcRouter } from '@my-own-blog-admin-pannel/backend/router';

export const trpc = createTRPCReact<TrpcRouter>();
