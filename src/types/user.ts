import ResponseData from "./main";

export interface UserLoginReqData {
    email: string;
    password: string;
}

export interface UserGoogleLoginReqData {
    token: string;
}

export interface UserLoginResData {
    accessToken: string;
    refreshToken: string;
}


export interface UserCreationReqData extends UserLoginReqData {
    displayName?: string;
}

export interface LoginResponse extends ResponseData<UserLoginResData> {
    data: UserLoginResData;
}

export interface LoginRequest extends ResponseData<UserLoginResData> {
    data: UserLoginResData;
}