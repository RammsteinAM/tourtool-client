import { HttpError } from "./error";

export function asyncActionWrapper<T>(func: (param: any) => Promise<T>) {
    return async (param: any) => {
        try {
            return await func(param);
        } catch (error) {
            throw new HttpError(error.response.status, error.response.data.error);
        }
    }}