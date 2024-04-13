export interface ILockerWithUserInfo {
  building: string;
  floorNumber: number;
  lockerNumber: number;
  claimedBy: {
    username: string;
  };
  sharedWith: {username: string}[];
  status: LockerStatus;
}

// 아래 LockerStatus enum은 SharedLocker-Server 의 Locker Schema에 정의된 status 필드의 enum과 동일하게 맞춰줘야 함
export enum LockerStatus {
  Empty = 'Empty',
  Share_Available = 'Share_Available',
  UnAvailable = 'Unavailable',
  Maintenance = 'Maintenance',
}

// 보관함 신청 관련 배열 타입
export type IBuildings = string[];
export type IFloors = number[];
export interface ILockerWithStatus {
  lockerNumber: number;
  status: LockerStatus;
}

export interface ILocker {
  building: string;
  floorNumber: number;
  lockerNumber: number;
}
