import css from './index.module.scss';
import { trpc } from '@frontend/lib/trpc.ts';
import { zSignInInput } from '@my-own-blog-admin-pannel/backend/router/signIn/input';
import { useNavigate } from 'react-router';
import { getStuffListRoute } from '@frontend/router/routes';
import { FormGenerator } from '@frontend/components/form/FormGenerator';
import type z from 'zod';

export const SignInPage = () => {
  const signIn = trpc.signIn.useMutation();

  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const formSchema = [
    { type: 'input', name: 'nick', label: 'nick', value: '' },
    { type: 'input', name: 'password', label: 'password', value: '' },
  ] as const;

  const onSubmit = async (values: z.infer<typeof zSignInInput>) => {
    await signIn.mutateAsync(values);
    trpcUtils.invalidate();
    navigate(getStuffListRoute());
  };

  return (
    <>
      <title>Авторизация</title>
      <div className={css.page}>
        <h1 className={css.header}>Авторизация</h1>
        <FormGenerator
          formSchema={formSchema}
          validationSchema={zSignInInput}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};
