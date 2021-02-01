import { ActionStatus } from "../../types/main";
import {
  UserActionParams,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
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
    case UPDATE_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request
      };
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.Success,
        ...action.payload
      };
    }
    case UPDATE_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;