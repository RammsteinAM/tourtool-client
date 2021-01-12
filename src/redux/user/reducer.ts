import { UserCreationReqData } from "../../types/user";
import { AddUserActionParams, LoginActionParams } from "./actions";
import * as actionTypes from "./types"

interface UserAction {
  type: string;
  user: AddUserActionParams | LoginActionParams
}

const initialState: UserCreationReqData | null = {
  displayName: '',
  password: '',
  email: '',
};

const reducer = (state = initialState, action: AddUserActionParams | LoginActionParams) => {
  switch (action.type) {
    case actionTypes.ADD_USER: {
      return { ...state, ...action.payload };
    }
    case actionTypes.LOGIN: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default reducer;