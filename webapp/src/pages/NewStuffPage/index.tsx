import css from './index.module.scss';
import { trpc } from '@frontend/lib/trpc.ts';
import { StuffForm } from '@frontend/components/StuffForm';

export const NewStuffPage = () => {
  const createStuff = trpc.createStuff.useMutation();

  return (
    <div className={css.page}>
      <h1 className={css.header}>Добавление проекта</h1>
      <StuffForm mode="create" onSubmit={createStuff.mutateAsync} />
    </div>
  );
};
