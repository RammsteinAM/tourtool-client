import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import AppState from "../../types/redux";
import { UserStateData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const UPDATE_REQUEST = "UPDATE_REQUEST";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const UPDATE_FAILURE = "UPDATE_FAILURE";
const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export {
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
}

export type UserReducerState = AppState<UserStateData>;

export type UpdateRequestActionParams = Action<typeof UPDATE_REQUEST>;
export type UpdateSuccessActionParams = PayloadedAction<typeof UPDATE_SUCCESS, ResponseData | null>;
export type UpdateFailureActionParams = PayloadedAction<typeof UPDATE_FAILURE, ResponseError | null>;
export type UserActionParams =
    UpdateRequestActionParams |
    UpdateSuccessActionParams |
    UpdateFailureActionParams