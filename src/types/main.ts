export type Nullable<T> = T | null;

export enum ActionStatus {
    Initial = "",
    Request = "REQUEST",
    Success = "SUCCESS",
    Failure = "FAILURE"
}

export interface ResponseData<T = any> {
    success: string;
    data?: T;
    error?: string;
    message?: string
}

export interface ResponseError {
    error: string
    message: string
}