import {axiosInstance} from '../client';
import { IUser, IUsersLocker, IUsersSharedLocker } from '@/types/api/user';

const userAPI = () => ({
  user: (): Promise<IUser> => {
    return axiosInstance.get('/api/user');
  },
  locker: (): Promise<IUsersLocker> => {
    return axiosInstance.get('/api/user/locker');
  },
  sharedLocker: (): Promise<IUsersSharedLocker> => {
    return axiosInstance.get('/api/user/sharedLocker');
  },
});

export default userAPI;
