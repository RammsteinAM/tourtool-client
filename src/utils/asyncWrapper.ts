import { HttpError } from "./error";
import toast from '../components/IndependentSnackbar';
import { ErrorNames } from "../types/error";
import i18n from "./i18n";

export function asyncWrapper<T>(func: (param: any) => Promise<T>) {
    return async (param?: any) => {
        try {
            return await func(param);
        } catch (err) {
            debugger
            const resData = err?.response?.data;
            // toast.error(i18n.t(`ERROR_${resData?.error}`));
            // if (Object.values(ErrorNames).includes(error)) {
            //     toast.error(i18n.t(`ERROR_${error}`));
            // }

            throw new HttpError(err?.response?.status, resData?.error, resData?.message);
        }
    }
}