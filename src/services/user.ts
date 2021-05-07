import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserDeleteReqData, UserLoginCheckReqData, UserLoginReqData, UserPasswordResetReqData, UserRegisterReqData, UserUpdateReqData } from '../types/user';
import { apiEndpoint } from './../config'
import { asyncWrapper } from '../utils/asyncWrapper';
import { ForgotPasswordReqData } from '../redux/auth/types';
import { updateAxiosLocale } from '../utils/i18n';

updateAxiosLocale();

const login = /* asyncWrapper<AxiosResponse>( */async (data: UserLoginReqData): Promise<AxiosResponse> => {
    const { email, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/login`, { email, password });
    return response;
}/* ) */

const loginCheck = async (data: UserLoginCheckReqData): Promise<AxiosResponse> => {
    const { refreshToken } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/login-check`, { refreshToken }, { withCredentials: true });
    return response;
}

const register = async (data: UserRegisterReqData): Promise<AxiosResponse> => {
    const { email, password, displayName } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/register`, { email, password, displayName });
    return response;
}

const emailCheck = async (email: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/email-check`, { email });
    return response;
}

const verifyUser = async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/auth/verify/${token}`);
    return response;
}

const resendVerificationEmail = asyncWrapper<AxiosResponse>(async (data: UserLoginReqData): Promise<AxiosResponse> => {
    const { email, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/resend-mail`, { email, password });
    return response;
})

const googleLogin = asyncWrapper<AxiosResponse>(async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/social/google`, { token });
    return response;
})

const facebookLogin = asyncWrapper<AxiosResponse>(async (data: any): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/social/facebook`, data);
    return response;
})

const forgotPassword = asyncWrapper<AxiosResponse>(async (data: ForgotPasswordReqData): Promise<AxiosResponse> => {
    const { email } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/forgot-password`, { email });
    return response;
})

const resetPassword = asyncWrapper<AxiosResponse>(async (data: UserPasswordResetReqData): Promise<AxiosResponse> => {
    const { password, token } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.post(`${apiEndpoint}/auth/reset-password/${token}`, { password });
    return response;
})

const update = /* asyncWrapper<AxiosResponse>( */async (data: UserUpdateReqData): Promise<AxiosResponse> => {
    const { id, displayName, currentPassword, password } = data;
    const response: AxiosResponse<AxiosRequestConfig> = await axios.put(`${apiEndpoint}/auth`, { displayName, currentPassword, password }, { withCredentials: true });
    return response;
}/* ) */

const deleteAccountEmailRequest = asyncWrapper<AxiosResponse>(async (): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.get(`${apiEndpoint}/auth/delete-account-request`, { withCredentials: true });
    return response;
})

const deleteAccount = asyncWrapper<AxiosResponse>(async (token: string): Promise<AxiosResponse> => {
    const response: AxiosResponse<AxiosRequestConfig> = await axios.delete(`${apiEndpoint}/auth/${token}`);
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
    deleteAccountEmailRequest,
    deleteAccount,
    emailCheck,
}