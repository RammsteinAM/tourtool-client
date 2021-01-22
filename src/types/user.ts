import ResponseData from "./main";

export interface UserLoginReqData {
    email: string;
    password: string;
}

export interface UserRegisterReqData extends UserLoginReqData {
    displayName?: string;
}

export interface UserGoogleLoginReqData {
    token: string;
}

export interface UserLoginResData {
    displayName: string;
    email: string;
    accessToken: string;
    refreshToken: string;
}

export interface UserRegisterResData {
    displayName: string;
    email: string;
}

export interface LoginResponse extends ResponseData<UserLoginResData> {
    data: UserLoginResData;
}

export interface RegisterResponse extends ResponseData<UserRegisterResData> {
    data: UserRegisterResData;
}

// export interface LoginRequest extends ResponseData<UserLoginResData> {
//     data: UserLoginResData;
// }
export interface RegisterFormValues {
    displayName?: string;
    email: string;
    password: string;
}