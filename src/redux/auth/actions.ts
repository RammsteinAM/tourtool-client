import { actionCreator, payloadedActionCreator } from "../helpers";
import { UserGoogleLoginReqData, UserLoginCheckResData, UserLoginReqData, UserLoginResData, UserPasswordResetReqData } from "../../types/user";
import Cookies from 'universal-cookie';

import {
    AuthActionParams,
    LoginFailureActionParams,
    LoginRequestActionParams,
    LoginSuccessActionParams,
    ForgotPasswordRequestActionParams,
    ForgotPasswordSuccessActionParams,
    ForgotPasswordFailureActionParams,
    ResetPasswordRequestActionParams,
    ResetPasswordSuccessActionParams,
    ResetPasswordFailureActionParams,
    UserUpdateSuccessActionParams,
    LogoutActionParams,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_RESET,
    CONNECTED,
    DISCONNECTED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    FORGOT_PASSWORD_RESET,
    USER_UPDATE_SUCCESS,
    LOGOUT,
    ForgotPasswordReqData,
    ForgotPasswordResetActionParams,
    LoginResetActionParams,
    ConnectedActionParams,
    DisconnectedActionParams
} from "./types"
import { userServices } from "../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, DispatchWithoutAction } from "react";
import { ResponseData } from "../../types/main";

export const loginRequest = payloadedActionCreator<LoginRequestActionParams>(LOGIN_REQUEST);

export const loginSuccess = payloadedActionCreator<LoginSuccessActionParams>(LOGIN_SUCCESS);

export const loginFailure = payloadedActionCreator<LoginFailureActionParams>(LOGIN_FAILURE);

export const loginReset = actionCreator<LoginResetActionParams>(LOGIN_RESET);

export const connected = actionCreator<ConnectedActionParams>(CONNECTED);

export const disconnected = actionCreator<DisconnectedActionParams>(DISCONNECTED);

export const forgotPasswordRequest = actionCreator<ForgotPasswordRequestActionParams>(FORGOT_PASSWORD_REQUEST);

export const forgotPasswordSuccess = payloadedActionCreator<ForgotPasswordSuccessActionParams>(FORGOT_PASSWORD_SUCCESS);

export const forgotPasswordFailure = payloadedActionCreator<ForgotPasswordFailureActionParams>(FORGOT_PASSWORD_FAILURE);

export const resetPasswordRequest = actionCreator<ResetPasswordRequestActionParams>(RESET_PASSWORD_REQUEST);

export const resetPasswordSuccess = payloadedActionCreator<ResetPasswordSuccessActionParams>(RESET_PASSWORD_SUCCESS);

export const resetPasswordFailure = payloadedActionCreator<ResetPasswordFailureActionParams>(RESET_PASSWORD_FAILURE);

export const forgotPasswordStateReset = actionCreator<ForgotPasswordResetActionParams>(FORGOT_PASSWORD_RESET);

export const userUpdateSuccess = payloadedActionCreator<UserUpdateSuccessActionParams>(USER_UPDATE_SUCCESS);

export const logout = actionCreator<LogoutActionParams>(LOGOUT);

const login = (data: UserLoginReqData) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest({ data: { ...data } }));
        userServices.login(data)
            .then(
                (res: AxiosResponse<ResponseData<UserLoginResData>>) => {
                    if (res && res.data) {
                        const cookies = new Cookies();
                        if (cookies.get('x-auth-token')) {
                            cookies.remove('x-auth-token');
                        }
                        cookies.set('x-auth-token', res.data.data?.accessToken, { path: '/' });
                        localStorage.setItem('refreshToken', res.data.data?.refreshToken!);
                        dispatch(loginSuccess(res.data));
                    }
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(loginFailure({ error, message }));
                }
            );
    };
}

const loginCheck = () => {
    const refreshToken = localStorage.getItem('refreshToken')
    return (dispatch: Dispatch<AuthActionParams>) => {
        refreshToken && userServices.loginCheck({ refreshToken })
            .then(
                (res: AxiosResponse<ResponseData<UserLoginCheckResData>>) => {
                    const cookies = new Cookies();
                    if (res?.data.data?.accessToken) {
                        cookies.set('x-auth-token', res.data.data!.accessToken, { path: '/' });
                    }
                    dispatch(loginSuccess(res?.data));
                },
                (err: AxiosError) => {
                    localStorage.removeItem('refreshToken');
                }
            );
    };
}

const checkOrGetAccessToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    return (dispatch: Dispatch<AuthActionParams>) => {
        refreshToken && userServices.checkOrGetAccessToken({ refreshToken })
            .then(
                (res: AxiosResponse<ResponseData<UserLoginCheckResData>>) => {
                    if (res && res.status === 200 && res.data?.data?.accessToken) {
                        const cookies = new Cookies();
                        cookies.set('x-auth-token', res.data.data.accessToken, { path: '/' });
                    }
                    dispatch(connected());
                },
                (err: AxiosError) => {
                    dispatch(disconnected());
                }
            );
    };
}

const googleLogin = (token: string) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest(null));

        userServices.googleLogin(token)
            .then(
                (res: AxiosResponse<ResponseData<UserLoginResData>>) => {
                    const cookies = new Cookies();
                    cookies.set('x-auth-token', res.data.data!.accessToken, { path: '/' });
                    localStorage.setItem('refreshToken', res.data.data!.refreshToken!);
                    dispatch(loginSuccess(res.data));
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(loginFailure({ error, message }));
                }
            );
    };
}

const facebookLogin = (token: string) => {
    return (dispatch: Dispatch<AuthActionParams>) => {
        dispatch(loginRequest(null));

        userServices.facebookLogin(token)
            .then(
                (res: AxiosResponse<ResponseData<UserLoginResData>>) => {
                    const cookies = new Cookies();
                    cookies.set('x-auth-token', res.data.data!.accessToken, { path: '/' });
                    localStorage.setItem('refreshToken', res.data.data!.refreshToken!);
                    dispatch(loginSuccess(res.data));
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(loginFailure({ error, message }));
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
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(forgotPasswordFailure({ error, message }));
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
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    dispatch(resetPasswordFailure({ error, message }));
                }
            );
    };
}

export const authActions = {
    login,
    loginCheck,
    checkOrGetAccessToken,
    googleLogin,
    facebookLogin,
    forgotPassword,
    forgotPasswordStateReset,
    resetPassword,
    logout,
};