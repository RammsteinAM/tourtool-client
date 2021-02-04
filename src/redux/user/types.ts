import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import AppState from "../../types/redux";
import { UserStateData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";
const USER_RESET = "USER_RESET";
const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
}

export type UserReducerState = AppState<UserStateData>;

export type UpdateRequestActionParams = Action<typeof USER_UPDATE_REQUEST>;
export type UpdateSuccessActionParams = PayloadedAction<typeof USER_UPDATE_SUCCESS, ResponseData | null>;
export type UpdateFailureActionParams = PayloadedAction<typeof USER_UPDATE_FAILURE, ResponseError | null>;
export type UserResetActionParams = Action<typeof USER_RESET>;
export type UserActionParams =
    UpdateRequestActionParams |
    UpdateSuccessActionParams |
    UpdateFailureActionParams |
    UserResetActionParams