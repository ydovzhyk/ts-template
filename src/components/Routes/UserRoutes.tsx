import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from '../Loader/Loader';
import PublicRoute from './PublicRoutes';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage'));
const Login = lazy(() => import('../../components/Auth/Login/Login')); // Імпортуйте компонент Login
const Register = lazy(() => import('../../components/Auth/Register/Register')); 
// const CreateTaskPage = lazy(() => import('pages/CreateTaskPage'));

const UserRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/*" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* <Route path="/create-task" element={<CreateTaskPage />} /> */}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
