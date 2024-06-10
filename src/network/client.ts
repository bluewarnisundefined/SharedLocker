import axios from 'axios';
import {API_BASE_URL} from '@env';
import { getSecureToken, setSecureToken } from '@/utils/keychain';
import authAPI from './auth/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
   async config => {
    const ignore = [
      '/auth/resolve-token', 
      '/auth/login', 
      '/auth/register'
    ];
    
    if (ignore.includes(config.url!)) {
      return config;
    }
    // Get token from storage
    const token = await getSecureToken('accessToken');

    if (!token) {
      return Promise.reject('access token 값이 유효하지 않습니다.');
    }
    
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const config = error?.config;
    const response = error?.response;
    const status = response?.status;

    if (!config || !response || !status) {
      return Promise.reject(error);
    }

    const ignore = ['/auth/token', '/auth/login', '/auth/register'];

    if (ignore.includes(config.url) && status !== 401 || config.sent) {
      return Promise.reject(error);
    }

    config.sent = true;
    const token = await authAPI().refreshToken();
    
    const accessToken = token.data.value?.accessToken;
    const refreshToken = token.data.value?.refreshToken;

    if (accessToken && refreshToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      setSecureToken(accessToken, 'accessToken');
      setSecureToken(refreshToken, 'refreshToken');
    }
    return axiosInstance(config);
  }
)