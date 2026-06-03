import { trpc } from '@frontend/lib/trpc';
import styles from './index.module.scss';
import { StuffSegment } from '@frontend/components/StuffSegment';
import { useEffect, useRef } from 'react';

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

  const flatStuff = data?.pages.flatMap((page) => page.stuff) || [];

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = loaderRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
        {flatStuff.map((stuff) => {
          return (
            <StuffSegment
              key={stuff.label}
              title={stuff.label}
              description={stuff.description}
              tags={stuff.tags}
            />
          );
        })}
        <div ref={loaderRef} />
        {isFetchingNextPage && <p>Загрузка...</p>}
      </div>
    </div>
  );
};
