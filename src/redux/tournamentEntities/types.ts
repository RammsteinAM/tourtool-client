import { Action } from "redux";
import { ResponseData, ResponseError } from "../../types/main";
import { StateEliminationPlayers, StateTournament, EliminationGames, StateParticipants, Games, StateLMSPlayers, FetchedPlayers, FetchedPlayer, FetchedTournaments, FetchedTournament, BaseDatabaseEntity } from "../../types/entities";
import AppState, { DatalessState } from "../../types/redux";
import { PayloadedAction } from "../helpers";

const UPDATE_TOURNAMENT = "UPDATE_TOURNAMENT";
const UPDATE_PARTICIPANTS = "UPDATE_PARTICIPANTS";
const UPDATE_ELIMINATION_PLAYERS = "UPDATE_ELIMINATION_PLAYERS";
const UPDATE_LMS_PLAYERS = "UPDATE_LMS_PLAYERS";
const RESET_GAMES = "RESET_GAMES";
const RESET_ELIMINATION_GAMES = "RESET_ELIMINATION_GAMES";
const UPDATE_ELIMINATION_GAMES = "UPDATE_ELIMINATION_GAMES";
const UPDATE_GAMES = "UPDATE_GAMES";
const GET_PLAYERS_REQUEST = "GET_PLAYERS_REQUEST";
const GET_PLAYERS_SUCCESS = "GET_PLAYERS_SUCCESS";
const GET_PLAYERS_FAILURE = "GET_PLAYERS_FAILURE";
const GET_TOURNAMENTS_REQUEST = "GET_TOURNAMENTS_REQUEST";
const GET_TOURNAMENTS_SUCCESS = "GET_TOURNAMENTS_SUCCESS";
const GET_TOURNAMENTS_FAILURE = "GET_TOURNAMENTS_FAILURE";
const CREATE_PLAYER_REQUEST = "CREATE_PLAYER_REQUEST";
const CREATE_PLAYER_SUCCESS = "CREATE_PLAYER_SUCCESS";
const CREATE_PLAYER_FAILURE = "CREATE_PLAYER_FAILURE";
const CREATE_TOURNAMENT_REQUEST = "CREATE_TOURNAMENT_REQUEST";
const CREATE_TOURNAMENT_SUCCESS = "CREATE_TOURNAMENT_SUCCESS";
const CREATE_TOURNAMENT_FAILURE = "CREATE_TOURNAMENT_FAILURE";
const UPDATE_TOURNAMENT_REQUEST = "UPDATE_TOURNAMENT_REQUEST";
const UPDATE_TOURNAMENT_SUCCESS = "UPDATE_TOURNAMENT_SUCCESS";
const UPDATE_TOURNAMENT_FAILURE = "UPDATE_TOURNAMENT_FAILURE";
const DELETE_TOURNAMENT_REQUEST = "DELETE_TOURNAMENT_REQUEST";
const DELETE_TOURNAMENT_SUCCESS = "DELETE_TOURNAMENT_SUCCESS";
const DELETE_TOURNAMENT_FAILURE = "DELETE_TOURNAMENT_FAILURE";
const CREATE_PLAYERS_REQUEST = "CREATE_PLAYERS_REQUEST";
const CREATE_PLAYERS_SUCCESS = "CREATE_PLAYERS_SUCCESS";
const CREATE_PLAYERS_FAILURE = "CREATE_PLAYERS_FAILURE";
const UPDATE_PLAYERS_REQUEST = "UPDATE_PLAYERS_REQUEST";
const UPDATE_PLAYERS_SUCCESS = "UPDATE_PLAYERS_SUCCESS";
const UPDATE_PLAYERS_FAILURE = "UPDATE_PLAYERS_FAILURE";

export {
    UPDATE_TOURNAMENT,
    UPDATE_PARTICIPANTS,
    UPDATE_ELIMINATION_PLAYERS,
    UPDATE_LMS_PLAYERS,
    RESET_GAMES,
    RESET_ELIMINATION_GAMES,
    UPDATE_GAMES,
    UPDATE_ELIMINATION_GAMES,
    GET_TOURNAMENTS_REQUEST, GET_TOURNAMENTS_SUCCESS, GET_TOURNAMENTS_FAILURE,
    GET_PLAYERS_REQUEST, GET_PLAYERS_SUCCESS, GET_PLAYERS_FAILURE,
    CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_SUCCESS, CREATE_TOURNAMENT_FAILURE,
    UPDATE_TOURNAMENT_REQUEST, UPDATE_TOURNAMENT_SUCCESS, UPDATE_TOURNAMENT_FAILURE,
    DELETE_TOURNAMENT_REQUEST, DELETE_TOURNAMENT_SUCCESS, DELETE_TOURNAMENT_FAILURE,
    CREATE_PLAYER_REQUEST, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE,
    CREATE_PLAYERS_REQUEST, CREATE_PLAYERS_SUCCESS, CREATE_PLAYERS_FAILURE,
    UPDATE_PLAYERS_REQUEST, UPDATE_PLAYERS_SUCCESS, UPDATE_PLAYERS_FAILURE,
}

export type EntitiesReducerState = {
    tournament: StateTournament,
    participants: StateParticipants,
    fetchedTournaments: AppState<FetchedTournaments>,
    fetchedPlayers: AppState<FetchedPlayers>,
    addPlayers: DatalessState,
    eliminationPlayers: StateEliminationPlayers,
    lmsPlayers: StateLMSPlayers,
    eliminationGames: EliminationGames,
    games: Games,
}

