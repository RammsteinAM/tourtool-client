import { Action } from "redux";
import { ResponseError } from "../../types/main";
import AppState, { DatalessState } from "../../types/redux";
import { UserLoginReqData, UserRegisterResData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

const VERIFY_EMAIL_REQUEST = "VERIFY_EMAIL_REQUEST";
const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
const VERIFY_EMAIL_FAILURE = "VERIFY_EMAIL_FAILURE";

const RESEND_VERIFICATION_EMAIL_REQUEST = "RESEND_VERIFICATION_EMAIL_REQUEST";
const RESEND_VERIFICATION_EMAIL_SUCCESS = "RESEND_VERIFICATION_EMAIL_SUCCESS";
const RESEND_VERIFICATION_EMAIL_FAILURE = "RESEND_VERIFICATION_EMAIL_FAILURE";

export {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    RESEND_VERIFICATION_EMAIL_REQUEST,
    RESEND_VERIFICATION_EMAIL_SUCCESS,
    RESEND_VERIFICATION_EMAIL_FAILURE,
}

export interface RegisterReducerAdditionalData {
    resendVerificationEmail: DatalessState;
    verifyEmail: AppState<UserRegisterResData>;
}

export type RegisterReducerState = AppState<UserLoginReqData> & RegisterReducerAdditionalData;

export type RegisterRequestActionParams = PayloadedAction<typeof REGISTER_REQUEST, UserLoginReqData | null>;
export type RegisterSuccessActionParams = Action<typeof REGISTER_SUCCESS>;
export type RegisterFailureActionParams = PayloadedAction<typeof REGISTER_FAILURE, ResponseError | null>;
export type VerifyEmailRequestActionParams = Action<typeof VERIFY_EMAIL_REQUEST>;
export type VerifyEmailSuccessActionParams = PayloadedAction<typeof VERIFY_EMAIL_SUCCESS, UserRegisterResData>;
export type VerifyEmailFailureActionParams = PayloadedAction<typeof VERIFY_EMAIL_FAILURE, ResponseError | null>;
export type ResendVericationEmailRequestActionParams = Action<typeof RESEND_VERIFICATION_EMAIL_REQUEST>;
export type ResendVericationEmailSuccessActionParams = PayloadedAction<typeof RESEND_VERIFICATION_EMAIL_SUCCESS, AppState<UserRegisterResData> | null>;
export type ResendVericationEmailFailureActionParams = PayloadedAction<typeof RESEND_VERIFICATION_EMAIL_FAILURE, ResponseError | null>;
export type RegisterActionParams =
    RegisterRequestActionParams |
    RegisterSuccessActionParams |
    RegisterFailureActionParams |
    VerifyEmailRequestActionParams |
    VerifyEmailSuccessActionParams |
    VerifyEmailFailureActionParams |
    ResendVericationEmailRequestActionParams |
    ResendVericationEmailSuccessActionParams |
    ResendVericationEmailFailureActionParams