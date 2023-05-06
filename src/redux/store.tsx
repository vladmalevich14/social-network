import {addPostActionCreator,
} from "./profile-reducer";
import dialogsReducer, {sendMessageCreator} from "./dialogs-reducer";

export type MessageType = {
    id: number
    name: string
    message: string
}
export type DialogType = {
    id: number
    name: string
}
export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    friends: Array<DialogType>
}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogPageType
}

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}

 type ActionsTypes =
    ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof sendMessageCreator>

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you?', likesCount: 14},
                {id: 2, message: 'Its my first post', likesCount: 31},
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {
            messages: [
                {id: 1, name: 'Sergey', message: 'Hi'},
                {id: 2, name: 'Diana', message: 'How is your learn?'},
                {id: 3, name: 'Vitaliy', message: 'Yo'},
                {id: 4, name: 'Alex', message: 'Hello'},
                {id: 5, name: 'Tatyana', message: 'Make some noise'},
                {id: 6, name: 'Vlad', message: 'Hello World!'},
            ],
            dialogs: [
                {id: 1, name: 'Vlad'},
                {id: 2, name: 'Diana'},
                {id: 3, name: 'Vitaliy'},
                {id: 4, name: 'Tatyana'},
                {id: 5, name: 'Sergey'},
                {id: 6, name: 'Alexandr'},
            ],
            friends: [
                {id: 1, name: 'Alex'},
                {id: 2, name: 'Diana'},
                {id: 3, name: 'Sergey'},
            ]
        },
    },
    _callSubscriber: () => {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state);
    }
}

export default store;