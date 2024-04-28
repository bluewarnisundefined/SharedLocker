import { AxiosError, AxiosResponse } from "axios";

export interface IServerInfoResponse<T, V = any> extends AxiosResponse {
    data: {
        success: boolean;
        message: T;
        value?: V;
    }
}

export interface IServerErrorResponse<T> extends AxiosResponse {
    response: {
        data: {
            success: boolean;
            message: T;
        }
    }
}
