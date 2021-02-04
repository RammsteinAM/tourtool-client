import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { ForgotPasswordReqData } from "../auth/types";
import {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_RESET,
    UpdateRequestActionParams,
    UpdateSuccessActionParams,
    UpdateFailureActionParams,
    UserActionParams,
    UserResetActionParams
} from "./types"
import { UserRegisterResData, UserStateData, UserUpdateReqData } from "../../types/user";
import { userUpdateSuccess } from "../auth/actions";
import { ResponseData } from "../../types/main";

export const updateRequest = actionCreator<UpdateRequestActionParams>(USER_UPDATE_REQUEST);

export const updateSuccess = payloadedActionCreator<UpdateSuccessActionParams>(USER_UPDATE_SUCCESS);

export const updateFailure = payloadedActionCreator<UpdateFailureActionParams>(USER_UPDATE_FAILURE);

export const reset = actionCreator<UserResetActionParams>(USER_RESET);

const update = (data: UserUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updateRequest());

        userServices.update(data)
            .then(
                (res: AxiosResponse<ResponseData<UserStateData>>) => {
                    dispatch(userUpdateSuccess(res.data));
                    dispatch(updateSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(updateFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

export const userActions = {
    update,
    reset,
};