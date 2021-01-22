import { ActionStatus } from "../../types/main";
import AppState from "../../types/redux";
import { AuthActionParams, AuthReducerState } from "./types";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./types"

const initialState: AuthReducerState | null = {
  status: ActionStatus.Initial,
  user: {
    displayName: '',
    email: '',
    accessToken: '',
    refreshToken: '',
  },
  forgotPassword: {
    status: ActionStatus.Initial,
    error: '',
  },
  resetPassword: {
    status: ActionStatus.Initial,
    error: '',
  }
};

const reducer = (state: AuthReducerState = initialState, action: AuthActionParams): AuthReducerState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.Success,
        ...action.payload
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        ...action.payload
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
    default:
      return { ...state };
  }
};

export default reducer;