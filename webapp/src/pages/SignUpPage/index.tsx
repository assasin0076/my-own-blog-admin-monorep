import css from './index.module.scss';
import { trpc } from '@frontend/lib/trpc.ts';
import { zSignUpInput } from '@my-own-blog-admin-pannel/backend/router/signUp/input';
import z from 'zod';
import { getStuffListRoute } from '@frontend/router/routes';
import { useNavigate } from 'react-router';
import { FormGenerator } from '@frontend/components/form/FormGenerator';

export const SignUpPage = () => {
  const signUp = trpc.signUp.useMutation();
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const formSchema = [
    { type: 'input', name: 'nick', label: 'nick', value: '' },
    { type: 'input', name: 'password', label: 'password', value: '' },
    { type: 'input', name: 'passwordAgain', label: 'passwordAgain', value: '' },
  ] as const;
  const onSubmit = async (values: z.infer<typeof zSignUpInput>) => {
    await signUp.mutateAsync(values);
    trpcUtils.invalidate();
    navigate(getStuffListRoute());
  };
  const validationSchema = zSignUpInput
    .extend({
      passwordAgain: z.string().min(1),
    })
    .refine((data) => data.password === data.passwordAgain, {
      message: 'Пароли должны совпадать',
      path: ['passwordAgain'],
    });

  return (
    <>
      <title>Регистрация</title>
      <div className={css.page}>
        <h1 className={css.header}>Регистрация</h1>
        <FormGenerator
          formSchema={formSchema}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};
