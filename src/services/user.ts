import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DispatchProp } from 'react-redux';
import { UserGoogleLoginReqData, UserLoginReqData, UserRegisterReqData } from '../types/user';
import { endpoint } from './../config'
import * as loginActionTypes from "../redux/auth/types"
import { HttpError } from '../utils/error';
import { asyncActionWrapper } from '../utils/asyncActionWrapper';
import { ForgotPasswordReqData } from '../redux/auth/types';
import { getLangQuery } from '../utils/i18n';


const login = asyncActionWrapper<AxiosResponse>(async (data: UserLoginReqData): Promise<AxiosResponse> => {
    const { email, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/login${getLangQuery()}`, { email, password });
    return response;
})

const register = asyncActionWrapper<AxiosResponse>(async (data: UserRegisterReqData): Promise<AxiosResponse> => {
    const { email, password, displayName } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/register${getLangQuery()}`, { email, password, displayName });
    return response;
})

const resendVerificationEmail = asyncActionWrapper<AxiosResponse>(async (data: UserLoginReqData): Promise<AxiosResponse> => {
    const { email, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/resend-mail${getLangQuery()}`, { email, password });
    return response;
})

const googleLogin = asyncActionWrapper<AxiosResponse>(async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/social/google${getLangQuery()}`, { token });
    return response;
})

const facebookLogin = asyncActionWrapper<AxiosResponse>(async (data: any): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/social/facebook${getLangQuery()}`, data);
    return response;
})

const forgotPassword = asyncActionWrapper<AxiosResponse>(async (data: ForgotPasswordReqData): Promise<AxiosResponse> => {
    const { email } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/user/forgot-password${getLangQuery()}`, { email });
    return response;
})

export const userServices = {
    login,
    register,
    googleLogin,
    facebookLogin,
    forgotPassword,
    resendVerificationEmail,
}

// import { generateConfigHeaderWithToken } from './localStorageUtils';

export async function axiosPost<TBody>(url: string, body: TBody, config: AxiosRequestConfig = {}): Promise<object> {
    //const config = generateConfigHeaderWithToken();
    return axios.post(url, body, config);
}

// export const post = async (url: string, body: object): Promise<object> => {
//     const config = generateConfigHeaderWithToken();
//     return axios.post(url, body, config);
// }
// export const put = async (url: string, body: object): Promise<object> => {
//     const config = generateConfigHeaderWithToken();
//     return axios.put(url, body, config);
// }
// export const get = async (url: string): Promise<object> => {
//     const config = generateConfigHeaderWithToken();
//     return axios.get(url, config);
// }
// export const del = async (url: string): Promise<object> => {
//     const config = generateConfigHeaderWithToken();
//     return axios.delete(url, config);
// }