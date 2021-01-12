import { ActionStatus } from "../../types/main";
import { LoginActionParams, UserState } from "./types";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./types"

// interface UserAction {
//   type: string;
//   user: LoginActionParams
// }

const initialState: UserState | null = {
  status: ActionStatus.Initial,
  user: {
    displayName: '',
    password: '',
    email: '',
  }
};



const reducer = (state: UserState = initialState, action: LoginActionParams) => {
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
    default:
      return state;
  }
};

export default reducer;