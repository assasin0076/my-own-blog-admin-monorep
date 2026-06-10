import { ErrorComponent } from '@frontend/components/ErrorComponent';

export const NotFoundPage = ({
  title = 'Ошибка!',
  message = 'Страница с таким урлом не существует',
}: {
  title?: string;
  message?: string;
}) => (
  <>
    <title>404</title>
    <ErrorComponent title={title} message={message} />
  </>
);
