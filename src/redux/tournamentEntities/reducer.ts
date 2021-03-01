import { EntityById, EntityStateData, StatePlayer, StatePlayers } from "../../types/entities";
import { ActionStatus } from "../../types/main";
import { arrayGroupBy } from "../helpers";
import {
  UserActionParams,
  UPDATE_TOURNAMENT,
  UPDATE_PLAYERS,
  UPDATE_PARTICIPANTS,
  UPDATE_ELIMINATION_GAMES,
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
  participants: [],
  players: [],
  games: {},
  eliminationGames: {},
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
    case UPDATE_PARTICIPANTS: {
      return {
        ...state,
        participants: [...action.payload]
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
    case UPDATE_ELIMINATION_GAMES: {
      return {
        ...state,
        eliminationGames: { ...state.eliminationGames, ...action.payload }
      };
    }
    case RESET_GAMES: {
      return {
        ...state,
        eliminationGames: { ...initialState.eliminationGames }
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