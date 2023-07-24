import {sendMessageCreator} from "./dialogs-reducer";
import {ProfilePhotosType, ProfileType} from "components/Profile/ProfileContainer";
import {Dispatch} from "redux";
import {profileAPI, usersAPI} from "components/api/api";
import {stopSubmit} from "redux-form";
import Profile from "components/Profile/Profile";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_SUCCESS = 'profile/SAVE_PROFILE_SUCCESS';

export type FilePhotoType = {
    lastModified: number
    lastModifiedDate?: Date
    name: string
    size: number
    type: string
    webkitRelativePath: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type InitialStateType = {
    posts: Array<PostType>
    profile: null | ProfileType
    status: string
}
export type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof saveProfileSuccess>


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
            return {...state, posts: state.posts.filter(el => el.id !== action.postId)};
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}};
        case SAVE_PROFILE_SUCCESS:
            return {...state, profile: action.profile};
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText: string) => ({type: ADD_POST, newPostText}) as const
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}) as const
export const setStatus = (status: string) => ({type: SET_STATUS, status}) as const
export const deletePost = (postId: number) => ({type: DELETE_POST, postId}) as const
export const savePhotoSuccess = (photos: ProfilePhotosType) => ({type: SAVE_PHOTO_SUCCESS, photos}) as const
export const saveProfileSuccess = (profile: ProfileType) => ({type: SAVE_PROFILE_SUCCESS, profile}) as const

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

export const savePhoto = (photoFile: FilePhotoType) => async (dispatch: Dispatch<ActionsTypes>) => {
    let response = await profileAPI.savePhoto(photoFile)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {

    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        let wrongNetwork = response.data.messages[0]
            .slice(
                response.data.messages[0].indexOf(">") + 1,
                response.data.messages[0].indexOf(")")
            )
            .toLocaleLowerCase();
        dispatch(
            stopSubmit("edit-profile", {
                contacts: { [wrongNetwork]: response.data.messages[0] }
            })
        );
        return Promise.reject(response.data.messages[0]);
    }}

export default profileReducer;

