import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import { EntityStateData, StatePlayer, StateGame, StatePlayers } from "../../types/entities";
import AppState from "../../types/redux";
import { UserStateData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const UPDATE_PLAYERS = "UPDATE_PLAYERS";
const UPDATE_GAMES = "UPDATE_GAMES";
const UPDATE_PLAYERS_REQUEST = "UPDATE_PLAYERS_REQUEST";
const UPDATE_PLAYERS_SUCCESS = "UPDATE_PLAYERS_SUCCESS";
const UPDATE_PLAYERS_FAILURE = "UPDATE_PLAYERS_FAILURE";

export {
    UPDATE_PLAYERS,
    UPDATE_GAMES,
    UPDATE_PLAYERS_REQUEST,
    UPDATE_PLAYERS_SUCCESS,
    UPDATE_PLAYERS_FAILURE,
}

export type EntitiesReducerState = {
    games: EntityStateData<StateGame>,
    players: StatePlayers //EntityStateData<StatePlayer>,
}

export type UpdatePlayersActionParams = PayloadedAction<typeof UPDATE_PLAYERS, StatePlayers>;
export type UpdateGamesActionParams = PayloadedAction<typeof UPDATE_GAMES, StatePlayers>;
export type UpdatePlayersRequestActionParams = Action<typeof UPDATE_PLAYERS_REQUEST>;
export type UpdatePlayersSuccessActionParams = PayloadedAction<typeof UPDATE_PLAYERS_SUCCESS, ResponseData | null>;
export type UpdatePlayersFailureActionParams = PayloadedAction<typeof UPDATE_PLAYERS_FAILURE, ResponseError | null>;
export type UserActionParams =
    UpdatePlayersActionParams |
    UpdateGamesActionParams |
    UpdatePlayersRequestActionParams |
    UpdatePlayersSuccessActionParams |
    UpdatePlayersFailureActionParams