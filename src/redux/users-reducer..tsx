import {followUnfollowAPI, usersAPI} from "../components/api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

type AllActionsTypes = ReturnType<typeof followSucces>
    | ReturnType<typeof unfollowSucces>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    name: string
    id: number
    uniqueUrlName: string
    photos: PhotosType
    followed: boolean
    status: string
}
export type initialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: any
}

const initialState: initialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state: initialStateType = initialState, action: AllActionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})}
        case UNFOLLOW:
            return {...state, users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})}
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id: number) => id != action.userId)
            }
        default:
            return state
    }
}

export const followSucces = (userId: number) => ({type: FOLLOW, userId} as const)
export const unfollowSucces = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage} as const)
export const setTotalUsersCount = (totalCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const)
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId
} as const)

export const requestUsers = (page: number, pageSize: number) => async (dispatch: Dispatch<AllActionsTypes>) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    let response = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}

const followUnfollowFlow = async (dispatch: Dispatch<AllActionsTypes>, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)

    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => async (dispatch: Dispatch<AllActionsTypes>) => {
    followUnfollowFlow(dispatch, userId, followUnfollowAPI.followUser, followSucces)
}


export const unfollow = (userId: number) => async (dispatch: Dispatch<AllActionsTypes>) => {
    followUnfollowFlow(dispatch, userId, followUnfollowAPI.unfollowUser, unfollowSucces)
}

export default usersReducer;