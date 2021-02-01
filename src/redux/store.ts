import { createStore, applyMiddleware, combineReducers, AnyAction, Action, Reducer, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';
import authReducer from './auth/reducer';
import registerReducer from './register/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    register: registerReducer,
});

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    )
};

export default configureStore;

export type RootState = ReturnType<typeof rootReducer>