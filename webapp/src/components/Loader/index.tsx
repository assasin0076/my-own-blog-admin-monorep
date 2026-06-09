import styles from './index.module.scss';

type LoaderProps = {
  size?: number;
};

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <div
      className={styles.loader}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
