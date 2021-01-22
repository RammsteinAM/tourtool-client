import { ActionStatus } from "../../types/main";
import { RegisterActionParams, RegisterReducerState } from "./types";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESEND_VERIFICATION_EMAIL_REQUEST,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESEND_VERIFICATION_EMAIL_FAILURE,
} from "./types"

// interface UserAction {
//   type: string;
//   user: LoginActionParams
// }

const initialState: RegisterReducerState | null = {
  status: ActionStatus.Initial,
  registrationData: {
    email: '',
    password: ''
  },
  resendVerificationEmail: {
    status: ActionStatus.Initial,
    error: ''
  }
};

const reducer = (state: RegisterReducerState = initialState, action: RegisterActionParams): RegisterReducerState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request,
        registrationData: { 
          email: action.payload!.email,
          password: action.payload!.password
        }
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.Success,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        ...action.payload
      };
    }
    case RESEND_VERIFICATION_EMAIL_REQUEST: {
      return {
        ...state,
        resendVerificationEmail: {
          status: ActionStatus.Request
        }
      };
    }
    case RESEND_VERIFICATION_EMAIL_SUCCESS: {
      return {
        ...state,
        resendVerificationEmail: {
          status: ActionStatus.Success
        }
      };
    }
    case RESEND_VERIFICATION_EMAIL_FAILURE: {
      return {
        ...state,
        resendVerificationEmail: {
          status: ActionStatus.Failure
        }
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;