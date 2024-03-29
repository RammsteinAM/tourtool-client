import { createStore, applyMiddleware, combineReducers, AnyAction, Action, Reducer, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import authReducer from './auth/reducer';
import registerReducer from './register/reducer';
import entitiesReducer from './tournamentEntities/reducer';
import gamesReducer from './games/reducer';
import settingsReducer from './settings/reducer';
import watchTournamentReducer from './watchTournament/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
    auth: authReducer,
    entities: entitiesReducer,
    games: gamesReducer,
    user: userReducer,
    register: registerReducer,
    settings: settingsReducer,
    watchTournament: watchTournamentReducer,
});

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    )
};

export default configureStore;

export type RootState = ReturnType<typeof rootReducer>