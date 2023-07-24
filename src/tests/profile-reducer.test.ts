import profileReducer, {addPostActionCreator, deletePost, InitialStateType} from "../redux/profile-reducer";
import {ProfileType} from "components/Profile/ProfileContainer";

const state: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi! How are you?', likesCount: 14},
        {id: 2, message: 'Its my first post', likesCount: 31},
    ],
    profile: {} as ProfileType,
    status: ''
}

test('new post should be added', () => {
    let action = addPostActionCreator('IT-KAMASUTRA.COM')
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[2].message).toBe('IT-KAMASUTRA.COM')
})

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})