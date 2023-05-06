import {Dispatch} from "redux";
import {getAuthUserData} from "./auth-reducer.";
import {AppThunk} from "./redux-store";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type AllActionsTypes = ReturnType<typeof initializedSuccess>;

export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
};

const appReducer = (state: initialStateType = initialState, action: AllActionsTypes): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS} as const)

export const initializeApp = (): AppThunk => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    promise.then(()=>{
        dispatch(initializedSuccess())
    })
}

export default appReducer;