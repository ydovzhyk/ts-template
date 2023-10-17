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

export const axiosRegister = async (userData: IUserDataRegister): Promise<IRegistrationResponse> => {
  console.log('Це інформація на сервер', userData);
  const { data }: { data: IRegistrationResponse } = await instance.post('/auth/register', userData);
  console.log('Відповідь з сервера', data);
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