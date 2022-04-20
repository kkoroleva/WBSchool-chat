import { createReducer, on } from '@ngrx/store';
import { deleteMessage, editMessage, initDialogs, loadDialogs, pushToMessages } from '../actions/dialog.action';

export const dialogNode = 'Dialog';

export interface IDialogState {
    messages: IMessage[],
}

export interface IMessage {
    text:string;
    owner?:string;
    _id?:string;
    expiresIn?:string;
    imageOrFile?: string;
    formatImage?: string;
    chatId?: string;
}

const initialState: IDialogState = {
    messages: [],
}

export const dialogReducer = createReducer(
  initialState,
    on(initDialogs, (state)=>({
        ...state,
        messages: state.messages
    })),
    on(loadDialogs, (state, action)=>({
        ...state,
        messages: action.messages
    })),
    on(pushToMessages, (state, action)=>({
        ...state,
        messages: [...state.messages, action.message]
    })),
    on(deleteMessage, (state, action)=>({
        ...state,
        messages: state.messages.filter((mess) => {
          return mess._id !== action.id
        })
    })),
    on(editMessage, (state, action)=>({
        ...state,
        messages: state.messages.map((mess)=>{
           return action.message._id === mess._id ? action.message : mess
        })
    })),
)
