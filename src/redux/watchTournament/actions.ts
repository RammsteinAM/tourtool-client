import { payloadedActionCreator } from "../helpers";
import { Dispatch } from "redux";
import {
    SET_WATCH_DATA,
    SET_SHARE_ID,
    SetWatchTournamentActionParams,
    SetTournamentShareIdActionParams,
} from "./types";
import { AxiosError, AxiosResponse } from "axios";
import { ResponseData } from "../../types/main";
import { tournamentServices } from "../../services/tournament";
import { toggleTournamentShare } from "../tournamentEntities/actions";
import toast from "../../components/IndependentSnackbar";

export const setWatchTournamentData = payloadedActionCreator<SetWatchTournamentActionParams>(SET_WATCH_DATA);
export const setTournamentShareId = payloadedActionCreator<SetTournamentShareIdActionParams>(SET_SHARE_ID);


const giveTournamentShareAccess = (id: number) => {
    return (dispatch: Dispatch) => {
        tournamentServices.giveTournamentShareAccess(id)
            .then(
                (res: AxiosResponse<ResponseData<{ shareId: string }>>) => {
                    res?.data?.data && dispatch(toggleTournamentShare({ id, shareId: res.data.data.shareId }));
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    toast.error(message)
                }
            );
    };
}

const revokeTournamentShareAccess = (id: number) => {
    return (dispatch: Dispatch) => {
        tournamentServices.revokeTournamentShareAccess(id)
            .then(
                (res: AxiosResponse<ResponseData>) => {
                    dispatch(toggleTournamentShare({ id, shareId: '' }));
                },
                (err: AxiosError) => {
                    const error = err.response?.data.error;
                    const message = err.response?.data.message;
                    toast.error(message)
                }
            );
    };
}

export const watchTournamentActions = {
    giveTournamentShareAccess,
    revokeTournamentShareAccess
};