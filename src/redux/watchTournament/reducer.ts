import { ActionStatus } from "../../types/main";
import {
  SET_WATCH_DATA,
  WatchTournamentReducerState,
  WatchTournamentActionParams,
} from "./types";

const initialState = {
  status: ActionStatus.Initial,
  error: '',
  data: {
    tournamentData: undefined,
    shareUrl: ''
  },
}

const reducer = (state: WatchTournamentReducerState = initialState, action: WatchTournamentActionParams): WatchTournamentReducerState => {
  switch (action.type) {
    case SET_WATCH_DATA: {
      return {
        ...state,
        data: {
          ...state.data,
          tournamentData: { ...action.payload }
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;