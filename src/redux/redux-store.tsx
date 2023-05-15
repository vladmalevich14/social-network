import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore as createStore, Store} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer.";
import authReducer from "./auth-reducer.";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer, reducer as formReducer} from "redux-form"
import appReducer from "./app-reducer.";

export type AppStateType = ReturnType<typeof rootReducer>
export type StoreType = Store & AppStateType & any

export let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
));

// let store: StoreType = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

export default store

