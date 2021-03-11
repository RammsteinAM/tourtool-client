import {
  UserActionParams,
  UPDATE_SETTINGS,
  SettingsReducerState,
} from "./types";

const initialState: SettingsReducerState | null = {
  eliminationScale: 1,
  fullScreen: false,
  tournamentSidebar: true,
  tournamentSidebarColumnOrder: ['name', 'numberOfGames', 'lives']
};

const reducer = (state: SettingsReducerState = initialState, action: UserActionParams): SettingsReducerState => {
  switch (action.type) {
    case UPDATE_SETTINGS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;