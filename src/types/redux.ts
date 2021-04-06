import { Store } from "redux";
import { ActionStatus } from "./main";
import { UserRegisterReqData } from "./user";
export interface ReduxState {
    user: UserRegisterReqData | null;
    headers: any;
}

export type ReduxStore = Store<ReduxState>;
export interface DatalessState {
    status: ActionStatus;
    error?: string;
}
export default interface AppState<T> extends DatalessState {
    data: T;
}