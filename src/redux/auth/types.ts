import { Action } from "redux";
import { ActionStatus, ResponseData, ResponseError } from "../../types/main";
import AppState, { DatalessState } from "../../types/redux";
import { UserStateData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
const FORGOT_PASSWORD_RESET = "FORGOT_PASSWORD_RESET";
const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";
//const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
const LOGOUT = "LOGOUT";

export {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    //USER_UPDATE_SUCCESS,
    LOGOUT,
}

export interface ForgotPasswordReqData {
    email: string;
}

export interface AuthReducerAdditionalData {
    forgotPassword: DatalessState;
    resetPassword: DatalessState;
    loginCheck: DatalessState;
}

export type AuthReducerState = AppState<UserStateData> & AuthReducerAdditionalData;

export type LoginRequestActionParams = Action<typeof LOGIN_REQUEST>;
export type LoginSuccessActionParams = PayloadedAction<typeof LOGIN_SUCCESS, ResponseData<UserStateData> | null>;
export type LoginFailureActionParams = PayloadedAction<typeof LOGIN_FAILURE, ResponseError | null>;
export type ForgotPasswordRequestActionParams = Action<typeof FORGOT_PASSWORD_REQUEST>;
export type ForgotPasswordSuccessActionParams = PayloadedAction<typeof FORGOT_PASSWORD_SUCCESS, AppState<any> | null>;
export type ForgotPasswordFailureActionParams = PayloadedAction<typeof FORGOT_PASSWORD_FAILURE, ResponseError | null>;
export type ForgotPasswordResetActionParams = Action<typeof FORGOT_PASSWORD_RESET>;
export type ResetPasswordRequestActionParams = Action<typeof RESET_PASSWORD_REQUEST>;
export type ResetPasswordSuccessActionParams = PayloadedAction<typeof RESET_PASSWORD_SUCCESS, AppState<any> | null>;
export type ResetPasswordFailureActionParams = PayloadedAction<typeof RESET_PASSWORD_FAILURE, ResponseError | null>;
//export type UserUpdateSuccessActionParams = PayloadedAction<typeof USER_UPDATE_SUCCESS, ResponseData<UserStateData> | null>;
export type LogoutActionParams = Action<typeof LOGOUT>;
export type AuthActionParams =
    LoginRequestActionParams |
    LoginSuccessActionParams |
    LoginFailureActionParams |
    ForgotPasswordRequestActionParams |
    ForgotPasswordSuccessActionParams |
    ForgotPasswordFailureActionParams |
    ForgotPasswordResetActionParams |
    ResetPasswordRequestActionParams |
    ResetPasswordSuccessActionParams |
    ResetPasswordFailureActionParams | 
    //UserUpdateSuccessActionParams |
    LogoutActionParams
