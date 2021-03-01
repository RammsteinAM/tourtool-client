import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import { Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { userServices } from "../../services/user";
import { ForgotPasswordReqData } from "../auth/types";
import {
    UPDATE_TOURNAMENT,
    UPDATE_PARTICIPANTS,
    UPDATE_PLAYERS,
    UPDATE_GAMES,
    RESET_GAMES,
    UPDATE_PLAYERS_REQUEST,
    UPDATE_PLAYERS_SUCCESS,
    UPDATE_PLAYERS_FAILURE,
    UpdateTournamentActionParams,
    UpdateParticipantsActionParams,
    UpdatePlayersActionParams,
    ResetGamesActionParams,
    UpdateGamesActionParams,
    UpdatePlayersRequestActionParams,
    UpdatePlayersSuccessActionParams,
    UpdatePlayersFailureActionParams,
    UserActionParams,
} from "./types"
import { UserRegisterResData, UserStateData, UserUpdateReqData } from "../../types/user";
import { loginSuccess } from "../auth/actions";
import { ResponseData } from "../../types/main";

export const updateTournament = payloadedActionCreator<UpdateTournamentActionParams>(UPDATE_TOURNAMENT);

export const updatePlayers = payloadedActionCreator<UpdatePlayersActionParams>(UPDATE_PLAYERS);

export const updateParticipants = payloadedActionCreator<UpdateParticipantsActionParams>(UPDATE_PARTICIPANTS);

export const updateGames = payloadedActionCreator<UpdateGamesActionParams>(UPDATE_GAMES);

export const resetGames = actionCreator<ResetGamesActionParams>(RESET_GAMES);

export const updatePlayersRequest = actionCreator<UpdatePlayersRequestActionParams>(UPDATE_PLAYERS_REQUEST);

export const updatePlayersSuccess = payloadedActionCreator<UpdatePlayersSuccessActionParams>(UPDATE_PLAYERS_SUCCESS);

export const updatePlayersFailure = payloadedActionCreator<UpdatePlayersFailureActionParams>(UPDATE_PLAYERS_FAILURE);

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

export const userActions = {
    update
};