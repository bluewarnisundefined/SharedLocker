import {axiosInstance} from '../client';
import {getSecureToken} from '@/utils/keychain';

const authAPI = () => ({
  signIn: (id: string, password: string) => {
    return axiosInstance.post('/auth/login', {
      id,
      password,
    });
  },
  signOut: () => {
    // Authorization 헤더는 요청 인터셉터에서 정의 됨.
    return axiosInstance.post('/auth/logout', null);
  },
  signUp: (id: string, password: string, username: string) => {
    return axiosInstance.post('/auth/register', {
      id,
      password,
      username,
    });
  },
  refreshToken: async () => {
    const token = await getSecureToken('refreshToken');

    if (!token) {
      return Promise.reject('refresh token 값이 유효하지 않습니다.');
    }

    // refresh_token 은 Authorization Header 대신 body 에 추가.
    return await axiosInstance.post('/auth/token', {
      refresh_token: token,
    });
  },
});

export default authAPI;
