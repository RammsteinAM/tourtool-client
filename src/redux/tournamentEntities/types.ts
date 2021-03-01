import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import { EntityStateData, StatePlayer, StateEliminationGame, StatePlayers, StateTournament, StateGames, EliminationGames, StateParticipants, Games } from "../../types/entities";
import AppState from "../../types/redux";
import { UserStateData } from "../../types/user";
import { PayloadedAction } from "../helpers";

const UPDATE_TOURNAMENT = "UPDATE_TOURNAMENT";
const UPDATE_PARTICIPANTS = "UPDATE_PARTICIPANTS";
const UPDATE_PLAYERS = "UPDATE_PLAYERS";
const RESET_GAMES = "RESET_GAMES";
const UPDATE_ELIMINATION_GAMES = "UPDATE_ELIMINATION_GAMES";
const UPDATE_GAMES = "UPDATE_GAMES";
const UPDATE_PLAYERS_REQUEST = "UPDATE_PLAYERS_REQUEST";
const UPDATE_PLAYERS_SUCCESS = "UPDATE_PLAYERS_SUCCESS";
const UPDATE_PLAYERS_FAILURE = "UPDATE_PLAYERS_FAILURE";

export {
    UPDATE_TOURNAMENT,
    UPDATE_PARTICIPANTS,
    UPDATE_PLAYERS,
    RESET_GAMES,
    UPDATE_GAMES,
    UPDATE_ELIMINATION_GAMES,
    UPDATE_PLAYERS_REQUEST,
    UPDATE_PLAYERS_SUCCESS,
    UPDATE_PLAYERS_FAILURE,
}

export type EntitiesReducerState = {
    tournament: StateTournament,
    participants: StateParticipants,
    players: StatePlayers,
    eliminationGames: EliminationGames,
    games: Games,
}

export type UpdateTournamentActionParams = PayloadedAction<typeof UPDATE_TOURNAMENT, StateTournament>;
export type UpdateParticipantsActionParams = PayloadedAction<typeof UPDATE_PARTICIPANTS, StateParticipants>;
export type UpdatePlayersActionParams = PayloadedAction<typeof UPDATE_PLAYERS, StatePlayers>;
export type UpdateEliminationGamesActionParams = PayloadedAction<typeof UPDATE_ELIMINATION_GAMES, EliminationGames>;
export type UpdateGamesActionParams = PayloadedAction<typeof UPDATE_GAMES, Games>;
export type UpdatePlayersRequestActionParams = Action<typeof UPDATE_PLAYERS_REQUEST>;
export type ResetGamesActionParams = Action<typeof RESET_GAMES>;
export type UpdatePlayersSuccessActionParams = PayloadedAction<typeof UPDATE_PLAYERS_SUCCESS, ResponseData | null>;
export type UpdatePlayersFailureActionParams = PayloadedAction<typeof UPDATE_PLAYERS_FAILURE, ResponseError | null>;
export type UserActionParams =
    UpdateTournamentActionParams |
    UpdatePlayersActionParams |
    UpdateParticipantsActionParams |
    ResetGamesActionParams |
    UpdateGamesActionParams |
    UpdateEliminationGamesActionParams |
    UpdatePlayersRequestActionParams |
    UpdatePlayersSuccessActionParams |
    UpdatePlayersFailureActionParams