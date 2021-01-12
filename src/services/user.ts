import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DispatchProp } from 'react-redux';
import { UserLoginReqData } from '../types/user';
import { endpoint } from './../config'
import * as loginActionTypes from "../redux/auth/types"
import { HttpError } from '../utils/error';
import { asyncActionWrapper } from '../utils/asyncActionWrapper';

const login = asyncActionWrapper<AxiosResponse>(async (data: UserLoginReqData): Promise<any> => {
    const { email, password } = data;
    const response: AxiosRequestConfig = await axios.post(`${endpoint}/auth/login`, { email, password });
    return response;
})

export const userServices = {
    login
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