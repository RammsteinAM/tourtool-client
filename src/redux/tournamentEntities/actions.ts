import { actionCreator, payloadedActionCreator } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { tournamentServices } from "../../services/tournament";
import { playerServices } from "../../services/player";
import {
    UPDATE_TOURNAMENT,
    UPDATE_PARTICIPANTS,
    UPDATE_ELIMINATION_PLAYERS,
    UPDATE_LMS_PLAYERS,
    UPDATE_GAMES,
    UPDATE_ELIMINATION_GAMES,
    RESET_GAMES,
    RESET_ELIMINATION_GAMES,
    GET_PLAYERS_REQUEST, GET_PLAYERS_SUCCESS, GET_PLAYERS_FAILURE,
    GET_TOURNAMENT_REQUEST, GET_TOURNAMENT_SUCCESS, GET_TOURNAMENT_FAILURE,
    GET_TOURNAMENTS_REQUEST, GET_TOURNAMENTS_SUCCESS, GET_TOURNAMENTS_FAILURE,
    CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_SUCCESS, CREATE_TOURNAMENT_FAILURE,
    UPDATE_TOURNAMENT_REQUEST, UPDATE_TOURNAMENT_SUCCESS, UPDATE_TOURNAMENT_FAILURE,
    DELETE_TOURNAMENT_REQUEST, DELETE_TOURNAMENT_SUCCESS, DELETE_TOURNAMENT_FAILURE,
    CREATE_PLAYER_REQUEST, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE,
    CREATE_PLAYERS_REQUEST, CREATE_PLAYERS_SUCCESS, CREATE_PLAYERS_FAILURE,
    UPDATE_PLAYERS_REQUEST, UPDATE_PLAYERS_SUCCESS, UPDATE_PLAYERS_FAILURE,
    UpdateTournamentActionParams,
    UpdateParticipantsActionParams,
    UpdateEliminationPlayersActionParams,
    UpdateLMSPlayersActionParams,
    ResetGamesActionParams,
    ResetEliminationGamesActionParams,
    UpdateGamesActionParams,
    UpdateEliminationGamesActionParams,
    GetTournamentsRequestActionParams, GetTournamentsSuccessActionParams, GetTournamentsFailureActionParams,
    GetTournamentRequestActionParams, GetTournamentSuccessActionParams, GetTournamentFailureActionParams,
    GetPlayersRequestActionParams, GetPlayersSuccessActionParams, GetPlayersFailureActionParams,
    CreatePlayerRequestActionParams, CreatePlayerSuccessActionParams, CreatePlayerFailureActionParams,
    CreateTournamentRequestActionParams, CreateTournamentSuccessActionParams, CreateTournamentFailureActionParams,
    UpdateTournamentRequestActionParams, UpdateTournamentSuccessActionParams, UpdateTournamentFailureActionParams,
    DeleteTournamentRequestActionParams, DeleteTournamentSuccessActionParams, DeleteTournamentFailureActionParams,
    CreatePlayersRequestActionParams, CreatePlayersSuccessActionParams, CreatePlayersFailureActionParams,
    UpdatePlayersRequestActionParams, UpdatePlayersSuccessActionParams, UpdatePlayersFailureActionParams,
} from "./types"
import { UserStateData, UserUpdateReqData } from "../../types/user";
import { loginSuccess } from "../auth/actions";
import { ResponseData } from "../../types/main";
import { FetchedPlayer, FetchedPlayers, FetchedTournament, FetchedTournaments, TournamentCreationReqData, TournamentUpdateReqData } from "../../types/entities";
import { createGamesSuccess, getGamesSuccess } from "../games/actions";

export const updateTournament = payloadedActionCreator<UpdateTournamentActionParams>(UPDATE_TOURNAMENT);

export const updateEliminationPlayers = payloadedActionCreator<UpdateEliminationPlayersActionParams>(UPDATE_ELIMINATION_PLAYERS);

export const updateLMSPlayers = payloadedActionCreator<UpdateLMSPlayersActionParams>(UPDATE_LMS_PLAYERS);

