import { actionCreator, payloadedActionCreator } from "../helpers";
import { RegisterResponse, UserGoogleLoginReqData, UserLoginReqData, UserRegisterReqData } from "../../types/user";
import {
    RegisterActionParams,
    RegisterFailureActionParams,
    RegisterRequestActionParams,
    RegisterSuccessActionParams,
    ResendVericationEmailRequestActionParams,
    ResendVericationEmailSuccessActionParams,
    ResendVericationEmailFailureActionParams,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
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

export const resendVericationEmailRequest = actionCreator<ResendVericationEmailRequestActionParams>(RESEND_VERIFICATION_EMAIL_REQUEST);

export const resendVericationEmailSuccess = payloadedActionCreator<ResendVericationEmailSuccessActionParams>(RESEND_VERIFICATION_EMAIL_SUCCESS);

export const resendVericationEmailFailure = payloadedActionCreator<ResendVericationEmailFailureActionParams>(RESEND_VERIFICATION_EMAIL_FAILURE);

const register = (data: UserRegisterReqData) => {
    return (dispatch: Dispatch<RegisterActionParams>) => {
        dispatch(registerRequest(data));

        userServices.register(data)
            .then(
                (res: AxiosResponse<RegisterResponse>) => {
                    dispatch(registerSuccess());
                },
                (error: AxiosError) => {
                    dispatch(registerFailure({ error: error.message }));
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
                (error: AxiosError) => {
                    dispatch(resendVericationEmailFailure({ error: error.message }));
                }
            );
    };
}

export const registerActions = {
    register,
    resendVerificationEmail,
};