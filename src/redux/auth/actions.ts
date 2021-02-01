import { actionCreator, payloadedActionCreator } from "../helpers";
import { UserGoogleLoginReqData, UserLoginCheckResData, UserLoginReqData, UserLoginResData, UserPasswordResetReqData } from "../../types/user";
import Cookies from 'universal-cookie';

import {
    AuthActionParams,
    LoginFailureActionParams,
    LoginRequestActionParams,
    LoginSuccessActionParams,
    // LoginCheckFailureActionParams,
    // LoginCheckRequestActionParams,
    // LoginCheckSuccessActionParams,
    ForgotPasswordRequestActionParams,
    ForgotPasswordSuccessActionParams,
    ForgotPasswordFailureActionParams,
    ResetPasswordRequestActionParams,
    ResetPasswordSuccessActionParams,
    ResetPasswordFailureActionParams,
    LogoutActionParams,
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    // LOGIN_CHECK_REQUEST,
    // LOGIN_CHECK_FAILURE,
    // LOGIN_CHECK_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    FORGOT_PASSWORD_RESET,
    LOGOUT,
    ForgotPasswordReqData,
    ForgotPasswordResetActionParams,
} from "./types"
import { userServices } from "../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, DispatchWithoutAction } from "react";
import { ResponseData } from "../../types/main";

export const loginRequest = actionCreator<LoginRequestActionParams>(LOGIN_REQUEST);

export const loginSuccess = payloadedActionCreator<LoginSuccessActionParams>(LOGIN_SUCCESS);

export const loginFailure = payloadedActionCreator<LoginFailureActionParams>(LOGIN_FAILURE);

export const forgotPasswordRequest = actionCreator<ForgotPasswordRequestActionParams>(FORGOT_PASSWORD_REQUEST);

export const forgotPasswordSuccess = payloadedActionCreator<ForgotPasswordSuccessActionParams>(FORGOT_PASSWORD_SUCCESS);

export const forgotPasswordFailure = payloadedActionCreator<ForgotPasswordFailureActionParams>(FORGOT_PASSWORD_FAILURE);

export const resetPasswordRequest = actionCreator<ResetPasswordRequestActionParams>(RESET_PASSWORD_REQUEST);

export const resetPasswordSuccess = payloadedActionCreator<ResetPasswordSuccessActionParams>(RESET_PASSWORD_SUCCESS);

export const resetPasswordFailure = payloadedActionCreator<ResetPasswordFailureActionParams>(RESET_PASSWORD_FAILURE);

export const forgotPasswordReset = actionCreator<ForgotPasswordResetActionParams>(FORGOT_PASSWORD_RESET);
export const logout = actionCreator<LogoutActionParams>(LOGOUT);

const login = (data: UserLoginReqData) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.login(data)
            .then(
                (res: AxiosResponse<ResponseData<UserLoginResData>>) => {
                    const cookies = new Cookies();
                    cookies.set('x-auth-token', res.data.data!.accessToken);
                    localStorage.setItem('refreshToken', res.data.data!.refreshToken!);
                    dispatch(loginSuccess(res.data));

                    //history.push(from);
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const loginCheck = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.loginCheck({ refreshToken })
            .then(
                (res: AxiosResponse<ResponseData<UserLoginCheckResData>>) => {
                    const cookies = new Cookies();
                    if (res.data.data?.accessToken) {
                        cookies.set('x-auth-token', res.data.data!.accessToken);
                    }
                    dispatch(loginSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: '', message: '' }));
                }
            );
    };
}

const googleLogin = (token: string) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.googleLogin(token)
            .then(
                (res: AxiosResponse<ResponseData<UserLoginResData>>) => {
                    const cookies = new Cookies();
                    cookies.set('x-auth-token', res.data.data!.accessToken);
                    localStorage.setItem('refreshToken', res.data.data!.refreshToken!);
                    dispatch(loginSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const facebookLogin = (token: string) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest());

        userServices.facebookLogin(token)
            .then(
                (res: AxiosResponse<ResponseData<UserLoginResData>>) => {
                    const cookies = new Cookies();
                    cookies.set('x-auth-token', res.data.data!.accessToken);
                    localStorage.setItem('refreshToken', res.data.data!.refreshToken!);
                    dispatch(loginSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(loginFailure({ error: error.name, message: error.message }));
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
                    dispatch(forgotPasswordFailure({ error: error.name, message: error.message }));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

const resetPassword = (data: UserPasswordResetReqData) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(resetPasswordRequest());

        userServices.resetPassword(data)
            .then(
                (res: AxiosResponse) => {
                    dispatch(resetPasswordSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(resetPasswordFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

export const authActions = {
    login,
    loginCheck,
    googleLogin,
    facebookLogin,
    forgotPassword,
    forgotPasswordReset,
    resetPassword,
    logout,
};