export const updateParticipants = payloadedActionCreator<UpdateParticipantsActionParams>(UPDATE_PARTICIPANTS);

export const updateGames = payloadedActionCreator<UpdateGamesActionParams>(UPDATE_GAMES);

export const updateEliminationGames = payloadedActionCreator<UpdateEliminationGamesActionParams>(UPDATE_ELIMINATION_GAMES);

export const resetGames = actionCreator<ResetGamesActionParams>(RESET_GAMES);

export const resetEliminationGames = actionCreator<ResetEliminationGamesActionParams>(RESET_ELIMINATION_GAMES);

export const getTournamentRequest = actionCreator<GetTournamentRequestActionParams>(GET_TOURNAMENT_REQUEST);
export const getTournamentSuccess = payloadedActionCreator<GetTournamentSuccessActionParams>(GET_TOURNAMENT_SUCCESS);
export const getTournamentFailure = payloadedActionCreator<GetTournamentFailureActionParams>(GET_TOURNAMENT_FAILURE);

export const getTournamentsRequest = actionCreator<GetTournamentsRequestActionParams>(GET_TOURNAMENTS_REQUEST);
export const getTournamentsSuccess = payloadedActionCreator<GetTournamentsSuccessActionParams>(GET_TOURNAMENTS_SUCCESS);
export const getTournamentsFailure = payloadedActionCreator<GetTournamentsFailureActionParams>(GET_TOURNAMENTS_FAILURE);

export const getPlayersRequest = actionCreator<GetPlayersRequestActionParams>(GET_PLAYERS_REQUEST);
export const getPlayersSuccess = payloadedActionCreator<GetPlayersSuccessActionParams>(GET_PLAYERS_SUCCESS);
export const getPlayersFailure = payloadedActionCreator<GetPlayersFailureActionParams>(GET_PLAYERS_FAILURE);

export const createTournamentRequest = actionCreator<CreateTournamentRequestActionParams>(CREATE_TOURNAMENT_REQUEST);
export const createTournamentSuccess = payloadedActionCreator<CreateTournamentSuccessActionParams>(CREATE_TOURNAMENT_SUCCESS);
export const createTournamentFailure = payloadedActionCreator<CreateTournamentFailureActionParams>(CREATE_TOURNAMENT_FAILURE);

export const updateTournamentRequest = actionCreator<UpdateTournamentRequestActionParams>(UPDATE_TOURNAMENT_REQUEST);
export const updateTournamentSuccess = payloadedActionCreator<UpdateTournamentSuccessActionParams>(UPDATE_TOURNAMENT_SUCCESS);
export const updateTournamentFailure = payloadedActionCreator<UpdateTournamentFailureActionParams>(UPDATE_TOURNAMENT_FAILURE);

export const deleteTournamentRequest = actionCreator<DeleteTournamentRequestActionParams>(DELETE_TOURNAMENT_REQUEST);
export const deleteTournamentSuccess = payloadedActionCreator<DeleteTournamentSuccessActionParams>(DELETE_TOURNAMENT_SUCCESS);
export const deleteTournamentFailure = payloadedActionCreator<DeleteTournamentFailureActionParams>(DELETE_TOURNAMENT_FAILURE);

export const createPlayerRequest = actionCreator<CreatePlayerRequestActionParams>(CREATE_PLAYER_REQUEST);
export const createPlayerSuccess = payloadedActionCreator<CreatePlayerSuccessActionParams>(CREATE_PLAYER_SUCCESS);
export const createPlayerFailure = payloadedActionCreator<CreatePlayerFailureActionParams>(CREATE_PLAYER_FAILURE);

export const createPlayersRequest = actionCreator<CreatePlayersRequestActionParams>(CREATE_PLAYERS_REQUEST);
export const createPlayersSuccess = payloadedActionCreator<CreatePlayersSuccessActionParams>(CREATE_PLAYERS_SUCCESS);
export const createPlayersFailure = payloadedActionCreator<CreatePlayersFailureActionParams>(CREATE_PLAYERS_FAILURE);

