import { axiosInstance } from '../client';

const userAPI = () => ({
    locker: () => {
        return axiosInstance.get('/api/user/locker')
    },
})

export default userAPI;