import css from './index.module.scss';
import { Link } from 'react-router';
import { getStuffRoute } from '@frontend/router/routes.ts';

export const StuffSegment = ({
  title,
  tags,
  description,
  children,
}: {
  title: string;
  tags: string[];
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={css.segment}>
      <h2>
        <Link
          to={{
            pathname: getStuffRoute({ stuffName: title }),
          }}
          className={css.link}
        >
          {title}
        </Link>
      </h2>
      <p>{tags}</p>
      <p>{description}</p>
      {children}
    </div>
  );
};
