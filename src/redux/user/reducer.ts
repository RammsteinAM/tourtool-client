import { ActionStatus } from "../../types/main";
import {
  UserActionParams,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_RESET,
  UserReducerState,
} from "./types"


const initialState: UserReducerState | null = {
  status: ActionStatus.Initial,
  data: {
    id: null,
    email: '',
    displayName: '',
  },
  error: '',
};

const reducer = (state = initialState, action: UserActionParams) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.Success,
        ...action.payload
      };
    }
    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        ...action.payload
      };
    }
    case USER_RESET: {
      return {
        ...initialState
      };
    }
    default:
      return state;
  }
};

export default reducer;