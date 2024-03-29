import { ActionStatus } from "../../types/main";
import { clearCookieAndStorage } from "../../utils/authUtils";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  CONNECTED,
  DISCONNECTED,
  USER_UPDATE_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  LOGOUT,
  AuthActionParams, AuthReducerState, DisconnectedActionStatus
} from "./types";

const forgotPasswordInitialState = {
  status: ActionStatus.Initial,
  error: ''
}

const resetPasswordInitialState = {
  status: ActionStatus.Initial,
  error: ''
}

const loginCheckInitialState = {
  status: ActionStatus.Initial,
  error: ''
}

const initialState: AuthReducerState | null = {
  status: ActionStatus.Initial,
  data: {
    id: null,
    email: '',
    displayName: '',
    password: '',
    social: null,
  },
  error: '',
  forgotPassword: { ...forgotPasswordInitialState },
  resetPassword: { ...resetPasswordInitialState },
  loginCheck: { ...loginCheckInitialState },
};

const reducer = (state: AuthReducerState = initialState, action: AuthActionParams): AuthReducerState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        data: { ...initialState.data, ...action.payload?.data },
        status: ActionStatus.Request,
      };
    }
    case LOGIN_RESET: {
      return {
        ...state,
        data: { ...initialState.data },
        status: ActionStatus.Initial,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        status: ActionStatus.Success,
        error: ''
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Success,
        ...action.payload
      };
    }
    case CONNECTED: {
      return {
        ...state,
        status: ActionStatus.Success,
      };
    }
    case DISCONNECTED: {
      return {
        ...state,
        status: DisconnectedActionStatus.Disconnected,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPassword: {
          status: ActionStatus.Request,
          error: ''
        }
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassword: {
          status: ActionStatus.Success,
          error: ''
        }
      };
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        forgotPassword: {
          status: ActionStatus.Failure,
          error: action.payload?.error
        }
      };
    }
    case FORGOT_PASSWORD_RESET: {
      return {
        ...state,
        forgotPassword: {
          status: ActionStatus.Initial,
          error: ''
        }
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPassword: {
          status: ActionStatus.Request,
          error: ''
        }
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: {
          status: ActionStatus.Success,
          error: ''
        }
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        resetPassword: {
          status: ActionStatus.Failure,
          error: action.payload?.error
        }
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        data: { ...action.payload?.data!, social: state.data?.social },
        //status: ActionStatus.Success,
        //error: ''
      };
    }
    case LOGOUT: {
      clearCookieAndStorage();
      return {
        ...initialState
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;