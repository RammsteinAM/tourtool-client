import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { ForgotPasswordReqData } from "../auth/types";
import {
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    UpdateRequestActionParams,
    UpdateSuccessActionParams,
    UpdateFailureActionParams,
    UserActionParams
} from "./types"
import { UserRegisterResData, UserStateData, UserUpdateReqData } from "../../types/user";
import { loginSuccess } from "../auth/actions";
import { ResponseData } from "../../types/main";

export const updateRequest = actionCreator<UpdateRequestActionParams>(UPDATE_REQUEST);

export const updateSuccess = payloadedActionCreator<UpdateSuccessActionParams>(UPDATE_SUCCESS);

export const updateFailure = payloadedActionCreator<UpdateFailureActionParams>(UPDATE_FAILURE);

const update = (data: UserUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updateRequest());

        userServices.update(data)
            .then(
                (res: AxiosResponse<ResponseData<UserStateData>>) => {
                    dispatch(loginSuccess(res.data));
                    dispatch(updateSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(updateFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

export const userActions = {
    update
};