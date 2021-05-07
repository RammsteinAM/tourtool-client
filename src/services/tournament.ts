import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiEndpoint } from './../config';
import { updateAxiosLocale } from '../utils/i18n';
import { TournamentCreationReqData, TournamentImportReqData, TournamentUpdateReqData } from '../types/entities';

updateAxiosLocale();

const getTournaments = async (): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/tournament`, { withCredentials: true });
    return response;
}

const getTournament = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/tournament/${id}`, { withCredentials: true });
    return response;
}

const getTournamentExportData = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/tournament/json/${id}`, { withCredentials: true });
    return response;
}

const createTournament = async (data: TournamentCreationReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/tournament`, data, { withCredentials: true });
    return response;
}

const updateTournament = async (data: TournamentUpdateReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${apiEndpoint}/tournament/${data.id}`, data, { withCredentials: true });
    return response;
}

const deleteTournament = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${apiEndpoint}/tournament/${id}`, { withCredentials: true });
    return response;
}

const importTournament = async (data: TournamentImportReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/tournament/json`, data, { withCredentials: true });
    return response;
}

const giveTournamentShareAccess = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/tournament/share-on/${id}`, { withCredentials: true });
    return response;
}

const revokeTournamentShareAccess = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/tournament/share-off/${id}`, { withCredentials: true });
    return response;
}

export const tournamentServices = {
    getTournaments,
    getTournament,
    getTournamentExportData,
    createTournament,
    updateTournament,
    deleteTournament,
    importTournament,
    giveTournamentShareAccess,
    revokeTournamentShareAccess
}