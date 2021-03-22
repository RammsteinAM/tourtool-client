import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserDeleteReqData, UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { endpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { ForgotPasswordReqData } from '../redux/auth/types';
import { updateAxiosLocale } from '../utils/i18n';

updateAxiosLocale();

const getPlayers = /* asyncWrapper<AxiosResponse>( */async (): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${endpoint}/player`, { withCredentials: true });
    return response;
}/* ) */

const createPlayer = /* asyncWrapper<AxiosResponse>( */async (name: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/player/`, { name }, { withCredentials: true });
    return response;
}/* ) */

const createPlayers = /* asyncWrapper<AxiosResponse>( */async (names: string[]): Promise<AxiosResponse> => {
    // const { email, password, displayName } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/player/create-many`, names, { withCredentials: true });
    return response;
}/* ) */

const deletePlayer = /* asyncWrapper<AxiosResponse>( */async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${endpoint}/player/${id}`, { withCredentials: true });
    return response;
}/* ) */

export const playerServices = {
    getPlayers,
    createPlayer,
    createPlayers,
    deletePlayer,

}