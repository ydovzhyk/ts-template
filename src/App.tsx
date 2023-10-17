import Header from './components/Header/Header';
import UserRoutes from './components/Routes/UserRoutes';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const headerFooterHidden =
    location.pathname === '/auth/login' || location.pathname === '/auth/register';

  return (
    <>
        {!headerFooterHidden && <Header />}
        <UserRoutes />
    </>
  );
}

export default App;