import { actionCreator, payloadedActionCreator } from "../helpers";
import { UserLoginReqData, UserRegisterReqData } from "../../types/user";
import {
    RegisterActionParams,
    RegisterFailureActionParams,
    RegisterRequestActionParams,
    RegisterSuccessActionParams,
    VerifyEmailRequestActionParams,
    VerifyEmailSuccessActionParams,
    VerifyEmailFailureActionParams,
    ResendVericationEmailRequestActionParams,
    ResendVericationEmailSuccessActionParams,
    ResendVericationEmailFailureActionParams,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    RESEND_VERIFICATION_EMAIL_REQUEST,
    RESEND_VERIFICATION_EMAIL_SUCCESS,
    RESEND_VERIFICATION_EMAIL_FAILURE,
} from "./types"
import { userServices } from "../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, DispatchWithoutAction } from "react";

export const registerRequest = payloadedActionCreator<RegisterRequestActionParams>(REGISTER_REQUEST);

export const registerSuccess = actionCreator<RegisterSuccessActionParams>(REGISTER_SUCCESS);

export const registerFailure = payloadedActionCreator<RegisterFailureActionParams>(REGISTER_FAILURE);

export const verifyEmailRequest = actionCreator<VerifyEmailRequestActionParams>(VERIFY_EMAIL_REQUEST);

export const verifyEmailSuccess = payloadedActionCreator<VerifyEmailSuccessActionParams>(VERIFY_EMAIL_SUCCESS);

export const verifyEmailFailure = payloadedActionCreator<VerifyEmailFailureActionParams>(VERIFY_EMAIL_FAILURE);

export const resendVericationEmailRequest = actionCreator<ResendVericationEmailRequestActionParams>(RESEND_VERIFICATION_EMAIL_REQUEST);

export const resendVericationEmailSuccess = payloadedActionCreator<ResendVericationEmailSuccessActionParams>(RESEND_VERIFICATION_EMAIL_SUCCESS);

export const resendVericationEmailFailure = payloadedActionCreator<ResendVericationEmailFailureActionParams>(RESEND_VERIFICATION_EMAIL_FAILURE);

const register = (data: UserRegisterReqData) => {
    return (dispatch: Dispatch<RegisterActionParams>) => {
        dispatch(registerRequest(data));

        userServices.register(data)
            .then(
                (res: AxiosResponse) => {
                    dispatch(registerSuccess());
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(registerFailure({ error, message }));
                }
            );
    };
}

const verifyEmail = (token: string) => {
    return (dispatch: Dispatch<RegisterActionParams>) => {
        dispatch(verifyEmailRequest());

        userServices.verifyUser(token)
            .then(
                (user: AxiosResponse) => {
                    dispatch(verifyEmailSuccess(user.data.data));
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(verifyEmailFailure({ error, message }));
                }
            );
    };
}

const resendVerificationEmail = (data: UserLoginReqData) => {
    return (dispatch: Dispatch<RegisterActionParams>) => {
        dispatch(resendVericationEmailRequest());

        userServices.resendVerificationEmail(data)
            .then(
                (user: AxiosResponse) => {
                    dispatch(resendVericationEmailSuccess(user.data));
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(resendVericationEmailFailure({ error, message }));
                }
            );
    };
}

export const registerActions = {
    register,
    verifyEmail,
    resendVerificationEmail,
};