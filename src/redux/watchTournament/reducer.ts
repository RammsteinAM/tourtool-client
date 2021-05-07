import { ActionStatus } from "../../types/main";
import {
  SET_WATCH_DATA,
  SET_SHARE_ID,
  TOGGLE_TOURNAMENT_SHARE_REQUEST,
  TOGGLE_TOURNAMENT_SHARE_SUCCESS,
  TOGGLE_TOURNAMENT_SHARE_FAILURE,
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
    // case SET_SHARE_ID: {
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       shareId: action.payload
    //     }
    //   };
    // }
    // case TOGGLE_TOURNAMENT_SHARE_REQUEST: {
    //   return {
    //     ...state,
    //     status: ActionStatus.Request,
    //   };
    // }
    // case TOGGLE_TOURNAMENT_SHARE_SUCCESS: {
    //   debugger
    //   return {
    //     ...state,
    //     status: ActionStatus.Success,
    //     data: {
    //       ...state.data,
    //       shareId: action.payload
    //     }
    //   };
    // }
    // case TOGGLE_TOURNAMENT_SHARE_FAILURE: {
    //   return {
    //     ...state,
    //     status: ActionStatus.Failure,
    //     error: action.payload?.error
    //   };
    // }
    default:
      return state;
  }
};

export default reducer;