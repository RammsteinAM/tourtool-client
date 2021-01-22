import { actionCreator, payloadedActionCreator } from "../helpers";
import { UserGoogleLoginReqData, UserLoginReqData, UserRegisterReqData } from "../../types/user";

import {
    AuthActionParams,
    LoginFailureActionParams,
    LoginRequestActionParams,
    LoginSuccessActionParams,
    ForgotPasswordRequestActionParams,
    ForgotPasswordSuccessActionParams,
    ForgotPasswordFailureActionParams,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    ForgotPasswordReqData,
} from "./types"
import { userServices } from "../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, DispatchWithoutAction } from "react";
import { ForgotPasswordActionParams } from "../forgotPassword/types";

export const loginRequest = actionCreator<LoginRequestActionParams>(LOGIN_REQUEST);

export const loginSuccess = payloadedActionCreator<LoginSuccessActionParams>(LOGIN_SUCCESS);

export const loginFailure = payloadedActionCreator<LoginFailureActionParams>(LOGIN_FAILURE);

export const forgotPasswordRequest = actionCreator<ForgotPasswordRequestActionParams>(FORGOT_PASSWORD_REQUEST);

export const forgotPasswordSuccess = payloadedActionCreator<ForgotPasswordSuccessActionParams>(FORGOT_PASSWORD_SUCCESS);

export const forgotPasswordFailure = payloadedActionCreator<ForgotPasswordFailureActionParams>(FORGOT_PASSWORD_FAILURE);

export const resetPasswordRequest = actionCreator<ForgotPasswordRequestActionParams>(FORGOT_PASSWORD_REQUEST);

export const resetPasswordSuccess = payloadedActionCreator<ForgotPasswordSuccessActionParams>(FORGOT_PASSWORD_SUCCESS);

export const resetPasswordFailure = payloadedActionCreator<ForgotPasswordFailureActionParams>(FORGOT_PASSWORD_FAILURE);

const login = (data: UserLoginReqData) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.login(data)
            .then(
                (user: AxiosResponse) => {
                    dispatch(loginSuccess(user.data));
                    //history.push(from);
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: error.message }));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

const googleLogin = (token: string) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.googleLogin(token)
            .then(
                (user: AxiosResponse) => {
                    dispatch(loginSuccess(user.data));
                    //history.push(from);
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: error.message }));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

const facebookLogin = (token: string) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.facebookLogin(token)
            .then(
                (user: AxiosResponse) => {
                    dispatch(loginSuccess(user.data));
                    //history.push(from);
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: error.message }));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

const forgotPassword = (data: ForgotPasswordReqData) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(forgotPasswordRequest());

        userServices.forgotPassword(data)
            .then(
                (res: AxiosResponse) => {
                    dispatch(forgotPasswordSuccess(res.data));
                    //history.push(from);
                },
                (error: AxiosError) => {
                    dispatch(forgotPasswordFailure({ error: error.message }));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

export const authActions = {
    login,
    googleLogin,
    facebookLogin,
    forgotPassword,
};