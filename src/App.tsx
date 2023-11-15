import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import UserRoutes from './components/Routes/UserRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from './hooks/hooks';

import { getCurrentUser } from './Redux/auth/auth-operations';
import { getTechnicalData } from './Redux/technical/technical-operations';

import { getAuthLoading } from './Redux/auth/auth-selectors';
import { getTodoLoading } from './Redux/todo/todo-selectors';
import { getTechnicalLoading } from './Redux/technical/technical-selectors';
import { getAuthError } from './Redux/auth/auth-selectors';
import { getTodoError } from './Redux/todo/todo-selectors';
import { getTechnicalError } from './Redux/technical/technical-selectors';

import { clearUserError } from './Redux/auth/auth-slice';
import { clearTodoError } from './Redux/todo/todo-slice';
import { clearTechnicalDataError } from './Redux/technical/technical-slice';

import Header from './components/Header/Header';
import Loader from './components/Loader';
import ErrorMessage from './components/Shared/ErrorMessage';
import { IAuth } from './components/types/auth/axios-auth';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const headerFooterHidden =
    location.pathname === '/auth/login' || location.pathname === '/auth/register';

  const loading = useSelector((state: RootState) => {
    const authLoading = getAuthLoading(state);
    const todoLoading = getTodoLoading(state);
    const technicalLoading = getTechnicalLoading(state);

    return authLoading || todoLoading || technicalLoading;
  });
  
  const error = useSelector((state: RootState) => {
    const authError = getAuthError(state);
    const todoError = getTodoError(state);
    const technicalError = getTechnicalError(state);

    return authError || todoError || technicalError;
  });

  //get Technicial Data
  useEffect(() => { 
    dispatch(getTechnicalData());
  }, [dispatch])

  //google auth
  useEffect(() => {
    const updateUserInfo = async (userData: IAuth) => {
      await localStorage.setItem('ts-template.authData', JSON.stringify(userData));
      dispatch(getCurrentUser());
    }
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const sid = urlParams.get('sid');

    if (accessToken && refreshToken && sid) {
      const userData: IAuth = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        sid: sid,
      };
      updateUserInfo(userData);
      navigate('/');
    } else {
      return;
    }
  }, [dispatch, navigate]);

  // render last visited page
  useEffect(() => {
    const currentPath = location.pathname;
    const currentPathSearch = location.search;

    const getPageInfo = localStorage.getItem('ts-template-page-info')
    if (getPageInfo) {
      const pageInfo = JSON.parse(getPageInfo);

      if (pageInfo && pageInfo.lastVisitedPage && pageInfo.lastVisitedTime) {
        const currentTime = new Date().getTime();
        const timeDifference =
          (currentTime - parseInt(pageInfo.lastVisitedTime, 10)) / (1000 * 60);
        if (timeDifference > 120) {
          localStorage.removeItem('ts-template-page-info');
          window.location.href = '/';
        }
      }
    } 
    
    if (currentPathSearch && process.env.NODE_ENV === 'development') {
      const pageInfoToUpdate = {
        lastVisitedPage: currentPath + currentPathSearch,
        lastVisitedTime: new Date().getTime().toString(),
      };
      localStorage.setItem(
        'ts-template-page-info',
        JSON.stringify(pageInfoToUpdate)
      );
    }
    if (currentPathSearch && process.env.NODE_ENV === 'production') {
      const pageInfoToUpdate = {
        lastVisitedPage: currentPathSearch,
        lastVisitedTime: new Date().getTime().toString(),
      };
      localStorage.setItem(
        'ts-template-page-info',
        JSON.stringify(pageInfoToUpdate)
      );
    }
    if (!currentPathSearch) {
      const pageInfoToUpdate = {
        lastVisitedPage: currentPath,
        lastVisitedTime: new Date().getTime().toString(),
      };
      localStorage.setItem(
        'ts-template-page-info',
        JSON.stringify(pageInfoToUpdate)
      );
    }
  }, [location.pathname, location.search]);

  const resetError = () => {
    dispatch(clearUserError());
    dispatch(clearTodoError());
    dispatch(clearTechnicalDataError());
    };

  return (
    <>
      {loading && <Loader />}
      {!headerFooterHidden && <Header />}
      <UserRoutes />
      {error && (
        <ErrorMessage text={`${error}`} onDismiss={resetError} />
      )}
    </>
  );
}

export default App;