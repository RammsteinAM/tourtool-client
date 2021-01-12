import { Store } from "redux";
import { ActionStatus } from "./main";
import { UserCreationReqData } from "./user";

export interface ReduxState {
    //error: ErrorReducerState;
    user: UserCreationReqData | null;
    headers: any;
}

export type ReduxStore = Store<ReduxState>;


export default interface AppState {
    status: ActionStatus;
    error?: string;
}