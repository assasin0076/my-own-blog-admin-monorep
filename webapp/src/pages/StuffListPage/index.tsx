import { trpc } from '@frontend/lib/trpc';
import styles from './index.module.scss';
import { StuffSegment } from '@frontend/components/StuffSegment';
import { useEffect, useRef } from 'react';
import { FormInput } from '@frontend/components/form/FormInput';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { zGetStuffsTrpcInput } from '@backend/router/getStuffs/input';
import { useDebounce } from '@uidotdev/usehooks';

export const StuffListPage = () => {
  const initialValues = {
    search: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(zGetStuffsTrpcInput.pick({ search: true })),
    onSubmit() {
      return;
    },
  });
  const debouncedSearch = useDebounce(formik.values.search, 300);

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
      search: debouncedSearch,
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

  const defineMapState = () => {
    if (isLoading || isRefetching) return 'loading';
    if (isError) return 'error';
    return 'default';
  };

  const statesMap = {
    error: () => {
      if (isError) return <span>error: {error.message}</span>;
    },
    loading: () => <span>Loading...</span>,
    default: () => (
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
    ),
  };

  return (
    <div className={styles.page}>
      <div>
        <h1>stuff list page</h1>
        <p>Список проектов</p>
      </div>
      <div>
        <FormInput name="search" label="Поиск" formik={formik} />
      </div>
      {statesMap[defineMapState()]()}
    </div>
  );
};
