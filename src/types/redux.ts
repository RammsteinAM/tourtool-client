import { Store } from "redux";
import { ActionStatus } from "./main";
import { UserRegisterReqData } from "./user";

export interface ReduxState {
    //error: ErrorReducerState;
    user: UserRegisterReqData | null;
    headers: any;
}

export type ReduxStore = Store<ReduxState>;


export default interface AppState {
    status: ActionStatus;
    error?: string;
}