import { FetchedGames, FetchedTournaments } from "../../types/entities";
import { ActionStatus } from "../../types/main";
import AppState from "../../types/redux";
import {
  UserActionParams,
  GamesReducerState,
  GET_GAMES_REQUEST, GET_GAMES_SUCCESS, GET_GAMES_FAILURE,
  CREATE_GAMES_REQUEST, CREATE_GAMES_SUCCESS, CREATE_GAMES_FAILURE,
  UPDATE_GAME_REQUEST, UPDATE_GAME_SUCCESS, UPDATE_GAME_FAILURE,
  UPDATE_GAMES_REQUEST, UPDATE_GAMES_SUCCESS, UPDATE_GAMES_FAILURE,
} from "./types"

const initialState: AppState<FetchedGames> | null = {
  status: ActionStatus.Initial,
  data: {},
  error: ''

};

const reducer = (state: AppState<FetchedGames> = initialState, action: UserActionParams): AppState<FetchedGames> => {
  switch (action.type) {
    case GET_GAMES_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request,
      };
    }
    case GET_GAMES_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.Success,
        data: { ...action.payload }
      };
    }
    case GET_GAMES_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        error: action.payload?.error,
      };
    }
    case CREATE_GAMES_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request,
      };
    }
    case CREATE_GAMES_SUCCESS: {
      return {
        ...state,
        status: ActionStatus.Success,
        data: { ...action.payload }
      };
    }
    case CREATE_GAMES_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        error: action.payload?.error,
      };
    }
    case UPDATE_GAME_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request,
      };
    }
    case UPDATE_GAME_SUCCESS: {
      if (!action.payload.tournamentId) {
        return {
          ...state,
          status: ActionStatus.Success,
          data: { ...state.data }
        };
      }
      const newData = state.data[action.payload.tournamentId].map(game => {
        if (game.id === action.payload.id) {
          return action.payload;
        }
        return game;
      })
      return {
        ...state,
        status: ActionStatus.Success,
        data: { ...state.data, [action.payload.tournamentId]: [...newData] }
      };
    }
    case UPDATE_GAME_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        error: action.payload?.error,
      };
    }
    case UPDATE_GAMES_REQUEST: {
      return {
        ...state,
        status: ActionStatus.Request,
      };
    }
    case UPDATE_GAMES_SUCCESS: {
      if (!action.payload.tournamentId) {
        return {
          ...state,
          status: ActionStatus.Success,
          data: { ...state.data }
        };
      }
      return {
        ...state,
        status: ActionStatus.Success,
        data: { ...state.data, [action.payload.tournamentId]: [...action.payload.games] }
      };
    }
    case UPDATE_GAMES_FAILURE: {
      return {
        ...state,
        status: ActionStatus.Failure,
        error: action.payload?.error,
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;