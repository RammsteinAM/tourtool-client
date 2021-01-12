import { PayloadedAction, payloadedActionCreator } from "../helpers";
import * as actionTypes from "./types"
import { UserCreationReqData, UserLoginReqData } from "../../types/user";

export type AddUserActionParams = PayloadedAction<typeof actionTypes.ADD_USER, UserCreationReqData | null>;
export const addUser = payloadedActionCreator<AddUserActionParams>(actionTypes.ADD_USER);

export type LoginActionParams = PayloadedAction<typeof actionTypes.LOGIN, UserLoginReqData | null>;
//export const login = payloadedActionCreator<LoginActionParams>(actionTypes.LOGIN);

