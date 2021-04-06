import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserDeleteReqData, UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { endpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { updateAxiosLocale } from '../utils/i18n';
import { GameCreationReqData, GamesCreationReqData, GameUpdateReqData } from '../types/entities';

updateAxiosLocale();

const getTournamentGames = async (tournamentId: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${endpoint}/game/?tournamentId=${tournamentId}`, { withCredentials: true });
    return response;
}

const createGame = async (data: GameCreationReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/game`, data, { withCredentials: true });
    return response;
}

const updateGame = async (data: GameUpdateReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${endpoint}/game/${data.id}`, data, { withCredentials: true });
    return response;
}

const deleteGame = async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${endpoint}/game/${id}`, { withCredentials: true });
    return response;
}

const createGames = async (data: GamesCreationReqData): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/tournament/create-games`, data, { withCredentials: true });
    return response;
}

export const gameServices = {
    getTournamentGames,
    createGame,
    createGames,
    updateGame,
    deleteGame,
}