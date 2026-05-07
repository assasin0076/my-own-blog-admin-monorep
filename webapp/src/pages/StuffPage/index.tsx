import { trpc } from '@frontend/lib/trpc';
import type { StuffRouteParams } from '@frontend/router/routes';
import { format } from 'date-fns';
import { useParams } from 'react-router';

export const StuffPage = () => {
  const { stuffName } = useParams() as StuffRouteParams;

  const { data, error, isLoading, isError } = trpc.getStuff.useQuery({
    label: stuffName,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>error: {error.message}</span>;
  }

  if (data?.foundStuff === null) {
    return <span>Stuff not found</span>;
  }

  return (
    <div>
      <div>
        <h1>stuff page</h1>
        <div key={data?.foundStuff?.label}>
          <h2>{data?.foundStuff?.label}</h2>
          <p>
            created at:{' '}
            {data?.foundStuff?.createdAt
              ? format(data?.foundStuff?.createdAt, 'MM/dd/yyyy')
              : 'нет даты'}
          </p>
          <p>{data?.foundStuff?.tags}</p>
          <p>{data?.foundStuff?.description}</p>
          <hr />
          <p>author: {data?.foundStuff?.author?.nick}</p>
        </div>
      </div>
    </div>
  );
};
