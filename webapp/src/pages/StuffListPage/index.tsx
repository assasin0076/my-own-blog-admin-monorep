import { trpc } from '@/lib/trpc';
import { getStuffRoute } from '@/router/routes';
import { Link } from 'react-router';
import styles from './index.module.scss';

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
            <div key={stuff.name} className={styles.item}>
              <h2>
                <Link
                  to={{
                    pathname: getStuffRoute({ stuffName: stuff.name }),
                  }}
                  className={styles.link}
                >
                  {stuff.name}
                </Link>
              </h2>
              <p>{stuff.tags.join(' | ')}</p>
              <p>{stuff.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
