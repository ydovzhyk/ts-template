import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getLogin } from './../../Redux/auth/auth-selectors';
import { getCurrentUser } from '../../Redux/auth/auth-operations'
import { useAppDispatch } from '../../hooks/hooks';

const PublicRoute: React.FC = () => {
  const isLogin = useSelector(getLogin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const getAuthData = localStorage.getItem('ts-template.authData')
      if (getAuthData) {
        const authData = JSON.parse(getAuthData)
        if (!isLogin && authData && authData.accessToken) {
          await dispatch(getCurrentUser());
        } else {
          return;
        }
      } else {
        return;
      }
    };
    fetchData();
  }, [dispatch, isLogin]);

  return <Outlet />;
};

export default PublicRoute;
