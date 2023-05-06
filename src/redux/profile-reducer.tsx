import {sendMessageCreator} from "./dialogs-reducer";
import {ProfileType} from "../components/Profile/ProfileContainer";
import {profileAPI, usersAPI} from "../components/api/api";
import {Dispatch} from "redux";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type InitialStateType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
}
export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>


const initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi! How are you?', likesCount: 14},
        {id: 2, message: 'Its my first post', likesCount: 31},
    ],
    profile: null,
    status: ''
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case ADD_POST:
            const newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {...state, newPostText: '', posts: [...state.posts, newPost]};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case DELETE_POST:
            return {...state, posts: state.posts.filter(el => el.id !== action.postId)}
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText}) as const
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const deletePost = (postId: number) => ({type: DELETE_POST, postId}) as const


export const getUserProfile = (userId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}


export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}

export default profileReducer;