export const updatePlayersRequest = actionCreator<UpdatePlayersRequestActionParams>(UPDATE_PLAYERS_REQUEST);
export const updatePlayersSuccess = payloadedActionCreator<UpdatePlayersSuccessActionParams>(UPDATE_PLAYERS_SUCCESS);
export const updatePlayersFailure = payloadedActionCreator<UpdatePlayersFailureActionParams>(UPDATE_PLAYERS_FAILURE);

const getTournaments = () => {
    return (dispatch: Dispatch) => {
        dispatch(getTournamentsRequest());

        tournamentServices.getTournaments()
            .then(
                (res: AxiosResponse<ResponseData<FetchedTournaments>>) => {
                    res?.data?.data && dispatch(getTournamentsSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(getTournamentsFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const getPlayers = () => {
    return (dispatch: Dispatch) => {
        dispatch(getPlayersRequest());

        playerServices.getPlayers()
            .then(
                (res: AxiosResponse<ResponseData<FetchedPlayers>>) => {
                    res?.data?.data && dispatch(getPlayersSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(getPlayersFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const getTournament = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(createTournamentRequest());
        tournamentServices.getTournament(id)
            .then(
                (res: AxiosResponse<ResponseData<FetchedTournament>>) => {
                    const data = res.data.data;
                    data && dispatch(getTournamentSuccess(data));
                    data?.games && dispatch(getGamesSuccess({ [data.id]: data.games }))
                },
                (error: AxiosError) => {
                    dispatch(createTournamentFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const createTournament = (data: TournamentCreationReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(createTournamentRequest());
        tournamentServices.createTournament(data)
            .then(
                (res: AxiosResponse<ResponseData<FetchedTournament>>) => {
                    const data = res.data.data;
                    data && dispatch(createTournamentSuccess(data));
                    data?.games && dispatch(createGamesSuccess({ [data.id]: data.games }))
                },
                (error: AxiosError) => {
                    dispatch(createTournamentFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const editTournament = (data: TournamentUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updateTournamentRequest());
        tournamentServices.updateTournament(data)
            .then(
                (res: AxiosResponse<ResponseData<FetchedTournament>>) => {
                    res?.data?.data && dispatch(updateTournamentSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(updateTournamentFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const deleteTournament = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(deleteTournamentRequest());
        tournamentServices.deleteTournament(id)
            .then(
                (res: AxiosResponse<ResponseData<FetchedTournament>>) => {
                    res?.data?.data && dispatch(deleteTournamentSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(deleteTournamentFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const createPlayer = (name: string) => {
    return (dispatch: Dispatch) => {
        dispatch(createPlayerRequest());
        playerServices.createPlayer(name)
            .then(
                (res: AxiosResponse<ResponseData<FetchedPlayer>>) => {
                    res?.data?.data && dispatch(createPlayerSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(createPlayerFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const createPlayers = (names: string[]) => {
    return (dispatch: Dispatch) => {
        dispatch(createPlayersRequest());
        playerServices.createPlayers(names)
            .then(
                (res: AxiosResponse) => {
                    res?.data?.data && res.data.data?.length > 0 && dispatch(createPlayersSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(createPlayersFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

const update = (data: UserUpdateReqData) => {
    return (dispatch: Dispatch) => {
        dispatch(updatePlayersRequest());

        userServices.update(data)
            .then(
                (res: AxiosResponse<ResponseData<UserStateData>>) => {
                    dispatch(loginSuccess(res.data));
                    dispatch(updatePlayersSuccess(res.data));
                },
                (error: AxiosError) => {
                    dispatch(updatePlayersFailure({ error: error.name, message: error.message }));
                }
            );
    };
}

export const entityActions = {
    getTournaments,
    getTournament,
    getPlayers,
    createTournament,
    editTournament,
    deleteTournament,
    createPlayer,
    createPlayers,
    update,
};