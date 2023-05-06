import {ActionsTypes} from "./profile-reducer";

const SEND_MESSAGE = 'SEND-MESSAGE';

export const sendMessageCreator = (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody}) as const

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    name: string
    message: string
}

export type InitialStateType = {
    messages: Array<MessageType>
    dialogs: Array<DialogType>
    friends: Array<DialogType>
}

const initialState = {
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
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state, messages: [...state.messages, {id: 7, name: 'Vladlen', message: action.newMessageBody}]};
        default:
            return state;
    }
}

export default dialogsReducer