import { payloadedActionCreator } from "../helpers";
import { UPDATE_SETTINGS, UpdateSettingsActionParams } from "./types";

export const updateSettings = payloadedActionCreator<UpdateSettingsActionParams>(UPDATE_SETTINGS);

