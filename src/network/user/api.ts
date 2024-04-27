import {axiosInstance} from '../client';

const userAPI = () => ({
  user: () => {
    return axiosInstance.get('/api/user');
  },
  locker: () => {
    return axiosInstance.get('/api/user/locker');
  },
  sharedLocker: () => {
    return axiosInstance.get('/api/user/sharedLocker');
  },
});

export default userAPI;
