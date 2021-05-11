import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import AppState, { DatalessState } from "../../types/redux";
import { UserStateData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";
const USER_REQUEST_DELETE_REQUEST = "USER_REQUEST_DELETE_REQUEST";
const USER_REQUEST_DELETE_SUCCESS = "USER_REQUEST_DELETE_SUCCESS";
const USER_REQUEST_DELETE_FAILURE = "USER_REQUEST_DELETE_FAILURE";
const USER_REQUEST_DELETE_RESET = "USER_REQUEST_DELETE_RESET";
const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";
const USER_DELETE_RESET = "USER_DELETE_RESET";
const USER_RESET = "USER_RESET";
const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_REQUEST_DELETE_REQUEST,
    USER_REQUEST_DELETE_SUCCESS,
    USER_REQUEST_DELETE_FAILURE,
    USER_REQUEST_DELETE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,
    USER_DELETE_RESET,
    USER_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
}

export interface UserReducerState {
    update: AppState<UserStateData>,
    delete: DatalessState,
    requestDelete: DatalessState,
}

export type UpdateRequestActionParams = Action<typeof USER_UPDATE_REQUEST>;
export type UpdateSuccessActionParams = PayloadedAction<typeof USER_UPDATE_SUCCESS, ResponseData | null>;
export type UpdateFailureActionParams = PayloadedAction<typeof USER_UPDATE_FAILURE, ResponseError | null>;
export type RequestDeleteRequestActionParams = Action<typeof USER_REQUEST_DELETE_REQUEST>;
export type RequestDeleteSuccessActionParams = PayloadedAction<typeof USER_REQUEST_DELETE_SUCCESS, ResponseData | null>;
export type RequestDeleteFailureActionParams = PayloadedAction<typeof USER_REQUEST_DELETE_FAILURE, ResponseError | null>;
export type RequestDeleteResetActionParams = Action<typeof USER_REQUEST_DELETE_RESET>;
export type DeleteRequestActionParams = Action<typeof USER_DELETE_REQUEST>;
export type DeleteSuccessActionParams = Action<typeof USER_DELETE_SUCCESS>;
export type DeleteFailureActionParams = PayloadedAction<typeof USER_DELETE_FAILURE, ResponseError | null>;
export type UserResetActionParams = Action<typeof USER_RESET>;
export type UserDeleteResetActionParams = Action<typeof USER_DELETE_RESET>;
export type UserActionParams =
    UpdateRequestActionParams |
    UpdateSuccessActionParams |
    UpdateFailureActionParams |
    RequestDeleteRequestActionParams |
    RequestDeleteSuccessActionParams |
    RequestDeleteFailureActionParams |
    RequestDeleteResetActionParams |
    DeleteRequestActionParams |
    DeleteSuccessActionParams |
    DeleteFailureActionParams |
    UserDeleteResetActionParams |
    UserResetActionParams