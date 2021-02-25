import { Action } from "redux";
import { StateTournament } from "../../types/entities";
import { PayloadedAction } from "../helpers";

const UPDATE_SETTINGS = "UPDATE_SETTINGS";
const UPDATE_PLAYERS_REQUEST = "UPDATE_PLAYERS_REQUEST";
const UPDATE_PLAYERS_SUCCESS = "UPDATE_PLAYERS_SUCCESS";
const UPDATE_PLAYERS_FAILURE = "UPDATE_PLAYERS_FAILURE";

export {
    UPDATE_SETTINGS,
    UPDATE_PLAYERS_REQUEST,
    UPDATE_PLAYERS_SUCCESS,
    UPDATE_PLAYERS_FAILURE,
}

export type SettingsReducerState = {
    eliminationScale?: number,
    fullScreen?: boolean,
}

export type UpdateSettingsActionParams = PayloadedAction<typeof UPDATE_SETTINGS, SettingsReducerState>;
export type UserActionParams = UpdateSettingsActionParams