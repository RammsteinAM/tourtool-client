import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserDeleteReqData, UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { endpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { ForgotPasswordReqData } from '../redux/auth/types';
import { updateAxiosLocale } from '../utils/i18n';
import { TournamentCreationReqData, TournamentUpdateReqData } from '../types/entities';

updateAxiosLocale();

const getTournaments = async (): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${endpoint}/tournament`, { withCredentials: true });
    return response;
}

const getTournament = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${endpoint}/tournament/${id}`, { withCredentials: true });
    return response;
}

const getTournamentExportData = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${endpoint}/tournament/export/${id}`, { withCredentials: true });
    return response;
}

const createTournament = async (data: TournamentCreationReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/tournament`, data, { withCredentials: true });
    return response;
}

const updateTournament = async (data: TournamentUpdateReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${endpoint}/tournament/${data.id}`, data, { withCredentials: true });
    return response;
}

const deleteTournament = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${endpoint}/tournament/${id}`, { withCredentials: true });
    return response;
}

export const tournamentServices = {
    getTournaments,
    getTournament,
    getTournamentExportData,
    createTournament,
    updateTournament,
    deleteTournament,

}