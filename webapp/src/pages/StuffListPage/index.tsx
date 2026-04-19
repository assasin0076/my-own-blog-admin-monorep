import { trpc } from '@frontend/lib/trpc';
import styles from './index.module.scss';
import { StuffSegment } from '@frontend/components/StuffSegment';

export const StuffListPage = () => {
  const { data, error, isLoading, isError } = trpc.getStuffs.useQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>error: {error.message}</span>;
  }

  return (
    <div className={styles.page}>
      <div>
        <h1>stuff list page</h1>
        <p>Список проектов</p>
      </div>
      <div className={styles.list}>
        {data?.stuff.map((stuff) => {
          return (
            <StuffSegment
              key={stuff.name}
              title={stuff.name}
              description={stuff.description}
              tags={stuff.tags}
            />
          );
        })}
      </div>
    </div>
  );
};
