import { createReducer, on } from '@ngrx/store';
import { IMessage } from 'src/app/dialog/dialog';
import { deleteMessage, editMessage, getInfoChat, initDialogs, loadDialogs, newGetInfoChat, pushToMessages } from '../actions/dialog.action';

export const dialogNode = 'Dialog';
export interface IDialogState {
    messages: IMessage[],
    chatInfo: IChatInfo

}

export interface IChatInfo {
    _id: string,
    name: string,
    formatImage: string,
    about: string,
    isNotifications: boolean,
    isRead: boolean,
    isActive: boolean,
    owner: string, 
    __v: number, 
    chatGroup: string,
    avatar : string,
    users: string[],
    usernames: string[]
}

const initialState: IDialogState = {
    messages: [],
    chatInfo: {
        _id: "",
        name: "",
        formatImage: "", 
        about: "", 
        isNotifications: false, 
        isRead: false, 
        isActive: false, 
        owner: "", 
        __v: 0,
        chatGroup: "",
        avatar: "",
        users: [],
        usernames: []
    }
}

export const dialogReducer = createReducer(
    initialState,
    on(initDialogs, (state) => ({
        ...state,
        messages: state.messages
    })),
    on(loadDialogs, (state, action) => ({
        ...state,
        messages: action.messages
    })),
    on(pushToMessages, (state, action) => ({
        ...state,
        messages: [...state.messages, action.message]
    })),
    on(deleteMessage, (state, action) => ({
        ...state,
        messages: state.messages.filter((message) => {
            return message._id !== action.id
        })
    })),
    on(editMessage, (state, action) => ({
        ...state,
        messages: state.messages.map((message) => {
            return action.message._id === message._id ? action.message : message
        })
    })),
    
    on(newGetInfoChat, (state, action) => ({
        ...state,
        chatInfo: action.chatInfo
    }))
)
