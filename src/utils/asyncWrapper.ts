import { HttpError } from "./error";
import toast from '../components/IndependentSnackbar';
import { ErrorNames } from "../types/error";
import i18n from "./i18n";

export function asyncWrapper<T>(func: (param: any) => Promise<T>) {
    return async (param?: any) => {
        try {
            return await func(param);
        } catch (err) {
            const res = err?.response;
            if (res?.data?.error) {
                toast.error(i18n.t(`ERROR_${res.data.error}`))
            }
            // if (Object.values(ErrorNames).includes(res.data.error)) {
            //     toast.error(i18n.t(`ERROR_${res.data.error}`));
            // }

            throw new HttpError(res?.status, res?.data?.error, res?.data?.message);
        }
    }
}