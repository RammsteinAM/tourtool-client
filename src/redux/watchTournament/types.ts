import { PayloadedAction } from "../helpers";
import { FetchedTournamentForView } from "../../types/entities";
import { Action } from "redux";
import { ResponseError } from "../../types/main";
import AppState from "../../types/redux";

const SET_WATCH_DATA = "SET_WATCH_DATA";
const SET_SHARE_ID = "SET_SHARE_ID";
const TOGGLE_TOURNAMENT_SHARE_REQUEST = "TOGGLE_TOURNAMENT_SHARE_REQUEST";
const TOGGLE_TOURNAMENT_SHARE_SUCCESS = "TOGGLE_TOURNAMENT_SHARE_SUCCESS";
const TOGGLE_TOURNAMENT_SHARE_FAILURE = "TOGGLE_TOURNAMENT_SHARE_FAILURE";


export {
    SET_WATCH_DATA,
    SET_SHARE_ID,
    TOGGLE_TOURNAMENT_SHARE_REQUEST,
    TOGGLE_TOURNAMENT_SHARE_SUCCESS,
    TOGGLE_TOURNAMENT_SHARE_FAILURE,
}
export type WatchTournamentStateData = {
    tournamentData?: FetchedTournamentForView,
}

export type WatchTournamentReducerState = AppState<WatchTournamentStateData>;

export type SetWatchTournamentActionParams = PayloadedAction<typeof SET_WATCH_DATA, FetchedTournamentForView>;
export type SetTournamentShareIdActionParams = PayloadedAction<typeof SET_SHARE_ID, string>;
export type ToggleTournamentShareRequestActionParams = Action<typeof TOGGLE_TOURNAMENT_SHARE_REQUEST>;
export type ToggleTournamentShareSuccessActionParams = PayloadedAction<typeof TOGGLE_TOURNAMENT_SHARE_SUCCESS, string>;
export type ToggleTournamentShareFailureActionParams = PayloadedAction<typeof TOGGLE_TOURNAMENT_SHARE_FAILURE, ResponseError | null>;

export type WatchTournamentActionParams =
    SetWatchTournamentActionParams |
    SetTournamentShareIdActionParams |
    ToggleTournamentShareRequestActionParams |
    ToggleTournamentShareSuccessActionParams |
    ToggleTournamentShareFailureActionParams