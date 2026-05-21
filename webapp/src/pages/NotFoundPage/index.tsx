import { ErrorComponent } from '@frontend/components/ErrorComponent';

export const NotFoundPage = ({
  title = 'Ошибка!',
  message = 'Страница с таким урлом не существует',
}: {
  title?: string;
  message?: string;
}) => <ErrorComponent title={title} message={message} />;
