import { actionCreator, payloadedActionCreator, PayloadedAction } from "../helpers";
import {
    UPDATE_SETTINGS,
    UpdateSettingsActionParams,
    UserActionParams,
} from "./types";

export const updateSettings = payloadedActionCreator<UpdateSettingsActionParams>(UPDATE_SETTINGS);

