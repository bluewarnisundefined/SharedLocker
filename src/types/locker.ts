export interface ILockerWithUserInfo {
    building: string,
    floorNumber: number,
    lockerNumber: number,
    claimedBy: {
        username: string
    },
    sharedWith: { username: string }[]
}

// 보관함 신청 관련 배열 타입
export type IBuildings = string[];
export type IFloors = number[];
export type ILockers = number[];

export interface ILocker {
    building: string;
    floorNumber: number;
    lockerNumber: number;
};