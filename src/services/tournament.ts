import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserDeleteReqData, UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { endpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { ForgotPasswordReqData } from '../redux/auth/types';
import { updateAxiosLocale } from '../utils/i18n';

updateAxiosLocale();

const createTournament = asyncWrapper<AxiosResponse>(async (data: UserRegisterReqData): Promise<AxiosResponse> => {
    const { email, password, displayName } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/tournament/register`, { email, password, displayName }, { withCredentials: true });
    return response;
})

const deleteTounrnament = asyncWrapper<AxiosResponse>(async (id: number): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${endpoint}/tournament/${id}`, { withCredentials: true });
    return response;
})

export const tournamentServices = {

    createTournament,
    deleteTounrnament,

}