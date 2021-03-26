import { ActionStatus } from "../../types/main";
import { RegisterActionParams, RegisterReducerState } from "./types";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE,
  RESEND_VERIFICATION_EMAIL_REQUEST,
  RESEND_VERIFICATION_EMAIL_SUCCESS,
  RESEND_VERIFICATION_EMAIL_FAILURE,
} from "./types"

// interface UserAction {
//   type: string;
//   user: LoginActionParams
// }

const resendVerificationEmailInitialState = {
  status: ActionStatus.Initial,
  error: ''
}

const verifyEmailInitialState = {
  status: ActionStatus.Initial,
  error: '',
  data: {
    email: '',
    displayName: ''
  },
}

const initialState: RegisterReducerState | null = {
  status: ActionStatus.Initial,
  data: {
    email: '',
    password: ''
  },
  error: '',
  resendVerificationEmail: { ...resendVerificationEmailInitialState },
  verifyEmail: { ...verifyEmailInitialState },
};

const reducer = (state: RegisterReducerState = initialState, action: RegisterActionParams): RegisterReducerState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request,
        data: { ...action.payload! }
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
    case VERIFY_EMAIL_REQUEST: {
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          status: ActionStatus.Request,
          error: ''
        }
      };
    }
    case VERIFY_EMAIL_SUCCESS: {
      return {
        ...state,
        verifyEmail: {
          //...action.payload,
          status: ActionStatus.Success,
          error: '',
          data: { ...action.payload }

          //data: { displayName: action.payload!.data!.displayName, email: action.payload!.data!.email },
          //data: { ...action.payload },
        }
      };
    }
    case VERIFY_EMAIL_FAILURE: {
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          status: ActionStatus.Failure,
          error: action.payload?.error
        }
      };
    }
    case RESEND_VERIFICATION_EMAIL_REQUEST: {
      return {
        ...state,
        resendVerificationEmail: {
          status: ActionStatus.Request,
          error: ''
        }
      };
    }
    case RESEND_VERIFICATION_EMAIL_SUCCESS: {
      return {
        ...state,
        resendVerificationEmail: {
          status: ActionStatus.Success,
          error: ''
        }
      };
    }
    case RESEND_VERIFICATION_EMAIL_FAILURE: {
      return {
        ...state,
        resendVerificationEmail: {
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