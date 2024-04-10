import axios from 'axios';
import {API_BASE_URL} from '@env';
import { getSecureToken } from '@/utils/keychain';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
   async config => {
    if(config.url === '/auth/login' || config.url === '/auth/register') {
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