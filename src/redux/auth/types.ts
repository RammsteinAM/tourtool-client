import { Action } from "redux";
import { ResponseError } from "../../types/main";
import AppState from "../../types/redux";
import { UserCreationReqData, UserLoginResData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

export {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
}

export interface UserState extends AppState {
    user: UserCreationReqData
}

export type LoginRequestActionParams = Action<typeof LOGIN_REQUEST>;
export type LoginSuccessActionParams = PayloadedAction<typeof LOGIN_SUCCESS, UserLoginResData | null>;
export type LoginFailureActionParams = PayloadedAction<typeof LOGIN_FAILURE, ResponseError | null>;
export type LoginActionParams = LoginRequestActionParams | LoginSuccessActionParams | LoginFailureActionParams;