import { trpc } from '@frontend/lib/trpc';
import styles from './index.module.scss';
import { StuffSegment } from '@frontend/components/StuffSegment';
import { FormButton } from '@frontend/components/form/FormButton';

export const StuffListPage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getStuffs.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  if (isLoading || isRefetching) {
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
        {data?.pages
          .flatMap((page) => page.stuff)
          .map((stuff) => {
            return (
              <StuffSegment
                key={stuff.label}
                title={stuff.label}
                description={stuff.description}
                tags={stuff.tags}
              />
            );
          })}
        <div className={styles.more}>
          {hasNextPage && !isFetchingNextPage && (
            <FormButton
              label="еще"
              onClick={(e) => {
                e.preventDefault();
                void fetchNextPage();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
