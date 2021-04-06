import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import { FetchedCreatedGames, FetchedGameData, FetchedGames } from "../../types/entities";
import AppState, { DatalessState } from "../../types/redux";
import { PayloadedAction } from "../helpers";

const GET_GAMES_REQUEST = "GET_GAMES_REQUEST";
const GET_GAMES_SUCCESS = "GET_GAMES_SUCCESS";
const GET_GAMES_FAILURE = "GET_GAMES_FAILURE";

const CREATE_GAMES_REQUEST = "CREATE_GAMES_REQUEST";
const CREATE_GAMES_SUCCESS = "CREATE_GAMES_SUCCESS";
const CREATE_GAMES_FAILURE = "CREATE_GAMES_FAILURE";

const UPDATE_GAMES_REQUEST = "UPDATE_GAMES_REQUEST";
const UPDATE_GAMES_SUCCESS = "UPDATE_GAMES_SUCCESS";
const UPDATE_GAMES_FAILURE = "UPDATE_GAMES_FAILURE";

export {
    GET_GAMES_REQUEST, GET_GAMES_SUCCESS, GET_GAMES_FAILURE,
    CREATE_GAMES_REQUEST, CREATE_GAMES_SUCCESS, CREATE_GAMES_FAILURE,
    UPDATE_GAMES_REQUEST, UPDATE_GAMES_SUCCESS, UPDATE_GAMES_FAILURE,
}

export type GamesReducerState = {
}

export type GetGamesRequestActionParams = Action<typeof GET_GAMES_REQUEST>;
export type GetGamesSuccessActionParams = PayloadedAction<typeof GET_GAMES_SUCCESS, FetchedGames>;
export type GetGamesFailureActionParams = PayloadedAction<typeof GET_GAMES_FAILURE, ResponseError | null>;

export type CreateGamesRequestActionParams = Action<typeof CREATE_GAMES_REQUEST>;
export type CreateGamesSuccessActionParams = PayloadedAction<typeof CREATE_GAMES_SUCCESS, FetchedGames>;
export type CreateGamesFailureActionParams = PayloadedAction<typeof CREATE_GAMES_FAILURE, ResponseError | null>;

export type UpdateGameRequestActionParams = Action<typeof UPDATE_GAMES_REQUEST>;
export type UpdateGameSuccessActionParams = PayloadedAction<typeof UPDATE_GAMES_SUCCESS, FetchedGameData>;
export type UpdateGameFailureActionParams = PayloadedAction<typeof UPDATE_GAMES_FAILURE, ResponseError | null>;

export type UserActionParams =
    GetGamesRequestActionParams |
    GetGamesSuccessActionParams |
    GetGamesFailureActionParams |
    CreateGamesRequestActionParams |
    CreateGamesSuccessActionParams |
    CreateGamesFailureActionParams |
    UpdateGameRequestActionParams |
    UpdateGameSuccessActionParams |
    UpdateGameFailureActionParams