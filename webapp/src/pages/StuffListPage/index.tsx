import { trpc } from '@/lib/trpc';

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
        <h1>stuff page</h1>
        <p>Список проектов</p>
      </div>
      <div>
        {data?.stuff.map((stuff) => {
          return (
            <div key={stuff.name}>
              <h2>{stuff.name}</h2>
              <p>{stuff.tags.join(' | ')}</p>
              <p>{stuff.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
