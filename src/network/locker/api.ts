import {axiosInstance} from '../client';

const lockerAPI = () => ({
  buildings: () => {
    return axiosInstance.get('/api/locker/building');
  },
  floors: (buildingName: string) => {
    return axiosInstance.get('/api/locker/floor', {
      params: {buildingName},
    });
  },
  lockers: (buildingName: string, floor: number) => {
    return axiosInstance.get('/api/lockers', {
      params: {buildingName, floor},
    });
  },
  claimLockers: (
    buildingName: string,
    floorNumber: number,
    lockerNumber: number,
  ) => {
    return axiosInstance.post('/api/locker', {
      buildingName,
      floorNumber,
      lockerNumber,
    });
  },
  shareLocker: (
    buildingName: string,
    floorNumber: number,
    lockerNumber: number,
    sharedWith: string,
  ) => {
    return axiosInstance.post('/api/locker/share', {
      buildingName: buildingName,
      floorNumber: floorNumber,
      lockerNumber: lockerNumber,
      sharedWith: sharedWith,
    });
  },
  requestShareLocker: (
    buildingName: string,
    floorNumber: number,
    lockerNumber: number,
  ) => {
    return axiosInstance.post('/api/locker/request-share', {
      buildingName,
      floorNumber,
      lockerNumber,
    });
  },
});

export default lockerAPI;
