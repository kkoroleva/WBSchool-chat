import { createReducer, on } from '@ngrx/store';
import { IMessage, User } from 'src/app/dialog/dialog';
import { deleteMessage, editMessage, initDialogs, loadDialogs, pushToMessages, usersDataResponse } from '../actions/dialog.action';
export const dialogNode = 'Dialog';

export interface IDialogState {
    messages: IMessage[],
}

const newData:IMessage[] = []

const initialState: IDialogState = {
    messages: [],
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
    on(usersDataResponse, (state, action) => ({
        ...state,
        messages: state.messages.map((message) => {
            action.usersData.forEach((user) => {
                if (message.owner === user._id){
                    console.log(message , "tut")
                    message.username = user.username;
                    message.avatar = user.avatar
                }
            })
            return message;
        })
    }))
)
