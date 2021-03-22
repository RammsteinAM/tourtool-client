import { ActionStatus } from "../../types/main";
import {
  UserActionParams,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_REQUEST_DELETE_REQUEST,
  USER_REQUEST_DELETE_SUCCESS,
  USER_REQUEST_DELETE_FAILURE,
  USER_REQUEST_DELETE_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_RESET,
  USER_RESET,
  UserReducerState,
} from "./types"


const initialState: UserReducerState | null = {
  update: {
    status: ActionStatus.Initial,
    data: {
      id: null,
      email: '',
      displayName: '',
    },
    error: '',
  },
  delete: {
    status: ActionStatus.Initial,
    error: '',
  },
  requestDelete: {
    status: ActionStatus.Initial,
    error: '',
  }
};

const reducer = (state: UserReducerState = initialState, action: UserActionParams): UserReducerState => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        update: {
          status: ActionStatus.Request,
          data: { ...initialState.update.data }
        }
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        update: {
          status: ActionStatus.Success,
          data: { ...action.payload?.data },
          error: '',
        }
      };
    }
    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        update: {
          data: { ...state.update.data },
          status: ActionStatus.Failure,
          error: action.payload?.error
        }
      };
    }
    case USER_DELETE_REQUEST: {
      return {
        ...state,
        delete: {
          status: ActionStatus.Request
        }
      };
    }
    case USER_DELETE_SUCCESS: {
      return {
        ...state,
        delete: {
          status: ActionStatus.Success,
          ...action.payload
        }
      };
    }
    case USER_DELETE_FAILURE: {
      return {
        ...state,
        delete: {
          status: ActionStatus.Failure,
          ...action.payload
        }
      };
    }
    case USER_REQUEST_DELETE_REQUEST: {
      return {
        ...state,
        requestDelete: {
          status: ActionStatus.Request
        }
      };
    }
    case USER_REQUEST_DELETE_SUCCESS: {
      return {
        ...state,
        requestDelete: {
          status: ActionStatus.Success,
          ...action.payload
        }
      };
    }
    case USER_REQUEST_DELETE_FAILURE: {
      return {
        ...state,
        requestDelete: {
          status: ActionStatus.Failure,
          ...action.payload
        }
      };
    }
    case USER_REQUEST_DELETE_RESET: {
      return {
        ...state,
        requestDelete: { ...initialState.requestDelete }
      };
    }
    case USER_DELETE_RESET: {
      return {
        ...state,
        delete: {
          ...initialState.delete
        }
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