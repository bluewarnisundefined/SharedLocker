import { IServerInfoResponse } from ".";

export enum LockerStatus {
    Empty = 'Empty',
    Share_Available = 'Share_Available',
    UnAvailable = 'Unavailable',
    Maintenance = 'Maintenance',
}

export interface ILockerWithUserInfo {
    building: string;
    floorNumber: number;
    lockerNumber: number;
    claimedBy: {
        nickname: string;
    };
    sharedWith: { nickname: string }[];
    status: LockerStatus;
    owned: boolean;
}

// 보관함 신청 관련 배열 타입
export type Buildings = string[];
export type Floors = number[];
export interface LockerWithStatus {
  lockerNumber: number;
  status: LockerStatus;
}

export interface Locker {
  building: string;
  floorNumber: number;
  lockerNumber: number;
}

/**
 * API Response Types
 */
// GET /api/locker/building
export interface ILockerBuildingList extends IServerInfoResponse<string, Buildings> {}
// GET /api/locker/floor
export interface ILockerFloorList extends IServerInfoResponse<string, Floors> {}
// GET /api/lockers
export interface ILockerList extends IServerInfoResponse<string, LockerWithStatus[]> {}
// POST /api/locker
export interface ILocker extends IServerInfoResponse<string, Locker> {}
// POST /api/locker/share
export interface ILockerShare extends IServerInfoResponse<string> {}
// POST /api/locker/request-share
export interface ILockerRequestShare extends IServerInfoResponse<string> {}
// DELETE /api/locker/cancel
export interface ILockerCancel extends IServerInfoResponse<string> {}
