import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserDeleteReqData, UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { apiEndpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { updateAxiosLocale } from '../utils/i18n';
import { GameCreationReqData, GamesCreationReqData, GameUpdateReqData } from '../types/entities';

updateAxiosLocale();

const getTournamentGames = async (tournamentId: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/game/?tournamentId=${tournamentId}`, { withCredentials: true });
    return response;
}

const createGame = async (data: GameCreationReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/game`, data, { withCredentials: true });
    return response;
}

const updateGame = async (data: GameUpdateReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${apiEndpoint}/game/${data.id}`, data, { withCredentials: true });
    return response;
}

const updateGameAndNextGames = async (data: GameUpdateReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${apiEndpoint}/game/update-with-nexts/${data.id}`, data, { withCredentials: true });
    return response;
}

const deleteGame = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${apiEndpoint}/game/${id}`, { withCredentials: true });
    return response;
}

const createGames = async (data: GamesCreationReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/tournament/create-games`, data, { withCredentials: true });
    return response;
}

const createNextLMSRoundGames = async (tournamentId: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/tournament/create-round`, { tournamentId }, { withCredentials: true });
    return response;
}

export const gameServices = {
    getTournamentGames,
    createGame,
    createGames,
    createNextLMSRoundGames,
    updateGame,
    updateGameAndNextGames,
    deleteGame,
}