export type Nullable<T> = T | null;

export enum ActionStatus {
    Initial = "",
    Request = "REQUEST",
    Success = "SUCCESS",
    Failure = "FAILURE"
}

export default interface ResponseData<T> {
    status: ActionStatus;
    data?: T;
    error?: string;
    message?: string;
}

export interface ResponseError {
    error: string
}