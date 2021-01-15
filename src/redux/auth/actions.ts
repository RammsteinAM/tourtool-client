import { actionCreator, payloadedActionCreator } from "../helpers";
import { UserGoogleLoginReqData, UserLoginReqData } from "../../types/user";

import { LoginActionParams, LoginFailureActionParams, LoginRequestActionParams, LoginSuccessActionParams, LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from "./types"
import { userServices } from "../../services/user";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, DispatchWithoutAction } from "react";

export const loginRequest = actionCreator<LoginRequestActionParams>(LOGIN_REQUEST);

export const loginSuccess = payloadedActionCreator<LoginSuccessActionParams>(LOGIN_SUCCESS);

export const loginFailure = payloadedActionCreator<LoginFailureActionParams>(LOGIN_FAILURE);


const login = (data: UserLoginReqData) => {
    return (dispatch: Dispatch<LoginActionParams>) => {
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
    return (dispatch: Dispatch<LoginActionParams>) => {
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
    return (dispatch: Dispatch<LoginActionParams>) => {
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

export const authActions = {
    login,
    googleLogin,
    facebookLogin,
};