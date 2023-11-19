import { axiosInstance } from '../client';

const lockerAPI = () => ({
    buildings: () => {
        return axiosInstance.get('/api/locker/building')
    },
    floors: (buildingName: string) => {
        return axiosInstance.get('/api/locker/floor', {
            params: { buildingName }
        })
    },
    lockers: (buildingName: string, floor: number) => {
        return axiosInstance.get('/api/lockers', {
            params: { buildingName, floor }
        })
    },
    claimLockers: (buildingName: string, floorNumber: number, lockerNumber: number) => {
        return axiosInstance.post('/api/lockers', { buildingName, floorNumber, lockerNumber })
    },
    shareLocker: (share: {buildingName: string, floorNumber: number, lockerNumber: number, sharedWith: string}) => {
        return axiosInstance.post('/api/lockers/share', { 
            buildingName: share.buildingName, 
            floorNumber: share.floorNumber, 
            lockerNumber: share.lockerNumber, 
            sharedWith: share.sharedWith
        })
    }
})

export default lockerAPI;