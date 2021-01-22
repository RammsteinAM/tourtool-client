import { ActionStatus } from "../../types/main";
import { UserRegisterReqData } from "../../types/user";
//import { AddUserActionParams, LoginActionParams } from "./actions";
import { ForgotPasswordActionParams, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS } from "./types"

// interface UserAction {
//   type: string;
//   user: AddUserActionParams | LoginActionParams
// }

const initialState: UserRegisterReqData | null = {
  displayName: '',
  password: '',
  email: '',
};

const reducer = (state = initialState, action: ForgotPasswordActionParams) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request
      };
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Success,
        ...action.payload
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
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