export type UpdateTournamentActionParams = PayloadedAction<typeof UPDATE_TOURNAMENT, StateTournament>;
export type UpdateParticipantsActionParams = PayloadedAction<typeof UPDATE_PARTICIPANTS, StateParticipants>;
export type UpdateEliminationPlayersActionParams = PayloadedAction<typeof UPDATE_ELIMINATION_PLAYERS, StateEliminationPlayers>;
export type UpdateLMSPlayersActionParams = PayloadedAction<typeof UPDATE_LMS_PLAYERS, StateLMSPlayers>;
export type UpdateEliminationGamesActionParams = PayloadedAction<typeof UPDATE_ELIMINATION_GAMES, EliminationGames>;
export type UpdateGamesActionParams = PayloadedAction<typeof UPDATE_GAMES, Games>;
export type ResetGamesActionParams = Action<typeof RESET_GAMES>;
export type ResetEliminationGamesActionParams = Action<typeof RESET_ELIMINATION_GAMES>;
export type GetTournamentsRequestActionParams = Action<typeof GET_TOURNAMENTS_REQUEST>;
export type GetTournamentsSuccessActionParams = PayloadedAction<typeof GET_TOURNAMENTS_SUCCESS, FetchedTournaments>;
export type GetTournamentsFailureActionParams = PayloadedAction<typeof GET_TOURNAMENTS_FAILURE, ResponseError | null>;
export type GetPlayersRequestActionParams = Action<typeof GET_PLAYERS_REQUEST>;
export type GetPlayersSuccessActionParams = PayloadedAction<typeof GET_PLAYERS_SUCCESS, FetchedPlayers>;
export type GetPlayersFailureActionParams = PayloadedAction<typeof GET_PLAYERS_FAILURE, ResponseError | null>;
export type CreatePlayerRequestActionParams = Action<typeof CREATE_PLAYER_REQUEST>;
export type CreatePlayerSuccessActionParams = PayloadedAction<typeof CREATE_PLAYER_SUCCESS, FetchedPlayer>;
export type CreatePlayerFailureActionParams = PayloadedAction<typeof CREATE_PLAYER_FAILURE, ResponseError | null>;
export type CreateTournamentRequestActionParams = Action<typeof CREATE_TOURNAMENT_REQUEST>;
export type CreateTournamentSuccessActionParams = PayloadedAction<typeof CREATE_TOURNAMENT_SUCCESS, FetchedTournament>;
export type CreateTournamentFailureActionParams = PayloadedAction<typeof CREATE_TOURNAMENT_FAILURE, ResponseError | null>;
export type UpdateTournamentRequestActionParams = Action<typeof UPDATE_TOURNAMENT_REQUEST>;
export type UpdateTournamentSuccessActionParams = PayloadedAction<typeof UPDATE_TOURNAMENT_SUCCESS, FetchedTournament>;
export type UpdateTournamentFailureActionParams = PayloadedAction<typeof UPDATE_TOURNAMENT_FAILURE, ResponseError | null>;
export type DeleteTournamentRequestActionParams = Action<typeof DELETE_TOURNAMENT_REQUEST>;
export type DeleteTournamentSuccessActionParams = PayloadedAction<typeof DELETE_TOURNAMENT_SUCCESS, BaseDatabaseEntity>;
export type DeleteTournamentFailureActionParams = PayloadedAction<typeof DELETE_TOURNAMENT_FAILURE, ResponseError | null>;
export type CreatePlayersRequestActionParams = Action<typeof CREATE_PLAYERS_REQUEST>;
export type CreatePlayersSuccessActionParams = PayloadedAction<typeof CREATE_PLAYERS_SUCCESS, FetchedPlayers>;
export type CreatePlayersFailureActionParams = PayloadedAction<typeof CREATE_PLAYERS_FAILURE, ResponseError | null>;
export type UpdatePlayersRequestActionParams = Action<typeof UPDATE_PLAYERS_REQUEST>;
export type UpdatePlayersSuccessActionParams = PayloadedAction<typeof UPDATE_PLAYERS_SUCCESS, ResponseData | null>;
export type UpdatePlayersFailureActionParams = PayloadedAction<typeof UPDATE_PLAYERS_FAILURE, ResponseError | null>;
export type UserActionParams =
    UpdateTournamentActionParams |
    UpdateEliminationPlayersActionParams |
    UpdateLMSPlayersActionParams |
    UpdateParticipantsActionParams |
    ResetGamesActionParams |
    ResetEliminationGamesActionParams |
    UpdateGamesActionParams |
    UpdateEliminationGamesActionParams |
    GetTournamentsRequestActionParams |
    GetTournamentsSuccessActionParams |
    GetTournamentsFailureActionParams |
    GetPlayersRequestActionParams |
    GetPlayersSuccessActionParams |
    GetPlayersFailureActionParams |
    CreateTournamentRequestActionParams |
    CreateTournamentSuccessActionParams |
    CreateTournamentFailureActionParams |
    UpdateTournamentRequestActionParams |
    UpdateTournamentSuccessActionParams |
    UpdateTournamentFailureActionParams |
    DeleteTournamentRequestActionParams |
    DeleteTournamentSuccessActionParams |
    DeleteTournamentFailureActionParams |
    CreatePlayerRequestActionParams |
    CreatePlayerSuccessActionParams |
    CreatePlayerFailureActionParams |
    CreatePlayersRequestActionParams |
    CreatePlayersSuccessActionParams |
    CreatePlayersFailureActionParams |
    UpdatePlayersRequestActionParams |
    UpdatePlayersSuccessActionParams |
    UpdatePlayersFailureActionParams