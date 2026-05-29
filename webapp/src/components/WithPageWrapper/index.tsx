import { useAppContext, type AppContext } from '@frontend/lib/ctx';
import { getMainRoute } from '@frontend/router/routes';
import { type UseTRPCQuerySuccessResult, type UseTRPCQueryResult } from '@trpc/react-query/shared';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ErrorComponent } from '../ErrorComponent';

class CheckExistError extends Error {}
const checkExistFn = <T,>(value: T, message?: string): NonNullable<T> => {
  if (!value) {
    throw new CheckExistError(message);
  }
  return value;
};

class CheckAccessError extends Error {}
const checkAccessFn = <T,>(value: T, message?: string): void => {
  if (!value) {
    throw new CheckAccessError(message);
  }
};

class GetAuthorizedMeError extends Error {}

type Props = Record<string, any>;
type QueryResult = UseTRPCQueryResult<any, any>;
type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQuerySuccessResult<
  NonNullable<TQueryResult['data']>,
  null
>;
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext;
  queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult> : undefined;
};
type SetPropsProps<TQueryResult extends QueryResult | undefined> = HelperProps<TQueryResult> & {
  checkExists: typeof checkExistFn;
  checkAccess: typeof checkAccessFn;
  getAuthorizedMe: (message?: string) => NonNullable<AppContext>['me'] | never;
};
type PageWrapperProps<TProps extends Props, TQueryResult extends QueryResult | undefined> = {
  redirectAuthorized?: boolean;

  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkAccessTitle?: string;
  checkAccessMessage?: string;

  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => TQueryResult;
  setProps?: (helperProps: SetPropsProps<TQueryResult>) => TProps;

  Page: React.FC<TProps>;
};

const PageWrapper = <
  TProps extends Props = Props,
  TQueryResult extends QueryResult | undefined = undefined,
>({
  authorizedOnly,
  authorizedOnlyTitle = 'Доступ запрещён',
  authorizedOnlyMessage = 'Пожалуйста, авторизуйтесь, чтобы получить доступ к этой странице.',

  redirectAuthorized,
  checkAccess,
  checkAccessTitle = 'Доступ запрещён',
  checkAccessMessage = 'У вас нет прав для доступа к этой странице.',

  checkExists,
  checkExistsTitle = 'Ресурс не найден',
  checkExistsMessage = 'Запрашиваемый ресурс не найден.',

  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate();
  const ctx = useAppContext();
  const queryResult = useQuery?.();

  const redirectNeeded = redirectAuthorized && ctx.me;

  useEffect(() => {
    if (redirectNeeded) {
      navigate(getMainRoute(), { replace: true });
    }
  }, [redirectNeeded, navigate]);

  if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
    return <div>Загрузка...</div>;
  }

  if (queryResult?.isError) {
    return <div>Ошибка загрузки данных: {queryResult.error.message}</div>;
  }

  if (authorizedOnly && !ctx.me) {
    return <ErrorComponent title={authorizedOnlyTitle} message={authorizedOnlyMessage} />;
  }

  const helperProps = { ctx, queryResult: queryResult as never };

  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps);
    if (accessDenied) {
      return <ErrorComponent title={checkAccessTitle} message={checkAccessMessage} />;
    }
  }

  if (checkExists) {
    const notFound = !checkExists(helperProps);
    if (notFound) {
      return <ErrorComponent title={checkExistsTitle} message={checkExistsMessage} />;
    }
  }

  const getAuthorizedMe = (message?: string) => {
    if (!ctx.me) {
      throw new GetAuthorizedMeError(message);
    }
    return ctx.me;
  };

  let props: TProps;
  try {
    props = setProps?.({
      ...helperProps,
      checkExists: checkExistFn,
      checkAccess: checkAccessFn,
      getAuthorizedMe,
    }) as TProps;
  } catch (error) {
    if (error instanceof CheckExistError) {
      return (
        <ErrorComponent title={checkExistsTitle} message={error.message || checkExistsMessage} />
      );
    }
    if (error instanceof CheckAccessError) {
      return (
        <ErrorComponent title={checkAccessTitle} message={error.message || checkAccessMessage} />
      );
    }
    if (error instanceof GetAuthorizedMeError) {
      return (
        <ErrorComponent
          title={authorizedOnlyTitle}
          message={error.message || authorizedOnlyMessage}
        />
      );
    }
    throw error;
  }
  return <Page {...props} />;
};

export const withPageWrapper = <
  TProps extends Props = Props,
  TQueryResult extends QueryResult | undefined = undefined,
>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
    const WrappedPage: React.FC = () => <PageWrapper {...pageWrapperProps} Page={Page} />;

    WrappedPage.displayName = `withPageWrapper(${Page.displayName || Page.name || 'Component'})`;

    return WrappedPage;
  };
};
