import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { playerServices } from "../../services/player";
import { ForgotPasswordReqData } from "../auth/types";
import {
    UPDATE_TOURNAMENT,
    UPDATE_PARTICIPANTS,
    UPDATE_ELIMINATION_PLAYERS,
    UPDATE_LMS_PLAYERS,
    UPDATE_GAMES,
    UPDATE_ELIMINATION_GAMES,
    RESET_GAMES,
    RESET_ELIMINATION_GAMES,
    GET_PLAYERS_REQUEST,
    GET_PLAYERS_SUCCESS,
    GET_PLAYERS_FAILURE,
    CREATE_PLAYER_REQUEST,
    CREATE_PLAYER_SUCCESS,
    CREATE_PLAYER_FAILURE,
    CREATE_PLAYERS_REQUEST,
    CREATE_PLAYERS_SUCCESS,
    CREATE_PLAYERS_FAILURE,
    UPDATE_PLAYERS_REQUEST,
    UPDATE_PLAYERS_SUCCESS,
    UPDATE_PLAYERS_FAILURE,
    UpdateTournamentActionParams,
    UpdateParticipantsActionParams,
    UpdateEliminationPlayersActionParams,
    UpdateLMSPlayersActionParams,
    ResetGamesActionParams,
    ResetEliminationGamesActionParams,
    UpdateGamesActionParams,
    UpdateEliminationGamesActionParams,
    GetPlayersRequestActionParams,
    GetPlayersSuccessActionParams,
    GetPlayersFailureActionParams,
    CreatePlayerRequestActionParams,
    CreatePlayerSuccessActionParams,
    CreatePlayerFailureActionParams,
    CreatePlayersRequestActionParams,
    CreatePlayersSuccessActionParams,
    CreatePlayersFailureActionParams,
    UpdatePlayersRequestActionParams,
    UpdatePlayersSuccessActionParams,
    UpdatePlayersFailureActionParams,
    UserActionParams,
} from "./types"
import { UserRegisterResData, UserStateData, UserUpdateReqData } from "../../types/user";
import { loginSuccess } from "../auth/actions";
import { ResponseData } from "../../types/main";
import { FetchedPlayer, FetchedPlayers, Player, StateParticipant, StateParticipants } from "../../types/entities";

export const updateTournament = payloadedActionCreator<UpdateTournamentActionParams>(UPDATE_TOURNAMENT);

export const updateEliminationPlayers = payloadedActionCreator<UpdateEliminationPlayersActionParams>(UPDATE_ELIMINATION_PLAYERS);

export const updateLMSPlayers = payloadedActionCreator<UpdateLMSPlayersActionParams>(UPDATE_LMS_PLAYERS);

export const updateParticipants = payloadedActionCreator<UpdateParticipantsActionParams>(UPDATE_PARTICIPANTS);

export const updateGames = payloadedActionCreator<UpdateGamesActionParams>(UPDATE_GAMES);

export const updateEliminationGames = payloadedActionCreator<UpdateEliminationGamesActionParams>(UPDATE_ELIMINATION_GAMES);

export const resetGames = actionCreator<ResetGamesActionParams>(RESET_GAMES);

export const resetEliminationGames = actionCreator<ResetEliminationGamesActionParams>(RESET_ELIMINATION_GAMES);

export const getPlayersRequest = actionCreator<GetPlayersRequestActionParams>(GET_PLAYERS_REQUEST);

export const getPlayersSuccess = payloadedActionCreator<GetPlayersSuccessActionParams>(GET_PLAYERS_SUCCESS);

export const getPlayersFailure = payloadedActionCreator<GetPlayersFailureActionParams>(GET_PLAYERS_FAILURE);

export const createPlayerRequest = actionCreator<CreatePlayerRequestActionParams>(CREATE_PLAYER_REQUEST);

export const createPlayerSuccess = payloadedActionCreator<CreatePlayerSuccessActionParams>(CREATE_PLAYER_SUCCESS);

export const createPlayerFailure = payloadedActionCreator<CreatePlayerFailureActionParams>(CREATE_PLAYER_FAILURE);

export const createPlayersRequest = actionCreator<CreatePlayersRequestActionParams>(CREATE_PLAYERS_REQUEST);

export const createPlayersSuccess = payloadedActionCreator<CreatePlayersSuccessActionParams>(CREATE_PLAYERS_SUCCESS);

export const createPlayersFailure = payloadedActionCreator<CreatePlayersFailureActionParams>(CREATE_PLAYERS_FAILURE);

export const updatePlayersRequest = actionCreator<UpdatePlayersRequestActionParams>(UPDATE_PLAYERS_REQUEST);

export const updatePlayersSuccess = payloadedActionCreator<UpdatePlayersSuccessActionParams>(UPDATE_PLAYERS_SUCCESS);

export const updatePlayersFailure = payloadedActionCreator<UpdatePlayersFailureActionParams>(UPDATE_PLAYERS_FAILURE);

const getPlayers = () => {
    return (dispatch: Dispatch) => {
        dispatch(getPlayersRequest());

        playerServices.getPlayers()
            .then(
                (res: AxiosResponse<ResponseData<StateParticipants>>) => {
                    res?.data?.data && dispatch(getPlayersSuccess(res.data.data));
                },
                (error: AxiosError) => {
                    dispatch(getPlayersFailure({ error: error.name, message: error.message }));
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
    getPlayers,
    createPlayer,
    createPlayers,
    update
};