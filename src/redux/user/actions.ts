import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { ForgotPasswordReqData } from "../auth/types";
import {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_REQUEST_DELETE_REQUEST,
    USER_REQUEST_DELETE_SUCCESS,
    USER_REQUEST_DELETE_FAILURE,
    USER_REQUEST_DELETE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,
    USER_RESET,
    UpdateRequestActionParams,
    UpdateSuccessActionParams,
    UpdateFailureActionParams,
    RequestDeleteRequestActionParams,
    RequestDeleteSuccessActionParams,
    RequestDeleteFailureActionParams,
    RequestDeleteResetActionParams,
    DeleteRequestActionParams,
    DeleteSuccessActionParams,
    DeleteFailureActionParams,
    UserActionParams,
    UserResetActionParams
} from "./types"
import { UserDeleteReqData, UserRegisterResData, UserStateData, UserUpdateReqData } from "../../types/user";
import { ResponseData } from "../../types/main";
import toast from "../../components/IndependentSnackbar";
import i18n from "../../utils/i18n";
import { logout, userUpdateSuccess } from "../auth/actions";
import { clearCookieAndStorage } from "../../utils/authUtils";

export const updateRequest = actionCreator<UpdateRequestActionParams>(USER_UPDATE_REQUEST);

export const updateSuccess = payloadedActionCreator<UpdateSuccessActionParams>(USER_UPDATE_SUCCESS);

export const updateFailure = payloadedActionCreator<UpdateFailureActionParams>(USER_UPDATE_FAILURE);

export const requestDeleteRequest = actionCreator<RequestDeleteRequestActionParams>(USER_REQUEST_DELETE_REQUEST);

export const requestDeleteSuccess = payloadedActionCreator<RequestDeleteSuccessActionParams>(USER_REQUEST_DELETE_SUCCESS);

export const requestDeleteFailure = payloadedActionCreator<RequestDeleteFailureActionParams>(USER_REQUEST_DELETE_FAILURE);

export const requestDeleteReset = actionCreator<RequestDeleteResetActionParams>(USER_REQUEST_DELETE_RESET);

export const deleteRequest = actionCreator<DeleteRequestActionParams>(USER_DELETE_REQUEST);

export const deleteSuccess = payloadedActionCreator<DeleteSuccessActionParams>(USER_DELETE_SUCCESS);

export const deleteFailure = payloadedActionCreator<DeleteFailureActionParams>(USER_DELETE_FAILURE);

export const resetUser = actionCreator<UserResetActionParams>(USER_RESET);

const updateUser = (data: UserUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updateRequest());

        userServices.update(data)
            .then(
                (res: AxiosResponse<ResponseData<UserStateData>>) => {
                    dispatch(updateSuccess(res.data));
                    dispatch(userUpdateSuccess(res.data));
                    toast.success(i18n.t('Changes saved'))
                },
                (error: AxiosError) => {
                    dispatch(updateFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const deleteUserEmailRequest = () => {
    return (dispatch: Dispatch) => {
        dispatch(requestDeleteRequest());
        userServices.deleteAccountEmailRequest(null)
            .then(
                (res: AxiosResponse<ResponseData<UserStateData>>) => {
                    dispatch(requestDeleteSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(requestDeleteFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const deleteUser = (token: string) => {
    return (dispatch: Dispatch) => {
        dispatch(deleteRequest());
        userServices.deleteAccount(token)
            .then(
                (res: AxiosResponse<ResponseData<UserStateData>>) => {
                    dispatch(deleteSuccess(res.data));
                    clearCookieAndStorage();
                },
                (error: AxiosError) => {
                    dispatch(updateFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

export const userActions = {
    updateUser,
    resetUser,
    deleteUserEmailRequest,
    deleteUser,
    requestDeleteReset,
};