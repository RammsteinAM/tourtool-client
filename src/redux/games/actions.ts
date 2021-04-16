import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import history from '../../history';
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { tournamentServices } from "../../services/tournament";
import { playerServices } from "../../services/player";
import {
    GET_GAMES_REQUEST, GET_GAMES_SUCCESS, GET_GAMES_FAILURE,
    CREATE_GAMES_REQUEST, CREATE_GAMES_SUCCESS, CREATE_GAMES_FAILURE,
    UPDATE_GAME_REQUEST, UPDATE_GAME_SUCCESS, UPDATE_GAME_FAILURE,
    UPDATE_GAMES_REQUEST, UPDATE_GAMES_SUCCESS, UPDATE_GAMES_FAILURE,
    GetGamesRequestActionParams, GetGamesSuccessActionParams, GetGamesFailureActionParams,
    CreateGamesRequestActionParams, CreateGamesSuccessActionParams, CreateGamesFailureActionParams,
    UpdateGameRequestActionParams, UpdateGameSuccessActionParams, UpdateGameFailureActionParams,
    UpdateGamesRequestActionParams, UpdateGamesSuccessActionParams, UpdateGamesFailureActionParams,
    UserActionParams,
} from "./types"
import { ResponseData } from "../../types/main";
import { BaseDatabaseEntity, FetchedCreatedGames, FetchedGameData, FetchedGames, FetchedGamesData, FetchedPlayer, FetchedPlayers, FetchedTournament, FetchedTournaments, GamesCreationReqData, GameUpdateReqData } from "../../types/entities";
import { gameServices } from "../../services/game";

export const getGamesRequest = actionCreator<GetGamesRequestActionParams>(GET_GAMES_REQUEST);
export const getGamesSuccess = payloadedActionCreator<GetGamesSuccessActionParams>(GET_GAMES_SUCCESS);
export const getGamesFailure = payloadedActionCreator<GetGamesFailureActionParams>(GET_GAMES_FAILURE);

export const createGamesRequest = actionCreator<CreateGamesRequestActionParams>(CREATE_GAMES_REQUEST);
export const createGamesSuccess = payloadedActionCreator<CreateGamesSuccessActionParams>(CREATE_GAMES_SUCCESS);
export const createGamesFailure = payloadedActionCreator<CreateGamesFailureActionParams>(CREATE_GAMES_FAILURE);

export const updateGameRequest = actionCreator<UpdateGameRequestActionParams>(UPDATE_GAME_REQUEST);
export const updateGameSuccess = payloadedActionCreator<UpdateGameSuccessActionParams>(UPDATE_GAME_SUCCESS);
export const updateGameFailure = payloadedActionCreator<UpdateGameFailureActionParams>(UPDATE_GAME_FAILURE);

export const updateGamesRequest = actionCreator<UpdateGamesRequestActionParams>(UPDATE_GAMES_REQUEST);
export const updateGamesSuccess = payloadedActionCreator<UpdateGamesSuccessActionParams>(UPDATE_GAMES_SUCCESS);
export const updateGamesFailure = payloadedActionCreator<UpdateGamesFailureActionParams>(UPDATE_GAMES_FAILURE);

const getTournamentGames = (tournamentId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(getGamesRequest());
        gameServices.getTournamentGames(tournamentId)
            .then(
                (res: AxiosResponse<ResponseData<FetchedGames>>) => {
                    res?.data?.data && dispatch(getGamesSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(getGamesFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const createGames = (data: GamesCreationReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(createGamesRequest());
        gameServices.createGames(data)
            .then(
                (res: AxiosResponse<ResponseData<FetchedGames>>) => {
                    res?.data?.data && dispatch(createGamesSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(createGamesFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const editGame = (data: GameUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updateGameRequest());
        gameServices.updateGame(data)
            .then(
                (res: AxiosResponse<ResponseData<FetchedGameData>>) => {
                    res?.data?.data && dispatch(updateGameSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(updateGameFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const editGameAndNextGames = (data: GameUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updateGamesRequest());
        gameServices.updateGameAndNextGames(data)
            .then(
                (res: AxiosResponse<ResponseData<FetchedGamesData>>) => {
                    debugger
                    res?.data?.data && dispatch(updateGamesSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(updateGamesFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const deleteGame = (id: number) => {
    // return (dispatch: Dispatch) => {
    //     dispatch(deleteGameRequest());
    //     tournamentServices.deleteTournament(id)
    //         .then(
    //             (res: AxiosResponse<ResponseData<FetchedTournament>>) => {
    //                 res?.data?.data && dispatch(deleteGameSuccess(res.data.data));
    //             },
    //             (error: AxiosError) => {
    //                 dispatch(deleteGameFailure({ error: error.name, message: error.message }));
    //             }
    //         );
    // };
}

export const gameActions = {
    getTournamentGames,
    createGames,
    editGame,
    editGameAndNextGames,
    deleteGame,
};