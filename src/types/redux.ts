import { Store } from "redux";
import { ActionStatus } from "./main";
import { UserRegisterReqData } from "./user";
export interface ReduxState {
    user: UserRegisterReqData | null;
    headers: any;
}

export type ReduxStore = Store<ReduxState>;
export interface DatalessState<A = ActionStatus> {
    status: ActionStatus | A;
    error?: string;
}
export default interface AppState<T, A = ActionStatus> extends DatalessState<A> {
    data: T;
}