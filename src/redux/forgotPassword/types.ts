import { Action } from "redux";
import ResponseData, { ResponseError } from "../../types/main";
import AppState from "../../types/redux";
import { PayloadedAction } from "../helpers";

const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
}

export interface ForgotPasswordReqData {
    email: string;
}

export interface ForgotPasswordState extends AppState {
    forgotPassword: ForgotPasswordReqData
}

export type ForgotPasswordRequestActionParams = Action<typeof FORGOT_PASSWORD_REQUEST>;
export type ForgotPasswordSuccessActionParams = PayloadedAction<typeof FORGOT_PASSWORD_SUCCESS, ResponseData | null>;
export type ForgotPasswordFailureActionParams = PayloadedAction<typeof FORGOT_PASSWORD_FAILURE, ResponseError | null>;
export type ForgotPasswordActionParams = ForgotPasswordRequestActionParams | ForgotPasswordSuccessActionParams | ForgotPasswordFailureActionParams;