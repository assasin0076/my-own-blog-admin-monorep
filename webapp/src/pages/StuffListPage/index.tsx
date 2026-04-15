import { trpc } from '@/lib/trpc';
import { getStuffRoute } from '@/router/routes';
import { Link } from 'react-router';

export const StuffListPage = () => {
  const { data, error, isLoading, isError } = trpc.getStuff.useQuery();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>error: {error.message}</span>;
  }

  return (
    <div>
      <div>
        <h1>stuff list page</h1>
        <p>Список проектов</p>
      </div>
      <div>
        {data?.stuff.map((stuff) => {
          return (
            <div key={stuff.name}>
              <h2>
                <Link
                  to={{
                    pathname: getStuffRoute({ stuffName: stuff.name }),
                  }}
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
