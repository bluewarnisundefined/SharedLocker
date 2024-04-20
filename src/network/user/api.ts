import {axiosInstance} from '../client';

const userAPI = () => ({
  locker: () => {
    return axiosInstance.get('/api/user/locker');
  },
  sharedLocker: () => {
    return axiosInstance.get('/api/user/sharedLocker');
  },
});

export default userAPI;
