import { Action } from "redux";
import ResponseData, { ResponseError } from "../../types/main";
import AppState from "../../types/redux";
import { LoginResponse, UserLoginResData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";
const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
}

export interface ForgotPasswordReqData {
    email: string;
}

export interface AuthReducerState extends AppState {
    user: UserLoginResData;
    forgotPassword: AppState;
    resetPassword: AppState;
}

export type LoginRequestActionParams = Action<typeof LOGIN_REQUEST>;
export type LoginSuccessActionParams = PayloadedAction<typeof LOGIN_SUCCESS, LoginResponse | null>;
export type LoginFailureActionParams = PayloadedAction<typeof LOGIN_FAILURE, ResponseError | null>;
// export type LoginActionParams = LoginRequestActionParams | LoginSuccessActionParams | LoginFailureActionParams;
export type ForgotPasswordRequestActionParams = Action<typeof FORGOT_PASSWORD_REQUEST>;
export type ForgotPasswordSuccessActionParams = PayloadedAction<typeof FORGOT_PASSWORD_SUCCESS, ResponseData | null>;
export type ForgotPasswordFailureActionParams = PayloadedAction<typeof FORGOT_PASSWORD_FAILURE, ResponseError | null>;
export type ResetPasswordRequestActionParams = Action<typeof RESET_PASSWORD_REQUEST>;
export type ResetPasswordSuccessActionParams = PayloadedAction<typeof RESET_PASSWORD_SUCCESS, ResponseData | null>;
export type ResetPasswordFailureActionParams = PayloadedAction<typeof RESET_PASSWORD_FAILURE, ResponseError | null>;
export type AuthActionParams =
    LoginRequestActionParams |
    LoginSuccessActionParams |
    LoginFailureActionParams |
    ForgotPasswordRequestActionParams |
    ForgotPasswordSuccessActionParams |
    ForgotPasswordFailureActionParams |
    ResetPasswordRequestActionParams |
    ResetPasswordSuccessActionParams |
    ResetPasswordFailureActionParams
