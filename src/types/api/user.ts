import { IServerInfoResponse } from ".";
import { ILockerWithUserInfo } from "./locker";

export interface Admin {
    role: string
}
export interface User {
    userId: string;
    nickname: string;
    email: string;
    createdAt: string;
    admin?: Admin[];
}

export interface IUser extends IServerInfoResponse<User> {}
export interface IUsersLocker extends IServerInfoResponse<string, ILockerWithUserInfo[]> {}
export interface IUsersSharedLocker extends IServerInfoResponse<string, ILockerWithUserInfo[]> {}
