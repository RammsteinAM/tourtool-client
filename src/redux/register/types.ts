import { Action } from "redux";
import { ResponseError } from "../../types/main";
import AppState from "../../types/redux";
import { LoginResponse, RegisterResponse, UserRegisterReqData, UserLoginReqData, UserLoginResData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILURE = "REGISTER_FAILURE";

const RESEND_VERIFICATION_EMAIL_REQUEST = "RESEND_VERIFICATION_EMAIL_REQUEST";
const RESEND_VERIFICATION_EMAIL_SUCCESS = "RESEND_VERIFICATION_EMAIL_SUCCESS";
const RESEND_VERIFICATION_EMAIL_FAILURE = "RESEND_VERIFICATION_EMAIL_FAILURE";

export {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    RESEND_VERIFICATION_EMAIL_REQUEST,
    RESEND_VERIFICATION_EMAIL_SUCCESS,
    RESEND_VERIFICATION_EMAIL_FAILURE,
}

// export interface UserState extends AppState {
//     user: UserCreationReqData
// }
export interface RegisterReducerState extends AppState {
    registrationData: UserLoginReqData;
    resendVerificationEmail: AppState;
}

export type RegisterRequestActionParams = PayloadedAction<typeof REGISTER_REQUEST, UserLoginReqData | null>;
export type RegisterSuccessActionParams = Action<typeof REGISTER_SUCCESS>;
export type RegisterFailureActionParams = PayloadedAction<typeof REGISTER_FAILURE, ResponseError | null>;
export type ResendVericationEmailRequestActionParams = Action<typeof RESEND_VERIFICATION_EMAIL_REQUEST>;
export type ResendVericationEmailSuccessActionParams = PayloadedAction<typeof RESEND_VERIFICATION_EMAIL_SUCCESS, RegisterResponse | null>;
export type ResendVericationEmailFailureActionParams = PayloadedAction<typeof RESEND_VERIFICATION_EMAIL_FAILURE, ResponseError | null>;
export type RegisterActionParams =
    RegisterRequestActionParams |
    RegisterSuccessActionParams |
    RegisterFailureActionParams |
    ResendVericationEmailRequestActionParams |
    ResendVericationEmailSuccessActionParams |
    ResendVericationEmailFailureActionParams