import { Nullable } from "./main";

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

export interface UserStateData {
    id: Nullable<number>;
    email: string;
    displayName?: string;
    password?: string;
    social?: Nullable<boolean>;
}

export interface UserLoginResData extends UserStateData {
    accessToken: string;
    refreshToken: string;
}

export interface UserLoginCheckResData extends UserStateData {
    accessToken?: string;
}

export interface UserRegisterResData {
    displayName: string;
    email: string;
}

export interface UserPasswordResetReqData {
    password: string;
    token: string;
}

export interface UserLoginCheckReqData {
    refreshToken: string;
}

export interface UserUpdateReqData {
    id: Nullable<number>,
    displayName?: string,
    currentPassword?: string,
    password?: string,
}

export interface UserDeleteReqData {
    id: Nullable<number>
}

export type RegisterFormValues = UserRegisterReqData;


// export interface LoginResponse extends ResponseData<UserLoginResData> {
//     data: UserLoginResData;
// }

// export interface RegisterResponse extends ResponseData<UserRegisterResData> {
//     data: UserRegisterResData;
// }

// export interface LoginRequest extends ResponseData<UserLoginResData> {
//     data: UserLoginResData;
// }