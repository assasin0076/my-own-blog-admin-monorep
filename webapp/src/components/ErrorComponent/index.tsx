export const ErrorComponent = ({ title, message }: { title: string; message: string }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};
