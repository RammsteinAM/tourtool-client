import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { endpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { ForgotPasswordReqData } from '../redux/auth/types';
import { getLocale } from '../utils/i18n';

axios.defaults.params = {
    lang: getLocale()
}

const login = asyncWrapper<AxiosResponse>(async (data: UserLoginReqData): Promise<AxiosResponse> => {
    const { email, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/login`, { email, password });
    return response;
})

const loginCheck = asyncWrapper<AxiosResponse>(async (data: UserLoginCheckReqData): Promise<AxiosResponse> => {
    const { refreshToken } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/login-check`, { refreshToken }, { withCredentials: true });
    return response;
})

const register = asyncWrapper<AxiosResponse>(async (data: UserRegisterReqData): Promise<AxiosResponse> => {
    const { email, password, displayName } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/register`, { email, password, displayName });
    return response;
})

const verifyUser = asyncWrapper<AxiosResponse>(async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${endpoint}/auth/verify/${token}`);
    return response;
})

const resendVerificationEmail = asyncWrapper<AxiosResponse>(async (data: UserLoginReqData): Promise<AxiosResponse> => {
    const { email, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/resend-mail`, { email, password });
    return response;
})

const googleLogin = asyncWrapper<AxiosResponse>(async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/social/google`, { token });
    return response;
})

const facebookLogin = asyncWrapper<AxiosResponse>(async (data: any): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/social/facebook`, data);
    return response;
})

const forgotPassword = asyncWrapper<AxiosResponse>(async (data: ForgotPasswordReqData): Promise<AxiosResponse> => {
    const { email } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/user/forgot-password`, { email });
    return response;
})

const resetPassword = asyncWrapper<AxiosResponse>(async (data: UserPasswordResetReqData): Promise<AxiosResponse> => {
    const { password, token } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${endpoint}/auth/reset-password/${token}`, { password });
    return response;
})

const update = asyncWrapper<AxiosResponse>(async (data: UserUpdateReqData): Promise<AxiosResponse> => {
    const { id, displayName, currentPassword, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${endpoint}/user/${id}`, { displayName, currentPassword, password });
    return response;
})

export const userServices = {
    login,
    loginCheck,
    register,
    googleLogin,
    facebookLogin,
    forgotPassword,
    resendVerificationEmail,
    verifyUser,
    resetPassword,
    update,
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