import type { StuffRouteParams } from '@/router/routes';
import { useParams } from 'react-router';

export const StuffPage = () => {
  const { stuffName } = useParams() as StuffRouteParams;

  return (
    <div>
      <div>
        <h1>stuff page</h1>
        <h2>{stuffName}</h2>
      </div>
    </div>
  );
};
