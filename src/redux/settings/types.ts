import { Action } from "redux";
import { PayloadedAction } from "../helpers";
import { FetchedTournament, FetchedTournaments, LMSColOrderKeys, TournamentTypes } from "../../types/entities";

const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export {
    UPDATE_SETTINGS,
}

export type TournamentSortingKeys = keyof Pick<FetchedTournament, 'createdAt' | 'updatedAt' | 'name' | 'sets'>
export type TournamentFilterKeys = TournamentTypes | 'all';

export type SettingsReducerState = {
    eliminationScale?: number,
    fullScreen?: boolean,
    tournamentSidebar?: boolean,
    tournamentSidebarColumnOrder?: LMSColOrderKeys[],
    tournamentSidebarEnabledColumns?: LMSColOrderKeys[],
    tournamentsSortKey?: TournamentSortingKeys,
    tournamentsSortOrder?: 1 | -1,
    tournamentsFilterKey?: TournamentFilterKeys,
    tournamentsSearchKeyword?: string,
}

export type UpdateSettingsActionParams = PayloadedAction<typeof UPDATE_SETTINGS, SettingsReducerState>;
export type UserActionParams = UpdateSettingsActionParams