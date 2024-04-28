import { ILockerBuildingList, ILockerFloorList, ILocker, ILockerCancel, ILockerList, ILockerRequestShare, ILockerShare } from '@/types/api/locker';
import {axiosInstance} from '../client';

const lockerAPI = () => ({
  buildings: (): Promise<ILockerBuildingList> => {
    return axiosInstance.get('/api/locker/building');
  },
  floors: (buildingName: string): Promise<ILockerFloorList> => {
    return axiosInstance.get('/api/locker/floor', {
      params: {buildingName},
    });
  },
  lockers: (buildingName: string, floor: number): Promise<ILockerList> => {
    return axiosInstance.get('/api/lockers', {
      params: {buildingName, floor},
    });
  },
  claimLockers: (
    buildingName: string,
    floorNumber: number,
    lockerNumber: number,
  ): Promise<ILocker> => {
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
  ): Promise<ILockerShare> => {
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
  ): Promise<ILockerRequestShare> => {
    return axiosInstance.post('/api/locker/request-share', {
      buildingName,
      floorNumber,
      lockerNumber,
    });
  },
  cancelLocker: (
    buildingName: string,
    floorNumber: number,
    lockerNumber: number,
    isOwner: boolean,
  ): Promise<ILockerCancel> => {
    return axiosInstance.delete('/api/locker/cancel', {
      data: {
        buildingName,
        floorNumber,
        lockerNumber,
        isOwner
      },
    });
  }
});

export default lockerAPI;
