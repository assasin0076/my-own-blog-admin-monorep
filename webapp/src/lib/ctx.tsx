import type { inferRouterOutputs } from '@trpc/server';
import type { TrpcRouter } from '@backend/router';
import { createContext, useContext } from 'react';
import { trpc } from './trpc';

type RouterOutputs = inferRouterOutputs<TrpcRouter>;
type GetMeQuery = ReturnType<typeof trpc.getMe.useQuery>;

export type AppContext = {
  me: RouterOutputs['getMe']['me'];
};

const AppReactContext = createContext<AppContext>({
  me: null,
});

const LoadingComponent = () => <p>Loading...</p>;
const ErrorComponent = ({ error }: { error: GetMeQuery['error'] }) => (
  <p>Error: {error?.message}</p>
);
export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <AppReactContext.Provider value={{ me: data?.me ?? null }}>
      {isLoading || isFetching ? <LoadingComponent /> : children}
      {isError && <ErrorComponent error={error} />}
    </AppReactContext.Provider>
  );
};

export const useAppContext = () => useContext(AppReactContext);

export const useMe = () => {
  const { me } = useAppContext();
  return me;
};
