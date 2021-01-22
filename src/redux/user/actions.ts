import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, ForgotPasswordRequestActionParams, ForgotPasswordSuccessActionParams, ForgotPasswordFailureActionParams, ForgotPasswordActionParams } from "./types"
import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { ForgotPasswordReqData } from "../auth/types";

// export type AddUserActionParams = PayloadedAction<typeof actionTypes.ADD_USER, UserCreationReqData | null>;
// export const addUser = payloadedActionCreator<AddUserActionParams>(actionTypes.ADD_USER);

// export type LoginActionParams = PayloadedAction<typeof actionTypes.LOGIN, UserLoginReqData | null>;
// //export const login = payloadedActionCreator<LoginActionParams>(actionTypes.LOGIN);

export const forgotPasswordRequest = actionCreator<ForgotPasswordRequestActionParams>(FORGOT_PASSWORD_REQUEST);

export const forgotPasswordSuccess = payloadedActionCreator<ForgotPasswordSuccessActionParams>(FORGOT_PASSWORD_SUCCESS);

export const forgotPasswordFailure = payloadedActionCreator<ForgotPasswordFailureActionParams>(FORGOT_PASSWORD_FAILURE);

const forgotPassword = (data: ForgotPasswordReqData) => {
    return (dispatch: Dispatch<ForgotPasswordActionParams>) => {
        dispatch(forgotPasswordRequest());

        userServices.forgotPassword(data)
            .then(
                (user: AxiosResponse) => {
                    dispatch(forgotPasswordSuccess(user.data));
                    //history.push(from);
                },
                (error: AxiosError) => {
                    dispatch(forgotPasswordFailure({ error: error.message }));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

export const userActions = {
    forgotPassword
};