import { TrpcProvider } from './lib/trpc';
import { StuffListPage } from './pages/StuffListPage';

export const MainPage = () => {
  return (
    <div>
      <h1>Админка</h1>
      <p>Данное приложение позволит регулировать удаленно работу сайта</p>
      <StuffListPage />
    </div>
  );
};

export const App = () => {
  return (
    <TrpcProvider>
      <MainPage />
    </TrpcProvider>
  );
};
