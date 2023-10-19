import axios from 'axios';
import { IUserDataRegister, IUserDataLogin } from '../components/types/auth/auth';
import { IRegistrationResponse, ILoginResponse, ILogoutResponse, IToken, IAuth } from '../components/types/auth/axios-auth';

const REACT_APP_API_URL = 'http://localhost:4000';
// const REACT_APP_API_URL = 'https://easy-shop-backend.herokuapp.com/';

export const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

const token = {
  set(accessToken: IToken) {
    instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    instance.defaults.headers.Authorization = null;
  },
};

async function getAuthDataFromLocalStorage() {
  const dataFromLocalStorage = localStorage.getItem('ts-template.authData');
  if (dataFromLocalStorage) {
    return JSON.parse(dataFromLocalStorage);
  }
  return null;
}

instance.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized') {
      try {
        const authData = await getAuthDataFromLocalStorage();
        if (authData) {
          const { refreshToken, sid } = authData;
          token.set(refreshToken);
          const { data } = await instance.post('/auth/refresh', { sid });
          token.unset();

          const authNewData = {
            accessToken: data.newAccessToken,
            refreshToken: data.newRefreshToken,
            sid: data.sid,
          };

          await localStorage.setItem('ts-template.authData', JSON.stringify(authNewData));
        } else {
          return;
        }

        if (error.config.url === '/auth/current') {
          const authData = await getAuthDataFromLocalStorage();
          if (authData) {
            const { accessToken, refreshToken, sid } = authData;
            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.data = {
              accessToken: accessToken,
              refreshToken: refreshToken,
              sid: sid,
            };
            return instance(originalRequest);
          } else {
            return;
          }
        } else {
          const authData = await getAuthDataFromLocalStorage();
          if (authData) {
            const { accessToken } = authData;
            const originalRequest = error.config;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return instance(originalRequest);
          } else {
            return;
          }
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (error.response.status === 401 && error.response.data.message === 'Refresh end') {
      const authData = {
        accessToken: null,
        refreshToken: null,
        sid: null,
      };
      localStorage.setItem('easy-shop.authData', JSON.stringify(authData));
      return;
    } else {
      return Promise.reject(error);
    }
  }
);

export const axiosRegister = async (userData: IUserDataRegister): Promise<IRegistrationResponse> => {
  const { data }: { data: IRegistrationResponse } = await instance.post('/auth/register', userData);
  return data;
};

export const axiosLogin = async (userData: IUserDataLogin): Promise<ILoginResponse> => {
  const { data }: { data: ILoginResponse} = await instance.post('/auth/login', userData);
  token.set({ accessToken: data.accessToken });
  return data;
};

export const axiosLogout = async (accessToken: IToken): Promise<ILogoutResponse> => {
  token.set(accessToken);
  const { data }: {data: ILogoutResponse} = await instance.post('/auth/logout');
  token.unset();
  return data;
};

export const axiosGetCurrentUser = async (userData: IAuth, accessToken: IToken): Promise<ILoginResponse> => {
  token.set(accessToken);
  const { data }: { data: ILoginResponse } = await instance.post('/auth/current', userData);
  return data;
};