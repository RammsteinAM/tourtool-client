import { EntityById, EntityStateData, StatePlayer, StatePlayers } from "../../types/entities";
import { ActionStatus } from "../../types/main";
import { arrayGroupBy } from "../helpers";
import {
  UserActionParams,
  UPDATE_TOURNAMENT,
  UPDATE_PLAYERS,
  UPDATE_GAMES,
  RESET_GAMES,
  UPDATE_PLAYERS_REQUEST,
  UPDATE_PLAYERS_SUCCESS,
  UPDATE_PLAYERS_FAILURE,
  EntitiesReducerState,
} from "./types"


const initialState: EntitiesReducerState | null = {
  tournament: {
    name: '',
    thirdPlace: false,
    numberOfTables: 1,
    goals: true,
    numberOfGoals: 7,
    draw: false,
    winningSets: 1,
    numberOfLives: 3,
  },
  players: [] /* {
    byId: {},
    allIds: [],
  } */,
  //games: []
  games: {},
};

const reducer = (state: EntitiesReducerState = initialState, action: UserActionParams): EntitiesReducerState => {
  switch (action.type) {
    case UPDATE_TOURNAMENT: {
      return {
        ...state,
        tournament: {
          ...state.tournament,
          ...action.payload
        }
      };
    }
    case UPDATE_PLAYERS: {
      return {
        ...state,
        players: [...action.payload]
      };
    }
    case UPDATE_GAMES: {
      return {
        ...state,
        games: { ...state.games, ...action.payload }
      };
    }
    case RESET_GAMES: {
      return {
        ...state,
        games: { ...initialState.games }
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