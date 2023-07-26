import {Dispatch} from "redux";
import {authAPI, securityAPI} from "components/api/api";
import {AppThunk} from "./redux-store";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

type AllActionsTypes = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>

export type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: initialStateType = initialState, action: AllActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {id, email, login, isAuth}
} as const)

export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
} as const)

export const getAuthUserData = () => async (dispatch: Dispatch<AllActionsTypes>) => {
    let data = await authAPI.me()

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captchaUrl: string | null): AppThunk => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captchaUrl)

    if (data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch: Dispatch<AllActionsTypes>) => {
    let response = await authAPI.logout()
    console.log(response)
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch<AllActionsTypes>) => {
    let response = await securityAPI.getCaptchaUrl()
    dispatch(getCaptchaUrlSuccess(response.data.url))
}

export default authReducer;