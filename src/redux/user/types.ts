import AppState from "../../types/redux";

export const LOGIN = "LOGIN";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";

export interface UserState extends AppState {
    displayName: string;
    email: string;
    password?: string;
}