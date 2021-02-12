import { EntityById, EntityStateData, StatePlayer, StatePlayers } from "../../types/entities";
import { ActionStatus } from "../../types/main";
import { arrayGroupBy } from "../helpers";
import {
  UserActionParams,
  UPDATE_PLAYERS,
  UPDATE_GAMES,
  UPDATE_PLAYERS_REQUEST,
  UPDATE_PLAYERS_SUCCESS,
  UPDATE_PLAYERS_FAILURE,
  EntitiesReducerState,
} from "./types"


const initialState: EntitiesReducerState | null = {
  players: [] /* {
    byId: {},
    allIds: [],
  } */,
  games: {
    byId: {},
    allIds: [],
  },
};

const reducer = (state: EntitiesReducerState = initialState, action: UserActionParams): EntitiesReducerState => {
  switch (action.type) {
    case UPDATE_PLAYERS: {
      return {
        ...state,
        players: [...action.payload]//{ byId: arrayGroupBy<EntityById<StatePlayer>>([...action.payload], 'name'), allIds: [] /* ...action.payload.map(x => x.) */ }
        //status: ActionStatus.Request
      };
    }
    case UPDATE_GAMES: {
      return {
        ...state,
        //games: [...action.payload]//{ byId: arrayGroupBy<EntityById<StatePlayer>>([...action.payload], 'name'), allIds: [] /* ...action.payload.map(x => x.) */ }
        //status: ActionStatus.Request
      };
    }
    case UPDATE_PLAYERS_REQUEST: {
      return {
        ...state,
        //status: ActionStatus.Request
      };
    }
    case UPDATE_PLAYERS_SUCCESS: {
      return {
        ...state,
        //status: ActionStatus.Success,
        ...action.payload
      };
    }
    case UPDATE_PLAYERS_FAILURE: {
      return {
        ...state,
        //status: ActionStatus.Failure,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;