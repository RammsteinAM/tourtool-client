import { PayloadedAction } from "../helpers";
import { FetchedTournamentForView } from "../../types/entities";
import { Action } from "redux";
import { ResponseError } from "../../types/main";
import AppState from "../../types/redux";

const SET_WATCH_DATA = "SET_WATCH_DATA";
const SET_SHARE_ID = "SET_SHARE_ID";


export {
    SET_WATCH_DATA,
    SET_SHARE_ID
}
export type WatchTournamentStateData = {
    tournamentData?: FetchedTournamentForView,
}

export type WatchTournamentReducerState = AppState<WatchTournamentStateData>;

export type SetWatchTournamentActionParams = PayloadedAction<typeof SET_WATCH_DATA, FetchedTournamentForView>;
export type SetTournamentShareIdActionParams = PayloadedAction<typeof SET_SHARE_ID, string>;

export type WatchTournamentActionParams =
    SetWatchTournamentActionParams |
    SetTournamentShareIdActionParams